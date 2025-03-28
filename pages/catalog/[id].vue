<template>
  <div>
    i'm id page of {{ route.path }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();


</script>