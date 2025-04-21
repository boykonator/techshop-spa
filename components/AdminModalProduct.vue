<template v-if="state.showAdminModal && state.isAddOrEdit">
  <div class="edit-modal" v-if="state.isAddOrEdit === 'edit'">
    <div class="edit-modal-content">
      <div class="modal-heading">Edit Product</div>

      <p class="label">Title</p>
      <input type="text" v-model="propsProduct.title" />

      <p class="label">Description</p>
      <textarea type="text" v-model="propsProduct.description" />

      <p class="label">Category</p>

      <select v-model="propsProduct.category">
        <option value="" disabled hidden>Choose category</option>

        <template v-for="parent in catalogStore.categoryTree" :key="parent.title">
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

      <p class="label">Price</p>
      <input type="number" v-model="propsProduct.price" />

      <p class="label">Stock</p>
      <input type="number" v-model="propsProduct.stock" />

      <button
          @click="editProduct"
          :disabled="propsProduct.title === props.product?.title && propsProduct.description === props.product?.description && propsProduct.category === props.product?.category && propsProduct.price === props.product?.price && propsProduct.price === props.product?.price && propsProduct.stock === props.product?.stock"
          class="submit"
      >Edit Product</button>

      <Icon name="cross" class="add-page-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Product updated successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Oops! Couldn't update the product.</div>
  </div>

  <div class="add-page-modal" v-if="state.isAddOrEdit === 'add'">
    <div class="add-page-modal-content">
      <div class="modal-heading">Add Product</div>

      <p class="label">Title</p>
      <input type="text" v-model="product.title" />

      <p class="label">Description</p>
      <textarea type="text" v-model="product.description" />

      <p class="label">Category</p>

      <select v-model="product.category">
        <option value="" disabled hidden>Choose category</option>

        <template v-for="parent in catalogStore.categoryTree" :key="parent.title">
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

      <p class="label">Price</p>
      <input type="number" v-model="product.price" />

      <p class="label">Stock</p>
      <input type="number" v-model="product.stock" />

      <button
          @click="createProduct"
          :disabled="!product.title || !product.category || !product.price"
          class="submit"
      >Create Product</button>

      <Icon name="cross" class="add-page-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Product created successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Oops! Couldn't create the product.</div>
  </div>
</template>

<script setup>
import axios from "axios"
import {createProductData, showSuccessMessage} from "~/utils/index.js"
import { useCatalogStore } from "~/stores/catalog"
import {useStateStore} from "~/stores/state";
import {useProductStore} from "~/stores/product"

const store = useProductStore()
const catalogStore = useCatalogStore()
const state = useStateStore()

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const propsProduct = ref({ ...props.product })

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

    await store.requestAllProducts()
  } catch (error) {
    console.error(error)
  }
}

const editProduct = async () => {
  try {
    const productData = createProductData(propsProduct.value.title)

    const { data } = await axios.put(`/api/products/${propsProduct.value._id}`, {
      title: productData.title,
      brand: productData.brand,
      description: propsProduct.value.description,
      price: propsProduct.value.price,
      category: propsProduct.value.category,
      stock: propsProduct.value.stock,
      images: `/images/${productData.url}`,
      url: productData.url
    })

    showSuccessMessage(data)

    await store.requestAllProducts()
  } catch (error) {
    console.error(error)
  }
}
</script>