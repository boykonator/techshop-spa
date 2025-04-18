<template>
  <div class="add-modal" v-if="state.isAddOrEdit === 'edit'">
    <div class="add-modal-content">
      <div><strong>
        Edit Category
      </strong></div>

      <p>Title</p>
      <input type="text" v-model="propsCategory.title" />

      <p>Category</p>
      <select name="" id="" v-model="propsCategory.parentCategory">
        <option :value="null">
          null (Parent Category)
        </option>
        <option v-for="category in store.catalog" :value="category._id">
          {{ category.title }}
        </option>
      </select>

      <button
          @click="store.createCategory(category.title, category.parent)"
          :disabled="propsCategory.title === props.category.title && propsCategory.parentCategory === props.category.parentCategory"
          class="submit"
      >Edit category</button>

      <Icon name="cross" class="add-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Category updated successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Something wrong happened..</div>
  </div>

  <div class="add-modal" v-if="state.isAddOrEdit === 'add'">
    <div class="add-modal-content">
      <div><strong>
        Add Category
      </strong></div>

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
          @click="store.createCategory(category.title, category.parent)"
          :disabled="!category.title.length"
          class="submit"
      >Create category</button>

      <Icon name="cross" class="add-modal-close" @click="state.showAdminModal = false" />
    </div>
    <div v-if="state.instanceCreated" class="success">Category created successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Such category was already created!</div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

import {useStateStore} from "~/stores/state";
const state = useStateStore()

const props = defineProps({
  category: {},
})

const propsCategory = ref({
  title: props.category.title,
  parentCategory: props.category.parentCategory,
})

console.log('category: ',propsCategory)
console.log(state.isAddOrEdit)

const category = ref({
  title: '',
  parent: null
})
</script>