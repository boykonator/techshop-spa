<template>
  <div class="catalog-content-products-container">
    <div class="catalog-filters">filters man)</div>
    <div class="catalog-content-products">
      <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useCatalogStore } from '~/stores/catalog'

const store = useCatalogStore()

const products = ref([])

const fetchProducts = async () => {
  const categoryId = store.breadcrumbs?.subcategory?._id
  if (!categoryId) return

  try {
    const { data } = await axios.get('/api/products', {
      params: { _id: categoryId }
    })
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(fetchProducts)
</script>

<style scoped lang="scss">
.catalog {
  &-title {
    font-size: 32px;
    font-weight: bold;
    margin: 12px 0 20px;
  }

  &-filters {
    min-width: 280px;
    margin-right: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 4px -2px $dark-gray;
    transition: box-shadow 0.3s ease-in-out;
  }

  &-buy-button {
    background: #ffffff;
    color: $slate-gray;
    border-color: $mid-gray;
    border-radius: 12px;
    width: 100%;
    box-sizing: border-box;
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    align-items: center;
    justify-items: center;

    @media (max-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }

    &-products {
      display: flex;
      flex-direction: column;
      gap: 12px;

      &-container {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>