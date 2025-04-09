<template>
  <div>

  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.user) {
    navigateTo("/");
  } else {
    navigateTo("/profile/settings");
  }
});
</script>