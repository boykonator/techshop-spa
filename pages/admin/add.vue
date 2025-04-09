<template>
  <div>
    <h3 @click="navigateTo('/admin')"> < Go Back</h3>
    <h1>Admin Add Page</h1>

   <div style="display: flex">
     <div>
       <button @click="toggleModal">Add Category</button>

       <div v-if="showAddCategoryModal" class="add-category-modal">
         <div><strong>Add Category</strong></div>
         <input type="text" placeholder="Title" v-model="newCategoryTitle" />
         <select name="" id="" v-model="newCategoryParent">
           <option :value="null">
             null
           </option>
           <option v-for="category in store.catalog" :value="category._id">
             {{ category.title }}
           </option>
         </select>

         <button @click="createCategory(newCategoryTitle, newCategoryParent)" :disabled="!newCategoryTitle.length">Create category</button>
         <div class="add-category-modal-close" @click="showAddCategoryModal = false">
           <Icon name="cross" />
         </div>
       </div>
     </div>

     <div>
       <button @click="toggleModalSubcategory">Add Subcategory</button>

       <div v-if="showAddSubcategoryModal" class="add-category-modal">
         <div><strong>Add Subcategory</strong></div>
         <input type="text" placeholder="Title" v-model="newSubcategoryTitle" />
         <select name="" id="" v-model="newSubcategoryParent">
           <option v-for="category in categories" :value="category._id">
             {{ category.title }}
           </option>
         </select>

         <button @click="createCategory(newSubcategoryTitle, newSubcategoryParent)" :disabled="!newSubcategoryTitle.length">Create category</button>
         <div class="add-category-modal-close" @click="showAddSubcategoryModal = false">
           <Icon name="cross" />
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script setup>
import createCatalogLinks from '~/utils/index.js'
import axios from "axios";

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

const storeData = ref(store.categoryTree)

const categories = ref([])

const getCategories = () => {
  categories.value = []
  storeData.value.forEach((category) => {
    if (category.categories.length) {
      category.categories.forEach((subcategory) => {
        // Log the subcategory details instead of just the title
        console.log(subcategory)
        categories.value.push(subcategory) // Push the entire subcategory object
      })
    }
  })

  console.log('categories', categories.value) // This will now include the full subcategory objects
}



const newCategoryTitle = ref('')
const newCategoryParent = ref(null)
const showAddCategoryModal = ref(false)

const newSubcategoryTitle = ref('')
const newSubcategoryParent = ref(null)
const showAddSubcategoryModal = ref(false)

const toggleModal = () => {
  showAddSubcategoryModal.value = false
  showAddCategoryModal.value = !showAddCategoryModal.value
}

const toggleModalSubcategory = () => {
  showAddCategoryModal.value = false
  showAddSubcategoryModal.value = !showAddSubcategoryModal.value
}

const createCategory = async (title, parentCategory) => {
  try {
    const category = createCatalogLinks(title)

    const { data } = await axios.post('/api/catalog', {
      title: category.title,
      parentCategory: parentCategory,
      url: category.url,
    })

    console.log(data)

    await store.fetchCatalog()
  } catch (error) {
    console.error(error)
  }
}

watch(() => store.categoryTree, (newValue) => {
  storeData.value = newValue
  getCategories()
})
</script>

<style scoped lang="scss">
.error {
  color: red
}

.add-category-modal {
  position: absolute;
  background-color: white;
  padding: 20px;
  border-radius: 8px;

  &-close {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 8px;
  }
}
</style>