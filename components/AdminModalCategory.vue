<template v-if="state.showAdminModal && state.isAddOrEdit">
  <div class="edit-modal" v-if="state.isAddOrEdit === 'edit' && state.showAdminModal">
    <div class="edit-modal-content">
      <div class="modal-heading">Edit Category</div>

      <p class="label">Title</p>
      <input type="text" v-model="propsCategory.title"/>

      <p class="label">Parent Category</p>
      <select name="" id="" v-model="propsCategory.parentCategory">
        <option :value="null">
          null (Parent Category)
        </option>
        <option v-for="category in store.catalog" :value="category._id">
          {{ category.title }}
        </option>
      </select>

      <button
          @click="store.editCategory(propsCategory.title, propsCategory.parentCategory, propsCategory._id)"
          :disabled="propsCategory.title === props.category?.title && propsCategory.parentCategory === props.category?.parentCategory"
          class="submit"
      >Edit category
      </button>

      <Icon name="cross" class="edit-modal-close" @click="state.showAdminModal = false"/>
    </div>

    <div v-if="state.instanceCreated" class="success">Category updated successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Oops! Couldn't update the category.</div>
  </div>

  <div class="add-page-modal" v-if="state.isAddOrEdit === 'add'">
    <div class="add-page-modal-content">
      <div class="modal-heading">Add Category</div>

      <p class="label">Title</p>
      <input type="text" v-model="category.title"/>

      <p class="label">Parent Category</p>
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
      >Create category
      </button>
      <Icon name="cross" class="add-page-modal-close" @click="state.showAdminModal = false"/>
    </div>
    <div v-if="state.instanceCreated" class="success">Category created successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Such category was already created!</div>
  </div>
</template>

<script setup>
import {useCatalogStore} from "~/stores/catalog"
import {useStateStore} from "~/stores/state";

const store = useCatalogStore()
const state = useStateStore()

const props = defineProps({
  category: {
    type: Object,
    default: null
  }
})

const propsCategory = ref({ ...props.category })

const category = ref({
  title: '',
  parent: null
})
</script>