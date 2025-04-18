<template>
  <div class="add-modal">
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

      <Icon name="cross" class="add-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Product created successfully!</div>
  </div>
</template>

<script setup>
import {createProductData, showSuccessMessage} from "~/utils/index.js"
import axios from "axios"

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

import {useStateStore} from "~/stores/state";
const state = useStateStore()

const product = ref({
  title: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  brand: '',
  images: '',
})

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
      images: `/images/${productData.url}`,
      url: productData.url
    })

    showSuccessMessage(data)

    const products = await axios.get('/api/products')
    console.log('products: ',products.data)
  } catch (error) {
    console.error(error)
  }
}
</script>