<template>
  <div>
    <div class="modal-heading" @click="navigateTo('/admin')"> < Go Back</div>
    <h1>Add Page</h1>

   <div class="buttons-container">
     <div>
       <button @click="toggleModal('category')">Add Category</button>
       <AdminModalCategory v-if="showModal === 'category'" />
     </div>

     <div>
       <button @click="toggleModal('subcategory')">Add Subcategory</button>
       <AdminModalSubcategory v-if="showModal === 'subcategory'" />
     </div>

     <div>
       <button @click="toggleModal('product')">Add Product</button>
       <AdminModalProduct v-if="showModal === 'product'" />
     </div>
   </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

const categories = ref([])

const showModal = ref<string | null>(null)

const getCategories = () => {
  categories.value = store.categoryTree.flatMap(category =>
      category.categories?.length ? category.categories : []
  )
}

const toggleModal = (modalName: string) => {
  showModal.value = showModal.value === modalName ? null : modalName
}

onMounted(() => {
  getCategories()
})

watch(() => store.categoryTree, getCategories)
</script>