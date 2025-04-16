import {defineStore} from 'pinia';
import axios from "axios";
import type {ICatalogItem, ICategory} from "~/types/catalog"

export const useCatalogStore = defineStore('catalog', () => {
    const catalog = ref<ICatalogItem[]>([])
    const categories = ref<ICategory[]>([])
    const categoryTree = ref<ICatalogItem[]>([])

    const activeTab = ref('bytovaya-tehnika')

    const fetchCatalog = async () => {
        try {
            const [catalogResponse, categoriesResponse] = await Promise.all([
                axios.get('/api/catalog'),
                axios.get('/api/categories'),
            ]);

            catalog.value = catalogResponse.data.data;
            categories.value = categoriesResponse.data.data;

            if (catalog.value.length && categories.value.length) {
                buildCategoryTree()
            }
        } catch (error) {
            console.error('Error fetching catalog or categories:', error)
        }
    }

    const buildCategoryTree = () => {
        const catalogMap = new Map();
        const categoryMap = new Map();
        categoryTree.value = []

        catalog.value.forEach((catalogItem) => {
            const entry = {
                _id: catalogItem._id,
                title: catalogItem.title,
                url: catalogItem.url,
                parentCategory: catalogItem.parentCategory,
                categories: []
            };
            catalogMap.set(catalogItem._id, entry);
            categoryMap.set(catalogItem._id, entry);
        });

        categories.value.forEach((category) => {
            const entry = {
                _id: category._id,
                title: category.title,
                url: category.url,
                parentCategory: category.parentCategory,
                subcategories: []
            };
            categoryMap.set(category._id, entry);

            const parent = categoryMap.get(category.parentCategory);
            if (parent?.categories) {
                parent.categories.push(entry);
            } else if (parent?.subcategories) {
                parent.subcategories.push(entry);
            } else {
                console.warn('Parent not found or has no array to push into:', category);
            }
        });

        for (const [, value] of categoryMap) {
            if (value.subcategories?.length === 0) {
                delete value.subcategories;
            }
        }

        categoryTree.value = Array.from(catalogMap.values());

        console.log('Final structure:', categoryTree.value);
    }

    const breadcrumbs = ref({})

    const createBreadcrumbs = (url) => {
        const catalog = { title: 'Каталог', url: '' }

        for (const parent of categoryTree.value) {
            if (parent.url === url) {
                breadcrumbs.value = { catalog, parent }
                return
            }

            for (const category of parent.categories || []) {
                if (category.url === url) {
                    breadcrumbs.value = { catalog, parent, category }
                    return
                }

                for (const subcategory of category.subcategories || []) {
                    if (subcategory.url === url) {
                        breadcrumbs.value = { catalog, parent, category, subcategory }
                        return
                    }
                }
            }
        }
    }

    const breadcrumbArray = computed(() => [
        breadcrumbs.value.catalog,
        breadcrumbs.value.parent,
        breadcrumbs.value.category,
        breadcrumbs.value.subcategory,
    ].filter(Boolean))

    return {
        catalog,
        categories,
        categoryTree,
        activeTab,
        breadcrumbs,
        breadcrumbArray,
        fetchCatalog,
        createBreadcrumbs
    }
})