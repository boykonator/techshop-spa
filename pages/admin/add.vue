<template>
  <div>
    <h3 @click="navigateTo('/admin')"> < Go Back</h3>
    <h1>Admin Add Page</h1>

   <div class="add-modal-buttons">
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

<style lang="scss">
p {
  margin: 8px 0 4px 0;
}

.add {
  &-modal {
    position: absolute;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 300px;
    z-index: 5;

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

    &-buttons {
      display: flex;
      gap: 8px;
    }
  }
}

.error {
  margin-top: 4px;
  color: $invalid
}

.success {
  margin-top: 4px;
  color: $success
}

.submit {
  margin-top: 12px;
}
</style>