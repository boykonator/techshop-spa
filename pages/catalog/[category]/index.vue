<template>
  <div>
    <Breadcrumbs />

    <div class="catalog-title">
      {{ store.breadcrumbArray[store.breadcrumbArray.length - 1]?.title }}
      <span v-if="products.length">{{ products.length }} товаров</span>
    </div>

    <div v-if="products.length" class="catalog-content-products">
      <div
          v-for="item in products"
          :key="item.title"
          class="catalog-content-products-card-container"
          @click="navigateTo(`/product/${item.url}`)"
      >
        <div class="catalog-content-card">
          <img class="catalog-content-card-image" :src="`/images/${item.title}/1.jpg.webp`" :alt="`/images/${item.title}/`">
          <div class="catalog-content-card-text">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div v-else class="catalog-content">
      <div
          v-for="item in categories"
          :key="item.title"
          class="catalog-content-card-container"
          @click="navigateTo(`/catalog/${item.url}`)"
      >
        <div class="catalog-content-card">
          <img class="catalog-content-card-image" :src="`/images/catalog/${item.url}.png`" :alt="item.title" />
          <div class="catalog-content-card-text">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

import {useRoute} from 'vue-router';
const route = useRoute();

import {useCatalogStore} from "~/stores/catalog.ts";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
const store = useCatalogStore()

const products = ref([])

const categories = computed(() => {
  const lastItem = store.breadcrumbArray.at(-1)

  if (!lastItem) return []

  return lastItem.subcategories ?? lastItem.categories ?? []
})

const requestProducts = async () => {
  const _id = store.breadcrumbs?.subcategory?._id;

  if (!_id) return;

  const {data} = await axios.get('/api/products', {
    params: {_id}
  })

  products.value = data
  console.log('data: ', products.value)
}

watch(
    () => store.categoryTree,
    (newVal) => {
      if (newVal.length) {
        store.createBreadcrumbs(route.params.category, false)
        requestProducts()
        console.log(store.breadcrumbs)
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

      &-card {

      }
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