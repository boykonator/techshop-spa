<template>
  <div>
    <div class="catalog-breadcrumb-list">
      <div
          v-for="(item, index) in store.breadcrumbArray"
          :key="item.title"
          @click="navigateTo(`/catalog/${item.url}`)"
          class="catalog-breadcrumb-list-content"
      >
        <span
            :class="index !== store.breadcrumbArray.length - 1 ? 'catalog-breadcrumb-list-item': 'catalog-breadcrumb-list-item-last'">{{
            item.title
          }}</span>
        <Icon
            name="arrow-right"
            size="16"
            class="catalog-breadcrumb-list-arrow"
            v-show="index !== store.breadcrumbArray.length - 1"
        />
      </div>
    </div>

    <div class="catalog-title">
      {{ store.breadcrumbArray[store.breadcrumbArray.length - 1]?.title }}
      <span v-if="products.length">{{ products.length }} товаров</span>
    </div>

    <div v-if="products.length" class="catalog-content">
      <div
          v-for="item in products"
          :key="item.title"
          class="catalog-content-card-container"
          @click="navigateTo(`/products/${item.url}`)"
      >
        <div class="catalog-content-card">
          <div class="catalog-content-card-inner">
            <div class="catalog-content-card-face card-default">
              <div class="catalog-content-card-text">{{ item.title }}</div>
            </div>
          </div>
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
          <div class="catalog-content-card-inner">
            <div class="catalog-content-card-face card-default">
              <div class="catalog-content-card-text">{{ item.title }}</div>
            </div>
          </div>
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
        store.createBreadcrumbs(route.params.category)
        requestProducts()
        console.log(store.breadcrumbs)
      }
    },
    {immediate: true}
)
</script>

<style scoped lang="scss">
.catalog-breadcrumb-list {
  display: flex;
  align-content: center;
  font-size: 13px;

  &-content {
    display: flex;
    align-items: center;
  }

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
      position: relative;
      width: 240px;
      height: 220px;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px -2px $dark-gray;
      transition: box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 10px 20px 1px $mid-gray;
      }

      &-inner {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &-face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
        overflow: hidden;
        transition: opacity 0.4s ease-in-out;
        opacity: 1;
        z-index: 1;
        background: #fff;
      }

      .card-default {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        text-align: center;
      }

      .card-hover {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;

        opacity: 0;
        z-index: 2;
      }

      .card-visible {
        opacity: 1;
      }

      .card-hidden {
        opacity: 0;
      }

      &-image {
        height: 152px;
        width: 152px;
      }

      &-text {
        font-size: 15px;
        line-height: 26px;
        font-weight: bold;
        word-wrap: break-word;
        text-align: center;
      }

      &-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
        cursor: pointer;

        &:hover {
          color: $secondary-color;
        }
      }

      &-category {
        font-size: 14px;
        line-height: 18px;
        padding-bottom: 10px;
        cursor: pointer;

        &:hover {
          color: $secondary-color;
        }
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