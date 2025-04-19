import {defineStore} from 'pinia'
import axios from "axios"
import type {ICatalogItem, ICategory, IProduct} from "~/types/catalog"
import {createCatalogLinks, showSuccessMessage} from "~/utils/index.js"

export const useCatalogStore = defineStore('catalog', () => {
    const activeTab = ref('bytovaya-tehnika')
    const catalog = ref<ICatalogItem[]>([])
    const categories = ref<ICategory[]>([])

    const categoryTree = ref<ICatalogItem[]>([])

    const fetchCatalog = async () => {
        try {
            const [catalogResponse, categoriesResponse] = await Promise.all([
                axios.get('/api/catalog'),
                axios.get('/api/categories'),
            ])

            catalog.value = catalogResponse.data.data
            categories.value = categoriesResponse.data.data

            if (catalog.value.length && categories.value.length) {
                buildCategoryTree()
            }
        } catch (error) {
            console.error('Error fetching catalog or categories:', error)
        }
    }

    const buildCategoryTree = () => {
        const map = new Map()
        categoryTree.value = []

        catalog.value.forEach(item => {
            map.set(item._id, { ...item, categories: [] })
        })

        categories.value.forEach(item => {
            map.set(item._id, { ...item, subcategories: [] })
        })

        categories.value.forEach(item => {
            const entry = map.get(item._id)
            const parent = map.get(item.parentCategory)

            if (parent?.categories) {
                parent.categories.push(entry)
            } else if (parent?.subcategories) {
                parent.subcategories.push(entry)
            } else {
                categoryTree.value.push(entry)
            }
        })

        categoryTree.value = catalog.value.map(item => map.get(item._id))
    }

    const editCategory = async (title: string, parentCategory: string, _id: string) => {
        try {
            const category = createCatalogLinks(title)

            const { data } = await axios.put(`/api/catalog/${_id}`, {
                title: category.title,
                parentCategory: parentCategory,
                url: category.url,
            })

            console.log(data)
            showSuccessMessage(data)
            await fetchCatalog()
        } catch (error) {
            console.error(error)
        }
    }

    const createCategory = async (title: string, parentCategory: string) => {
        try {
            const category = createCatalogLinks(title)

            const { data } = await axios.post('/api/catalog', {
                title: category.title,
                parentCategory: parentCategory,
                url: category.url,
            })
            showSuccessMessage(data)
            await fetchCatalog()
        } catch (error) {
            console.error(error)
        }
    }

    const product = ref<IProduct | null>(null)

    const requestProduct = async () => {
        const route = useRoute()
        const {data} = await axios.get(`/api/products/${route.params.url}`)

        product.value = data
        console.log('data: ', product.value)
    }

    const breadcrumbs = ref({})

    const createBreadcrumbs = async (url: string, isProductPage: boolean) => {
        const catalog = {title: 'Каталог', url: ''}

        if (isProductPage) {
            await requestProduct()

            const productCategoryId = product.value.category?._id || product.value.category
            const productParentCategoryId = product.value.category?.parentCategory

            if (!productCategoryId) {
                console.warn('Product category is missing.')
                breadcrumbs.value = {catalog}
                return
            }

            for (const parent of categoryTree.value) {
                for (const category of parent.categories || []) {
                    if (category._id === productParentCategoryId) {
                        for (const subcategory of category.subcategories || []) {
                            if (subcategory._id === productCategoryId) {
                                breadcrumbs.value = {catalog, parent, category, subcategory}

                                console.log('breadcrumbs.value', breadcrumbs.value)
                                return
                            }
                        }
                    }
                }
            }
        } else {
            for (const parent of categoryTree.value) {
                if (parent.url === url) {
                    breadcrumbs.value = {catalog, parent}
                    return
                }

                for (const category of parent.categories || []) {
                    if (category.url === url) {
                        breadcrumbs.value = {catalog, parent, category}
                        return
                    }

                    for (const subcategory of category.subcategories || []) {
                        if (subcategory.url === url) {
                            breadcrumbs.value = {catalog, parent, category, subcategory}
                            return
                        }
                    }
                }
            }
        }
    }

    const breadcrumbArray = computed(() => [
        breadcrumbs.value?.catalog,
        breadcrumbs.value?.parent,
        breadcrumbs.value?.category,
        breadcrumbs.value?.subcategory,
    ].filter(Boolean))

    return {
        catalog,
        categories,
        categoryTree,
        activeTab,
        breadcrumbs,
        breadcrumbArray,
        product,
        fetchCatalog,
        createCategory,
        editCategory,
        createBreadcrumbs
    }
})