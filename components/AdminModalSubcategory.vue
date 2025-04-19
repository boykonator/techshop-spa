<template v-if="state.showAdminModal && state.isAddOrEdit">
  <div class="edit-modal" v-if="state.isAddOrEdit === 'edit'">
    <div class="edit-modal-content">
      <div class="modal-heading">Edit Subcategory</div>

      <p class="label">Title</p>
      <input type="text" v-model="propsSubcategory.title" />

      <p class="label">Parent Category</p>
      <select v-model="propsSubcategory.parentCategory">
        <option :value="null">null (Parent Category)</option>
        <option disabled>──────────────</option>
        <template v-for="parent in groupedCategories" :key="parent.title">
          <option :value="parent._id" style="font-weight: bold">
            {{ parent.title }}
          </option>

          <option
              v-for="child in parent.children"
              :key="child._id"
              :value="child._id"
          >
            {{ child.title }}
          </option>
        </template>
      </select>

      <button
          @click="store.editCategory(propsSubcategory.title, propsSubcategory.parentCategory, propsSubcategory._id)"
          :disabled="propsSubcategory.title === props.category.title && propsSubcategory.parentCategory === props.category.parentCategory"
          class="submit"
      >
        Edit subcategory
      </button>

      <Icon name="cross" class="edit-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Subcategory updated successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Oops! Couldn't update the subcategory.</div>
  </div>

  <div class="add-page-modal" v-if="state.isAddOrEdit === 'add'">
    <div class="add-page-modal-content">
      <div class="modal-heading">Add Subcategory</div>


      <p class="label">Title</p>
      <input type="text" v-model="subcategory.title" />

      <p class="label">Parent Category</p>
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

      <Icon name="cross" class="add-page-modal-close" @click="state.showAdminModal = false" />
    </div>

    <div v-if="state.instanceCreated" class="success">Subcategory created successfully!</div>
    <div v-if="state.instanceCreated === false" class="error">Looks like that subcategory already exists.</div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "~/stores/catalog"
import { useStateStore } from "~/stores/state"

const store = useCatalogStore()
const state = useStateStore()

const props = defineProps({
  category: {
    type: Object,
    default: null
  }
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

    if (!groupMap.has(parent._id)) {
      groupMap.set(parent._id, {
        _id: parent._id,
        title: parent.title,
        children: []
      })
    }

    groupMap.get(parent._id).children.push(category)
  })

  return Array.from(groupMap.values())
})
</script>