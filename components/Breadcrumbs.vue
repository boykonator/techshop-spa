<template>
  <div class="catalog-breadcrumb-list" v-if="!isProductPage">
    <div
        v-for="(item, index) in store.breadcrumbArray"
        :key="item.title"
        @click="navigateTo(`/catalog/${item.url}`)"
        class="catalog-breadcrumb-list-content"
    >
        <span :class="index !== store.breadcrumbArray.length - 1 ? 'catalog-breadcrumb-list-item': 'catalog-breadcrumb-list-item-last'">
          {{ item.title }}</span>
      <Icon
          name="arrow-right"
          size="16"
          class="catalog-breadcrumb-list-arrow"
          v-show="index !== store.breadcrumbArray.length - 1"
      />
    </div>
  </div>

  <div class="catalog-breadcrumb-list" v-else>
    <div
        v-for="(item, index) in store.breadcrumbArray"
        :key="item.title"
        @click="navigateTo(`/catalog/${item.url}`)"
        class="catalog-breadcrumb-list-content"
    >
        <span class="catalog-breadcrumb-list-item">
          {{ item.title }}
        </span>
      <Icon
          name="arrow-right"
          size="16"
          class="catalog-breadcrumb-list-arrow"
      />
    </div>
    <div class="catalog-breadcrumb-list-item-last">
      {{ store.product?.title }}
    </div>
  </div>
</template>

<script setup>
import {useCatalogStore} from "~/stores/catalog.ts";
const store = useCatalogStore()

import {useRoute} from 'vue-router';
const route = useRoute();

const isProductPage = ref(route.path.split('/').filter(item => item)[0] === 'product')
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

</style>