<template>
  <div>

  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user'
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.user) {
    navigateTo("/");
  } else {
    navigateTo("/profile/settings");
  }
});
</script>