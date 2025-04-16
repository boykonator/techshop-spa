<template>
  <div>
    <h3 @click="navigateTo('/admin')"> < Go Back</h3>
    <h1>Admin Add Page</h1>

   <div style="display: flex">
     <div>
       <button @click="toggleCategoryModal">Add Category</button>

       <div v-if="category.showModal" class="add-modal">
         <div class="add-modal-content">
           <div><strong>Add Category</strong></div>

           <p>Title</p>
           <input type="text" v-model="category.title" />

           <p>Category</p>
           <select name="" id="" v-model="category.parent">
             <option :value="null">
               null (Parent Category)
             </option>
             <option v-for="category in store.catalog" :value="category._id">
               {{ category.title }}
             </option>
           </select>

           <button
               @click="createCategory(category.title, category.parent)"
               :disabled="!category.title.length"
               class="submit"
           >Create category</button>

           <Icon name="cross" class="add-modal-close" @click="category.showModal = false" />
         </div>
         <div v-if="instanceCreated" class="success">Category created successfully!</div>
       </div>
     </div>

     <div>
       <button @click="toggleSubcategoryModal">Add Subcategory</button>

       <div v-if="subcategory.showModal" class="add-modal">
         <div class="add-modal-content">
           <div><strong>Add Subcategory</strong></div>

           <p>Title</p>
           <input type="text" v-model="subcategory.title" />

           <p>Category</p>
           <select v-model="subcategory.parent">
             <option value="" disabled class="hidden">Choose category</option>
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
               @click="createCategory(subcategory.title, subcategory.parent)"
               :disabled="!subcategory.title || !subcategory.parent"
               class="submit"
           >Create category</button>
           <Icon name="cross" class="add-modal-close" @click="subcategory.showModal = false" />
         </div>

         <div v-if="instanceCreated" class="success">Subcategory created successfully!</div>
       </div>
     </div>

     <div>
       <button @click="toggleProductModal">Add Product</button>

       <div v-if="product.showModal" class="add-modal">
         <div class="add-modal-content">
           <div><strong>Add Product</strong></div>

           <p>Title</p>
           <input type="text" v-model="product.title" />

           <p>Description</p>
           <textarea type="text" v-model="product.description" />

           <p>Category</p>

           <select v-model="product.category">
             <option value="" disabled hidden>Choose category</option>

             <template v-for="parent in store.categoryTree" :key="parent.title">
               <optgroup :label="parent.title" class="divider">
                 {{ parent.title }}
               </optgroup>

               <template v-for="category in parent.categories" :key="category.title">
                 <optgroup disabled :label="category.title">
                   {{category.title}}
                 </optgroup>

                 <option
                     v-for="(subcategory, index) in category.subcategories"
                     :key="subcategory._id"
                     :value="subcategory._id"
                     :disabled="index === category.subcategories.length - 1"
                 >
                   {{ index === category.subcategories.length - 1 ? '' : subcategory.title }}
                 </option>
               </template>
             </template>
           </select>

           <p>Price</p>
           <input type="number" v-model="product.price" />

           <p>Stock</p>
           <input type="number" v-model="product.stock" />

           <button
               @click="createProduct"
               :disabled="!product.title || !product.category || !product.price"
               class="submit"
           >Create Product</button>

           <Icon name="cross" class="add-modal-close" @click="product.showModal = false" />
         </div>

         <div v-if="instanceCreated" class="success">Product created successfully!</div>
       </div>
     </div>
   </div>
  </div>
</template>

<script setup>
import { createCatalogLinks, createProductData } from '~/utils/index.js'
import axios from "axios";

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

const storeData = ref(store.categoryTree)

const category = ref({
  title: '',
  parent: null,
  showModal: false
})
const subcategory = ref({
  title: '',
  parent: '',
  showModal: false
})
const product = ref({
  title: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  brand: '',
  images: '',
  showModal: false
})

const categories = ref([])
const instanceCreated = ref(false)


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

const toggleCategoryModal = () => {
  subcategory.value.showModal = false
  product.value.showModal = false
  category.value.showModal = !category.value.showModal
}

const toggleSubcategoryModal = () => {
  category.value.showModal = false
  product.value.showModal = false
  subcategory.value.showModal = !subcategory.value.showModal
}

const toggleProductModal = () => {
  subcategory.value.showModal = false
  category.value.showModal = false
  product.value.showModal = !product.value.showModal
}

let timeout = null

const showSuccessMessage = (data) => {
  if (data) {
    instanceCreated.value = true

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      instanceCreated.value = false
    }, 3000)
  }
}

const createCategory = async (title, parentCategory) => {
  try {
    const category = createCatalogLinks(title)

    const { data } = await axios.post('/api/catalog', {
      title: category.title,
      parentCategory: parentCategory,
      url: category.url,
    })

    showSuccessMessage(data)

    await store.fetchCatalog()
  } catch (error) {
    console.error(error)
  }
}

const createProduct = async () => {
  try {
    const productData = createProductData(product.value.title)

    const { data } = await axios.post('/api/products', {
      title: productData.title,
      brand: productData.brand,
      description: product.value.description,
      price: product.value.price,
      category: product.value.category,
      stock: product.value.stock,
      images: `/images/${productData.brand}`,
    })

    showSuccessMessage(data)

    const products = await axios.get('/api/products')
    console.log('products: ',products.data)
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
p {
  margin: 8px 0 4px 0;
}

.add {
  &-modal {
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

    &-content {
      display: flex;
      flex-direction: column;
    }
  }
}

.error {
  color: $invalid
}

.success {
  color: $success
}

.hidden {
  display: none;
}

.submit {
  margin-top: 12px;
}
</style>