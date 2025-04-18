<template>
  <div class="edit-modal">
    <div class="edit-modal-text">You want to edit <strong>{{ category.title }}</strong></div>

    <Icon name="cross" class="edit-modal-cross" @click="state.showAdminModal = false" />

    <div class="edit-modal-button-container" v-if="props.instance === 'parent'">

      <button class="edit-modal-edit-button" @click="editCategory(category._id)">Edit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

import {useStateStore} from "~/stores/state";
import {createProductData} from "~/utils";
const state = useStateStore()

const props = defineProps({
  category: {},
})

const category = ref(props.category)

console.log('category: ',category)

const instanceUpdated = ref(false)

const editCategory = async (id: string) => {
  try {
    const {data} = await axios.put(`/api/catalog/${id}`)
    console.log(data)
    await store.fetchCatalog()
    state.showAdminModal = false
  } catch (error) {
    console.error(error)
  }
}



const editProduct = async () => {
  try {
    const productData = createProductData(product.value.title)

    const { data } = await axios.post('/api/products', {
      title: productData.title,
      brand: productData.brand,
      description: product.value.description,
      price: product.value.price,
      category: product.value.category,
      stock: product.value.stock,
      images: `/images/${productData.url}`,
      url: productData.url
    })

    showSuccessMessage(data, instanceUpdated.value)

    const products = await axios.get('/api/products')
    console.log('products: ',products.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
.edit-modal {
  position: absolute;
  background: white;
  padding: 32px 24px 16px 24px;
  border-radius: 8px;
  z-index: 5;

  &-text {
    margin: 12px 0;
  }

  &-cross {
    position: absolute;
    right: 12px;
    top: 8px;
    cursor: pointer;
  }

  &-button {
    &-container {
      display: flex;
      flex-direction: row-reverse;
    }
  }

  &-edit-button {
    background: $success;
    border-color: rgba($success, 0.5);
    cursor: pointer;

    &:hover {
      background: rgba($success, 0.9);
    }
  }
}
</style>