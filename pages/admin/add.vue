<template>
  <div>
    <h3 @click="navigateTo('/admin')"> < Go Back</h3>
    <h1>Admin Add Page</h1>

   <div style="display: flex">
     <div>
       <button @click="toggleModal">Add Category</button>

       <div v-if="showAddCategoryModal" class="add-category-modal">
         <div>
           <div><strong>Add Category</strong></div>
           <input type="text" placeholder="Title" v-model="newCategoryTitle" />
           <select name="" id="" v-model="newCategoryParent">
             <option :value="null">
               null (Parent Category)
             </option>
             <option v-for="category in store.catalog" :value="category._id">
               {{ category.title }}
             </option>
           </select>

           <button @click="createCategory(newCategoryTitle, newCategoryParent)" :disabled="!newCategoryTitle.length">Create category</button>

           <Icon name="cross" class="add-category-modal-close" @click="showAddCategoryModal = false" />
         </div>
         <div v-if="categoryCreated" class="success">Category created successfully!</div>
       </div>
     </div>

     <div>
       <button @click="toggleModalSubcategory">Add Subcategory</button>

       <div v-if="showAddSubcategoryModal" class="add-category-modal">
         <div>
           <div><strong>Add Subcategory</strong></div>
           <input type="text" placeholder="Title" v-model="newSubcategoryTitle" />

           <select v-model="newSubcategoryParent">
             <option value="" disabled>Choose category</option>
             <optgroup
                 v-for="parent in groupedCategories"
                 :key="parent.title"
                 :label="parent.title"
             >
               <option
                   v-for="child in parent.children"
                   :key="child._id"
                   :value="child._id"
               >
                 {{ child.title }}
               </option>
             </optgroup>
           </select>
           <button
               @click="createCategory(newSubcategoryTitle, newSubcategoryParent)"
               :disabled="!newSubcategoryTitle || !newSubcategoryParent"
           >Create category</button>
           <Icon name="cross" class="add-category-modal-close" @click="showAddSubcategoryModal = false" />
         </div>

         <div v-if="categoryCreated" class="success">Subcategory created successfully!</div>
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

const newCategoryTitle = ref('')
const newCategoryParent = ref(null)
const showAddCategoryModal = ref(false)

const newSubcategoryTitle = ref('')
const newSubcategoryParent = ref('')
const showAddSubcategoryModal = ref(false)

const categories = ref([])
const categoryCreated = ref(false)


const getCategories = () => {
  categories.value = []

  storeData.value.forEach((category) => {
    if (category.categories.length) {
      category.categories.forEach((subcategory) => {
        categories.value.push(subcategory)
      })
    }
  })
}

const groupedCategories = computed(() => {
  const groupMap = new Map()

  store.categories.forEach((category) => {
    if (!category.parentCategory) return

    const parent = store.catalog.find(c => c._id === category.parentCategory)

    if (!parent) return

    if (!groupMap.has(parent.title)) {
      groupMap.set(parent.title, { title: parent.title, children: [] })
    }

    groupMap.get(parent.title).children.push(category)
  })

  return Array.from(groupMap.values())
})

const toggleModal = () => {
  showAddSubcategoryModal.value = false
  showAddCategoryModal.value = !showAddCategoryModal.value
}

const toggleModalSubcategory = () => {
  showAddCategoryModal.value = false
  showAddSubcategoryModal.value = !showAddSubcategoryModal.value
}

let timeout = null

const createCategory = async (title, parentCategory) => {
  try {
    const category = createCatalogLinks(title)

    const { data } = await axios.post('/api/catalog', {
      title: category.title,
      parentCategory: parentCategory,
      url: category.url,
    })

    if (data) {
      categoryCreated.value = true

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        categoryCreated.value = false
      }, 3000)
    }

    await store.fetchCatalog()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getCategories()
})

watch(() => store.categoryTree, (newValue) => {
  storeData.value = newValue
  getCategories()
})
</script>

<style scoped lang="scss">
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

.error {
  color: $invalid
}

.success {
  color: $success
}
</style>