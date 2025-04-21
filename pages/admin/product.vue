<template>
  <div>
    <h1>Product Page</h1>

    <div class="buttons-container">
      <button @click="navigateTo('/admin/')">Go to Category Page</button>
    </div>

    <div class="product-page-column">
      <h2>Product list: </h2>

      <div class="product-page-column-header">
        <div class="product-page-input-container">
          <p class="product-page-input-title">Поиск по продуктам:</p>
          <div class="product-page-input-container">
            <input type="text" v-model="searchProduct">
            <Icon name="cross" class="product-page-input-delete-icon" @click="searchProduct = null" v-show="searchProduct" />
          </div>
        </div>

        <div>
          <button @click="openModal('add')">Add Product</button>
          <AdminModalProduct v-if="state.showAdminModal" />
        </div>
      </div>

      <div>
        <table>
          <thead>
          <tr>
            <td v-for="item in productMenu" :key="item">
              {{ item }}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product, index) of filteredProducts.length ? filteredProducts : store.products" :key="product._id">
            <td>
              {{ index + 1}}.
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              {{ product.description ? 'Yes' : 'No' }}
            </td>
            <td>
              {{ catalogStore.getSubcategoryParentTitle(product.category) }}
            </td>
            <td>
              ${{ product.price.toLocaleString('en-US') }}
            </td>
            <td>
              {{product.stock }}
            </td>
            <td>
              {{ product._id }}
            </td>
            <td class="edit-button" @click="openModal('edit', product._id)">
              <Icon name="edit" />
            </td>
            <td class="delete-button" @click="openModal('delete', product._id)">
              <Icon name="cross" />
            </td>
            <AdminModalProduct v-if="state.showAdminModal && editIndex === product._id" :product="product" />
            <DeleteModal v-if="state.showAdminModal && deleteIndex === product._id" :entity="product" />
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useProductStore} from "~/stores/product"
import {useStateStore} from "~/stores/state"
import {useCatalogStore} from "~/stores/catalog"

const catalogStore = useCatalogStore()
const store = useProductStore()
const state = useStateStore()

const productMenu = ['#','title', 'description', 'category', 'price', 'stock', '_id']

const products = computed(() => store.products)

const deleteIndex = ref<string | null>(null)
const editIndex = ref<string | null>(null)

const searchProduct = ref<string | null>(null)

const filteredProducts = computed(() => {
  if (!searchProduct.value?.trim()) return products.value

  if (searchProduct.value.trim()) {
    return products.value.filter(item => item.title.toLowerCase().includes(searchProduct.value.toLowerCase()))
  }
})

const openModal = (type: 'add' | 'edit' | 'delete', index: string | null = null) => {
  state.showAdminModal = true
  state.isAddOrEdit = type === 'edit' ? 'edit' : type === 'add' ? 'add' : null

  editIndex.value = type === 'edit' ? index : null
  deleteIndex.value = type === 'delete' ? index : null
}

onMounted(() => {
  store.requestAllProducts()
})

watch(
    () => state.showAdminModal, () => {
      if (state.showAdminModal === false) {
        deleteIndex.value = null
        editIndex.value = null
      }
    }
)
</script>

<style scoped lang="scss">
.product-page {
  display: flex;
  gap: 20px;

  &-column {
    min-width: 630px;

    &-header {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      margin-bottom: 4px;
    }
  }

  &-input {
    &-container {
      position: relative;
      max-width: 200px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    &-delete-icon {
      position: absolute;
      right: 32px;
      cursor: pointer;
    }

    &-title {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }
}

.edit-button {
  cursor: pointer;
}

.delete-button {
  cursor: pointer;
}
</style>