<template>
  <div>
    page {{ route.path }}

    <div v-for="item of store[store.activeTab]">
      {{item.title }}
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

import {useCatalogStore} from "~/stores/catalog.ts";
const store = useCatalogStore()

const title = () => {
  console.log(store.activeTab)
  let path = store.activeTab
  let result = store.catalog.filter((item) => item.url === path);
  console.log('result: ', result)
}

title()
</script>