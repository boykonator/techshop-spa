<template>
  <div>
    <h1>Product Page</h1>

    <div class="buttons-container">
      <button @click="navigateTo('/admin/')">Go to Category Page</button>
      <button @click="navigateTo('/admin/orders')">Go to Orders Page</button>
    </div>

    <div class="product-page-column">
      <h2>Product list:</h2>

      <div class="product-page-column-header">
        <div class="product-page-input-container">
          <p class="product-page-input-title">Поиск по продуктам:</p>
          <div class="product-page-input-container">
            <input type="text" v-model="searchProduct" />
            <Icon
                name="cross"
                class="product-page-input-delete-icon"
                @click="searchProduct = null"
                v-show="searchProduct"
            />
          </div>
        </div>

        <div class="product-page-column-header">
          <button @click="state.openModal('add')">Add Product</button>
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
            <td></td><td></td>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(product, index) of filteredProducts.length ? filteredProducts : store.products"
              :key="product._id"
          >
            <td>{{ index + 1 }}.</td>
            <td>{{ product.title }}</td>
            <td>{{ product.description ? 'Yes' : 'No' }}</td>
            <td>{{ catalogStore.getSubcategoryParentTitle(product.category) }}</td>
            <td>${{ product.price.toLocaleString('en-US') }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product._id }}</td>
            <td class="edit-button" @click="state.openModal('edit', product._id)">
              <Icon name="edit" />
            </td>
            <td class="delete-button" @click="state.openModal('delete', product._id)">
              <Icon name="cross" />
            </td>

            <AdminModalProduct
                v-if="state.showAdminModal && state.editIndex === product._id"
                :product="product"
            />
            <DeleteModal
                v-if="state.showAdminModal && state.deleteIndex === product._id"
                :entity="product"
            />
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/product"
import { useStateStore } from "~/stores/state"
import { useCatalogStore } from "~/stores/catalog"

const catalogStore = useCatalogStore()
const store = useProductStore()
const state = useStateStore()

const productMenu = ['#', 'title', 'description', 'category', 'price', 'stock', '_id']

const products = computed(() => store.products)

const searchProduct = ref<string | null>(null)

const filteredProducts = computed(() => {
  if (!searchProduct.value?.trim()) return products.value
  return products.value.filter((item) =>
      item.title.toLowerCase().includes(searchProduct.value.toLowerCase())
  )
})

onMounted(store.requestAllProducts)

watch(
    () => state.showAdminModal,
    () => {
      if (state.showAdminModal === false) {
        state.deleteIndex = null
        state.editIndex = null
      }
    }
)
</script>

<style scoped lang="scss">
.product-page-column {
  margin-top: 24px;

  h2 {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 600;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 32px;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;

    thead {
      background-color: #f7f9fc;

      tr {
        td {
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s;

        &:nth-child(even) {
          background-color: #f9fafb;
        }

        &:hover {
          background-color: #f1f5f9;
        }

        td {
          padding: 10px 12px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }
      }
    }
  }
}

.product-page-column-header {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 12px;
}

.product-page-input-container {
  position: relative;
  max-width: 200px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.product-page-input-title {
  margin-bottom: 8px;
  font-weight: 500;
}

.product-page-input-delete-icon {
  position: absolute;
  right: 32px;
  cursor: pointer;
  font-size: 16px;
  color: #888;

  &:hover {
    color: #000;
  }
}

.buttons-container {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;

  button {
    background-color: #3b82f6;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }
  }
}

.edit-button,
.delete-button {
  cursor: pointer;
}
</style>