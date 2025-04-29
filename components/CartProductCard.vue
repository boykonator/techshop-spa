<template>
  <div>
    {{props.product}}
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
})
</script>