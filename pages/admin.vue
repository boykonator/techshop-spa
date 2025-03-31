<template>
  <div>
    <div>
      <h1>Admin Page</h1>
      <br>
      <h3>Add category</h3>
      <input type="text" v-model="addCategoryTitle">
      <button @click="addRequest">check</button>

      <div v-if="isAdded" class="error">
        <br>Такая категория уже есть на сайте!
      </div>

      <div v-if="!isAdded && addCategoryObject.url">
        <br>Новая категория: {{ addCategoryObject }}
      </div>

      <br><br>

      <h3>Delete category</h3>
      <input type="text" v-model="deleteCategoryTitle">
      <button @click="deleteRequest">delete</button>

      <div v-if="isDeleted">
        <br>Удалённая категория: {{ deleteCategoryObject }}
      </div>

      <div v-if="!isDeleted && deleteCategoryObject.url" class="error">
        <br>Такой категории нет на сайте!
      </div>
    </div>
  </div>
</template>

<script setup>
import createCatalogLinks from '@/utils/index.js'
import axios from "axios"

const categories = ref([])
const addCategoryTitle = ref('автотовары')
const deleteCategoryTitle = ref('автотовар')
const addCategoryObject = ref({})
const deleteCategoryObject = ref({})
const isAdded = ref(false)
const isDeleted = ref(false)

const getCategories = async () => {
  const {data} = await axios.get('/api/catalog')
  console.log(data)
  categories.value = data
}

const handleCategoryRequest = async (categoryTitle, action) => {
  const categoryObject = createCatalogLinks([categoryTitle])[0]
  const existingCategory = categories.value.find(item => item.url === categoryObject.url)

  if (action === 'add') {
    if (!existingCategory) {
      await axios.post('/api/catalog', categoryObject)
      addCategoryObject.value = categoryObject
      isAdded.value = false
      await getCategories()
    } else {
      isAdded.value = true
    }
  }

  if (action === 'delete') {
    if (existingCategory) {
      await axios.delete('/api/catalog', {data: {_id: existingCategory._id}})
      deleteCategoryObject.value = categoryObject
      isDeleted.value = true
      await getCategories()
    } else {
      deleteCategoryObject.value = categoryObject
    }
  }
}

const addRequest = () => handleCategoryRequest(addCategoryTitle.value, 'add')
const deleteRequest = () => handleCategoryRequest(deleteCategoryTitle.value, 'delete')

watch([addCategoryTitle, deleteCategoryTitle], () => {
  isAdded.value = false
  isDeleted.value = false
  addCategoryObject.value = {}
  deleteCategoryObject.value = {}
})

getCategories()
</script>

<style scoped>
.error {
  color: red
}
</style>