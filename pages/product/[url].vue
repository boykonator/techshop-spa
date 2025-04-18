<template>
  <div>
    <Breadcrumbs />

    helo product =)

    i'm id page of {{ route.path }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

import { useCatalogStore } from "~/stores/catalog"
import axios from "axios";
const store = useCatalogStore()

const product = ref({})


const requestProduct = async () => {
  const {data} = await axios.get(`/api/products/${route.params.url}`)

  product.value = data
  console.log('data: ', product.value)
}

requestProduct()

store.createBreadcrumbs(route.params.category, true)
</script>