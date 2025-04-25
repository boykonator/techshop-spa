<template>
  <div>
    <Breadcrumbs />

    helo product =)

    i'm id page of {{ route.path }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCatalogStore } from "~/stores/catalog"
import {useProductStore} from "~/stores/product"

const route = useRoute()
const store = useProductStore()
const catalog = useCatalogStore()

onBeforeMount(async () => {
  if (!catalog.categoryTree.length) {
    await catalog.fetchCatalog()
  }

  await store.requestProduct()
  await catalog.createBreadcrumbs(route.params.url, true)
})
</script>