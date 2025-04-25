<template>
  <div>
    <Breadcrumbs/>

    <div class="catalog-title">
      {{ currentCategoryTitle }}
      <span v-if="products.length">{{ products.length }} товаров</span>
    </div>


    <ProductsPage v-if="store.breadcrumbs?.subcategory"/>

    <div v-else class="catalog-content">
      <div
          v-for="category in subcategories"
          :key="category._id"
          class="catalog-content-card-container"
          @click="navigateTo(`/catalog/${category.url}`)"
      >
        <div class="catalog-content-card">
          <img
              class="catalog-content-card-image"
              :src="`/images/catalog/${category.url}.png`"
              :alt="category.title"
          />
          <div class="catalog-content-card-text">{{ category.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {useRoute} from 'vue-router'
import {useCatalogStore} from '~/stores/catalog'
import ProductsPage from "~/components/ProductsPage.vue";

const route = useRoute()
const store = useCatalogStore()

const currentCategoryTitle = computed(() => {
  const lastItem = store.breadcrumbArray.at(-1)
  return lastItem?.title ?? ''
})

const subcategories = computed(() => {
  const lastItem = store.breadcrumbArray.at(-1)
  return lastItem?.subcategories ?? lastItem?.categories ?? []
})

const products = ref([])
const fetchProducts = async () => {
  const categoryId = store.breadcrumbs?.subcategory?._id

  if (!categoryId) return

  try {
    const {data} = await axios.get('/api/products', {
      params: {_id: categoryId}
    })
    products.value = data
    console.log('Fetched products:', products.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

watch(
    () => store.categoryTree,
    (tree) => {
      if (tree.length) {
        store.createBreadcrumbs(route.params.category as string, false)
        fetchProducts()
      }
    },
    {immediate: true}
)
</script>

<style scoped lang="scss">
.catalog {
  &-title {
    font-size: 32px;
    font-weight: bold;
    margin: 12px 0 20px;
  }

  &-content {
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 16px;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

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

    &-card-container {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    &-card {
      width: 240px;
      height: 220px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px -2px $dark-gray;
      transition: box-shadow 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      text-align: center;
      cursor: pointer;

      &:hover {
        box-shadow: 0 10px 20px 1px $mid-gray;
      }

      &-image {
        max-height: 132px;
        max-width: 132px;
        object-fit: contain;
      }

      &-text {
        font-size: 15px;
        line-height: 26px;
        font-weight: bold;
        word-wrap: break-word;
        text-align: center;
      }
    }

    &-products {
      display: flex;
      flex-direction: column;
      max-height: 10vh;
    }
  }

  &-breadcrumb-list {
    display: flex;
    align-content: center;
    font-size: 13px;

    &-item {
      cursor: pointer;

      &-last {
        color: $graphite-gray;
      }
    }

    &-arrow {
      transform: rotate(-90deg);
      color: $graphite-gray;
    }
  }
}
</style>