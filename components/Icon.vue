<template>
  <span :class="['material-symbols-outlined', iconClass]" :style="{ fontSize: size + 'px' }">
    {{ iconName }}
  </span>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: "24" // Default size is 24px
  },
  iconClass: {
    type: String,
    default: "" // You can add additional classes if needed
  }
});
</script>

<style scoped>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
  display: inline-block;
  vertical-align: middle;
}
</style>
