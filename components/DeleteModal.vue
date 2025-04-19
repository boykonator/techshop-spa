<template>
  <div class="delete-modal">
    <div class="modal-heading">Deleting entity</div>
    <div class="delete-modal-text">Are you sure you want to delete <strong>{{ props.category?.title }}</strong>?</div>
    <Icon name="cross" class="delete-modal-cross" @click="state.showAdminModal = false" />
    <div class="delete-modal-button-container">
      <button
          class="delete-modal-delete-button"
          @click="deleteCategory(props.category._id)"
          :disabled="state.isClicked"
      >Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useCatalogStore } from "~/stores/catalog"
import {useStateStore} from "~/stores/state";

const store = useCatalogStore()
const state = useStateStore()

const props = defineProps({
  category: {}
})

const deleteCategory = async (id: string) => {
  try {
    state.isClicked = true
    const {data} = await axios.delete(`/api/catalog/${id}`)
    console.log(data)
    await store.fetchCatalog()
    state.isClicked = false
    state.showAdminModal = false
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
.delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  &-delete-button {
    background: $invalid;
    border-color: rgba($invalid, 0.5);
    cursor: pointer;
    margin-top: 8px;

    &:hover {
      background: rgba($invalid, 0.9);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>