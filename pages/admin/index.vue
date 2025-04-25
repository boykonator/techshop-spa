<template>
  <div>
    <h1>Admin Page</h1>

    <div class="buttons-container">
      <button @click="navigateTo('/admin/product')">Go to Product Page</button>
    </div>

    <div class="admin-page">
      <div class="admin-page-column">
        <h2>Main categories: </h2>

        <div class="admin-page-column-header">
          <div class="admin-page-input-container">
            <p class="admin-page-input-title">Поиск по каталогу:</p>
            <input type="text" v-model="searchCategory">
            <Icon name="cross" class="admin-page-input-delete-icon" @click="searchCategory = null" v-show="searchCategory" />
          </div>

          <div>
            <button @click="state.openModal('add'); showModal = 'category'">Add Category</button>
            <AdminModalCategory v-if="state.showAdminModal && showModal === 'category'" />
          </div>
        </div>

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
            <tr v-for="(category, index) of sortedCatalog.length ? sortedCatalog : filteredCategories" :key="category._id">
              <td>
                {{ index + 1}}.
              </td>
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ category.parentCategory === null ? 'null' : category.parentCategory }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="edit-button" @click="state.openModal('edit', category._id)">
                <Icon name="edit" />
              </td>
              <td class="delete-button" @click="state.openModal('delete', category._id)">
                <Icon name="cross" />
              </td>

              <AdminModalCategory v-if="state.showAdminModal && state.editIndex === category._id" :category="category" />
              <DeleteModal v-if="state.showAdminModal && state.deleteIndex === category._id" :entity="category" />
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-page-column">
        <h2>Subcategories:</h2>

        <div class="admin-page-column-header">
          <div class="admin-page-input-container">
            <p class="admin-page-input-title">Поиск по подкатегориям:</p>
            <div class="admin-page-input-container">
              <input type="text" v-model="searchSubcategory">
              <Icon name="cross" class="admin-page-input-delete-icon" @click="searchSubcategory = null" v-show="searchSubcategory" />
            </div>
          </div>

          <div>
            <button @click="state.openModal('add'); showModal = 'subcategory'">Add Subcategory</button>
            <AdminModalSubcategory v-if="state.showAdminModal && showModal === 'subcategory'" />
          </div>
        </div>

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
            <tr v-for="(category, index) of sortedSubcategories.length ? sortedSubcategories : filteredSubcategories" :key="category._id">
              <td>
                {{ index + 1}}.
              </td>
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ store.getSubcategoryParentTitle(category.parentCategory) }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="edit-button" @click="state.openModal('edit', category._id)">
                <Icon name="edit" />
              </td>
              <td class="delete-button" @click="state.openModal('delete', category._id)">
                <Icon name="cross" />
              </td>
              <AdminModalSubcategory v-if="state.showAdminModal && state.editIndex === category._id" :category="category" />
              <DeleteModal v-if="state.showAdminModal && state.deleteIndex === category._id" :entity="category" />
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
import {useStateStore} from "~/stores/state";

const store = useCatalogStore()
const state = useStateStore()

const categoriesMenu = ['#','title', 'parentCategory', '_id']

const catalog = computed(() => store.catalog)
const subcategories = computed(() => store.categories)

const searchCategory = ref<string | null>(null)
const searchSubcategory = ref<string | null>(null)

const sortedCatalog = ref<Array<ICatalogItem | ICategory>>([])
const sortedSubcategories = ref<Array<ICatalogItem | ICategory>>([])

const showModal = ref<string | null>(null)

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

  let sorted

  if (key === '#') {
    const indexedArray = array.map((item, index) => ({ item, index }))
    sorted = indexedArray.sort((a, b) =>
        currentSort.value.direction ? a.index - b.index : b.index - a.index
    ).map(el => el.item)
  } else {
    sorted = [...array].sort((a, b) => {
      const aValue = (a[key] ?? '').toString().toLowerCase()
      const bValue = (b[key] ?? '').toString().toLowerCase()

      return currentSort.value.direction
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
    })
  }

  if (arrayName === 'catalog') {
    sortedCatalog.value = sorted
  } else {
    sortedSubcategories.value = sorted
  }
}

const filteredCategories = computed(() => {
  if (!searchCategory.value?.trim()) return catalog.value

  if (searchCategory.value.trim()) {
    return catalog.value.filter(item => item.title.toLowerCase().includes(searchCategory.value.toLowerCase()))
  }
})

const filteredSubcategories = computed(() => {
  if (!searchSubcategory.value?.trim()) return subcategories.value

  if (searchSubcategory.value.trim()) {
    return subcategories.value.filter(item => item.title.toLowerCase().includes(searchSubcategory.value.toLowerCase()))
  }
})

watch(
    () => state.showAdminModal, () => {
      if (state.showAdminModal === false) {
        state.deleteIndex = null
        state.editIndex = null
        showModal.value = null
      }
    })

watch([searchCategory, searchSubcategory], () => {
  sortedCatalog.value = []
  sortedSubcategories.value = []
})

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
.admin-page {
  display: flex;
  gap: 20px;

  &-column {
    min-width: 630px;

    &-header {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      margin-bottom: 4px;
    }
  }

  &-input {
    &-container {
      position: relative;
      max-width: 200px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    &-delete-icon {
      position: absolute;
      right: 32px;
      cursor: pointer;
    }

    &-title {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.edit-button {
   cursor: pointer;
 }

.delete-button {
  cursor: pointer;
}
</style>