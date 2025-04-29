import {defineStore} from 'pinia'
import axios from "axios"
import type {ICatalogItem, ICategory} from "~/types/catalog"
import {createCatalogLinks, showSuccessMessage} from "~/utils/index.js"
import {useProductStore} from "~/stores/product"

export const useCatalogStore = defineStore('catalog', () => {
    const activeTab = ref('bytovaya-tehnika')
    const catalog = ref<ICatalogItem[]>([])
    const categories = ref<ICategory[]>([])
    const watchlist = ref<ICatalogItem[]>([])

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

    const createCategory = async (title: string, parentCategory: string | null) => {
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

    const editCategory = async (title: string, parentCategory: string, _id: string) => {
        try {
            const category = createCatalogLinks(title)

            const { data } = await axios.put(`/api/catalog/${_id}`, {
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

    const getSubcategoryParentTitle = (id: string) => {
        const category = catalog.value.find(category => category._id === id)
        const subcategory = categories.value.find(category => category._id === id)

        return category ? category.title : subcategory?.title
    }

    const breadcrumbs = ref({})

    const createBreadcrumbs = async (url: string, isProductPage: boolean) => {
        const store = useProductStore()
        const catalog = {title: 'Каталог', url: ''}

        if (!categoryTree.value.length) buildCategoryTree()

        if (isProductPage) {
            const productCategoryId = store.product?.category?._id || store.product.category
            const productParentCategoryId = store.product?.category?.parentCategory

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
                                breadcrumbs.value = {catalog, parent, category, subcategory, product: store.product}

                                console.log('breadcrumbs.value: ', breadcrumbs.value)
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
        breadcrumbs.value?.product,
    ].filter(Boolean))

    return {
        catalog,
        categories,
        categoryTree,
        activeTab,
        breadcrumbs,
        breadcrumbArray,
        fetchCatalog,
        createBreadcrumbs,
        getSubcategoryParentTitle,
        editCategory,
        createCategory,
        watchlist
    }
})