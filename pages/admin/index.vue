<template>
  <div>
    <h1>Admin Page</h1>

    <div class="buttons-container">
      <button @click="navigateTo('/admin/add')">Go to Add Page</button>
      <button @click="navigateTo('/admin/product')">Go to Product Page</button>
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
            <tr v-for="(category, index) of sortedCatalog.length ? sortedCatalog : catalog" :key="category._id">
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
              <td class="edit-button" @click="showEditModal(category._id)">
                <Icon name="edit" />
              </td>
              <td class="delete-button" @click="showDeleteModal(category._id)">
                <Icon name="cross" />
              </td>
              <AdminModalCategory v-if="state.showAdminModal && editIndex === category._id" :category="category" />
              <DeleteModal v-if="state.showAdminModal && deleteIndex === category._id" :category="category" />
            </tr>
            </tbody>
          </table>
        </div>
      </div>

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
            <tr v-for="(category, index) of sortedSubcategories.length ? sortedSubcategories : subcategories" :key="category._id">
              <td>
                {{ index + 1}}.
              </td>
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ getSubcategoryParentTitle(category.parentCategory) }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="edit-button" @click="showEditModal(category._id)">
                <Icon name="edit" />
              </td>
              <td class="delete-button" @click="showDeleteModal(category._id)">
                <Icon name="cross" />
              </td>
              <AdminModalSubcategory v-if="state.showAdminModal && editIndex === category._id" :category="category" />
              <DeleteModal v-if="state.showAdminModal && deleteIndex === category._id" :category="category" />
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

const deleteIndex = ref<string | null>(null)
const editIndex = ref<string | null>(null)

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
  state.showAdminModal = true
}

const showEditModal = (index: string) => {
  editIndex.value = index
  state.showAdminModal = true
}

const getSubcategoryParentTitle = (id: string) => {
  const category = catalog.value.find(category => category._id === id)
  const subcategory = subcategories.value.find(category => category._id === id)

  return category ? category.title : subcategory?.title
}

watch(
    () => state.showAdminModal, () => {
      if (state.showAdminModal === false) {
        deleteIndex.value = null
        editIndex.value = null
      }
    }
)

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
.edit-button {
  cursor: pointer;
}
.delete-button {
  cursor: pointer;
}

.edit-category {
  display: flex;
  gap: 20px;
}
</style>