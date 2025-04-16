<template>
  <div>
    helo product =)

    i'm id page of {{ route.path }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()
</script>