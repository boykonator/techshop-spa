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

    return {
        catalog,
        categories,
        categoryTree,
        activeTab,
        fetchCatalog,
    }
})