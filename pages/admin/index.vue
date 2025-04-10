<template>
  <div>
    <h1>Admin Page</h1>

    <div>
      <button @click="navigateTo('/admin/add')">Go to Add Page</button>
      <button @click="navigateTo('/admin/add')">Go to Delete Page</button>

      <br><br>
    </div>

    <div class="edit-category">
      <div>
        <h2>Main categories:</h2>
        <div>
          <table>
            <thead>
            <tr>
              <td v-for="category in categoriesMenu" :key="category" @click="sortArray(catalog, 'catalog', category)">
                {{ category }}
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category of sortedCatalog.length ? sortedCatalog : catalog" :key="category._id">
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ category.parentCategory === null ? 'null' : category.parentCategory }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="delete-button" @click="showDeleteModal(category._id)">
                <Icon name="cross" />
              </td>
              <DeleteModal v-if="state.showDeleteModal && deleteIndex === category._id" :category="category" />
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br>
      <div>
        <h2>Subcategories:</h2>
        <div>
          <table>
            <thead>
            <tr>
              <td v-for="category in categoriesMenu" :key="category" @click="sortArray(subcategories, 'subcategories', category)">
                {{ category }}
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category of sortedSubcategories.length ? sortedSubcategories : subcategories" :key="category._id">
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ getSubcategoryParentTitle(category.parentCategory) }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="delete-button" @click="showDeleteModal(category._id)">
                <Icon name="cross" />
              </td>
              <DeleteModal v-if="state.showDeleteModal && deleteIndex === category._id" :category="category" />
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import type {ICatalogItem, ICategory} from "~/types/catalog"

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

import {useStateStore} from "~/stores/state";
const state = useStateStore()

const categoriesMenu = ['title', 'parentCategory', '_id']

const deleteIndex = ref()

const catalog = computed(() => store.catalog)
const subcategories = computed(() => store.categories)

const sortedCatalog = ref<Array<ICatalogItem | ICategory>>([])
const sortedSubcategories = ref<Array<ICatalogItem | ICategory>>([])

const currentSort = ref({
  arrayName: '',
  key: '',
  direction: true,
})

const sortArray = (array: Array<ICatalogItem | ICategory>, arrayName: 'catalog' | 'subcategories', key: string) => {
  if (currentSort.value.arrayName !== arrayName || currentSort.value.key !== key) {
    currentSort.value.direction = true
  } else {
    currentSort.value.direction = !currentSort.value.direction
  }

  currentSort.value.arrayName = arrayName
  currentSort.value.key = key

  const sorted = [...array].sort((a, b) => {
    const aValue = (a[key] ?? '').toString().toLowerCase()
    const bValue = (b[key] ?? '').toString().toLowerCase()

    return currentSort.value.direction
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
  })

  if (arrayName === 'catalog') {
    sortedCatalog.value = sorted
  } else {
    sortedSubcategories.value = sorted
  }
}

const showDeleteModal = (index: string) => {
  deleteIndex.value = index
  state.showDeleteModal = true
}

const getSubcategoryParentTitle = (id: string) => {
  const category = catalog.value.find(category => category._id === id)
  const subcategory = subcategories.value.find(category => category._id === id)

  return category ? category.title : subcategory?.title
}

watch(
    () => [store.catalog, store.categories], () => {
      sortedCatalog.value = []
      sortedSubcategories.value = []
      currentSort.value = { arrayName: '', key: '', direction: true }
    })

onBeforeRouteLeave(() => {
  sortedCatalog.value = []
  sortedSubcategories.value = []
  currentSort.value = { arrayName: '', key: '', direction: true }
})
</script>

<style scoped lang="scss">
.delete-button {
  cursor: pointer;
}
</style>