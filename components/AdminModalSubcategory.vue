<template>
  <div class="add-modal" v-if="state.isAddOrEdit === 'edit'">
    <div class="add-modal-content">
      <div><strong>Edit Subcategory</strong></div>

      <p>Title</p>
      <input type="text" v-model="propsSubcategory.title" />

      <p>Category</p>
      <select v-model="propsSubcategory.parent">
        <option value="" disabled hidden>Choose category</option>

        <template v-for="parent in groupedCategories" :key="parent.title">
          <option :value="parent._id" style="font-weight: bold">
            {{ parent.title }}
          </option>

          <option
              v-for="child in parent.children"
              :key="child._id"
              :value="child._id"
          >
            └ {{ child.title }}
          </option>
        </template>
      </select>

      <button
          @click="store.editCategory(propsSubcategory._id, propsSubcategory.title, propsSubcategory.parent)"
          :disabled="propsSubcategory.title === props.category.title && propsSubcategory.parent === props.category.parent"
          class="submit"
      >
        Edit subcategory
      </button>

      <Icon name="cross" class="add-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Subcategory updated successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Something wrong happened..</div>
  </div>

  <div class="add-modal" v-if="state.isAddOrEdit === 'add'">
    <div class="add-modal-content">
      <div><strong>Add Subcategory</strong></div>

      <p>Title</p>
      <input type="text" v-model="subcategory.title" />

      <p>Category</p>
      <select v-model="subcategory.parent">
        <option value="" disabled hidden>Choose category</option>
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
          @click="store.createCategory(subcategory.title, subcategory.parent)"
          :disabled="!subcategory.title || !subcategory.parent"
          class="submit"
      >
        Create subcategory
      </button>

      <Icon name="cross" class="add-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Subcategory created successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Such subcategory was already created!</div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

import { useStateStore } from "~/stores/state"
const state = useStateStore()

const props = defineProps({
  category: Object
})

const propsSubcategory = ref({ ...props.category })

const subcategory = ref({
  title: '',
  parent: ''
})

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
</script>