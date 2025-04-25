<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  navigateTo(`/catalog/${route.params.category}`)
})
</script>