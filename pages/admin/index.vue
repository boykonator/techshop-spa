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
              <td v-for="category in categoriesMenu" :key="category">
                {{ category }}
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category of categories" :key="category._id">
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ category.parentCategory === null ? 'null' : category.parentCategory }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="delete-button" @click="deleteCategory(category._id)">
                <Icon name="cross" />
              </td>
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
              <td v-for="category in categoriesMenu" :key="category">
                {{ category }}
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category of subcategories" :key="category._id">
              <td>
                {{ category.title }}
              </td>
              <td>
                {{ getSubcategoryParentTitle(category.parentCategory) }}
              </td>
              <td>
                {{ category._id }}
              </td>
              <td class="delete-button" @click="deleteCategory(category._id)">
                <Icon name="cross" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

const categoriesMenu = ['title', 'parentCategory', '_id']
const categories = ref(store.catalog)
const subcategories = ref(store.categories)

const getSubcategoryParentTitle = (id: string) => {
  console.log('getSubcategoryParentTitle')
  const category = categories.value.find(category => category._id === id)

  const subcategory = subcategories.value.find(category => category._id === id)

  return category ? category.title : subcategory?.title
}


const deleteCategory = async (id: string) => {
  try {
    const {data} = await axios.delete(`/api/catalog/${id}`)
    console.log(data)
    await store.fetchCatalog()
  } catch (error) {
    console.error(error)
  }
}

watch(() => store.catalog, () => {
  categories.value = store.catalog
})

watch(() => store.categories, () => {
  subcategories.value = store.categories
})


</script>

<style scoped lang="scss">
.delete-button {
  cursor: pointer;
}
</style>

