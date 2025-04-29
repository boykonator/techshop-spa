<template>
  <div class="header-login-container">
    <div class="header-login">
      <div class="header-login-title">Получайте бонусы, сохраняйте и отслеживайте заказы</div>

      <button @click="state.toggleLoginModal" class="header-login-button">Войти</button>

      <div class="header-login-menu">
        <div v-for="item of menu" :key="item.url" class="header-login-menu-item" @click="navigateTo(`/${item.url}`)">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStateStore} from "~/stores/state";
const state = useStateStore()

const menu = [
  {title: 'Узнать статус заказа', url: 'order/check-order-status'},
  {title: 'Обратная связь', url: 'feedback'},
  {title: 'Обмен, возврат, гарантия', url: 'service-center'},
]
</script>

<style scoped lang="scss">
.header-login {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 28px 20px;
  position: relative;

  &-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    min-width: 212px;
  }

  &-title {
    font-weight: 500;
    margin-bottom: 12px;
    font-size: 14px;
  }

  &-button {
    width: 100%;
  }

  &-menu {
    margin: 24px 0 12px 0;

    &-item {
      line-height: 20px;
      margin-bottom: 8px;

      &:hover {
        color: $secondary-color;
      }
    }
  }
}
</style>