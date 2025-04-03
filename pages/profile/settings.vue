<template>
  <div class="profile">
    <div class="profile-title">Настройки профиля</div>
    <div class="profile-content">
      <div class="profile-content-item" v-for="item in profile" :key="item.title">
        <div>{{ item.title }}</div>
        <input
            v-if="item.editable"
            :type="item.key === 'password' ? 'password' : 'text'"
            v-model="userStore.user[item.key]"
        />
        <span v-else>
          {{ userStore.user[item.key] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'
const userStore = useUserStore();

const profile = computed(() => [
  { title: "Электронная почта", key: "email", editable: true },
  { title: "Пароль", key: "password", editable: true, },
  { title: "Ваше имя", key: "name", editable: true },
  { title: "Номер телефона", key: "phone", editable: true },
  { title: "Избранное", key: "wishlist", editable: false },
  { title: "История заказов", key: "orders", editable: false },
]);

if (!userStore.user) {
  navigateTo("/");
}
</script>

<style scoped lang="scss">
.profile {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 12px 0;
  }

  &-content {
    background: #fff;
    box-shadow: 0 2px 4px -2px darkgray;
    height: 50vh;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    padding: 28px;

    &-image {
      height: 200px;
      width: 250px;
      background: $primary-color;
    }

    &-text {
      font-size: 16px;
      line-height: 26px;
    }
  }
}
</style>