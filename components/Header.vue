<template>
  <div>
    <div v-if="isFocusedInput || isFocusedCatalog || store.showLoginModal" class="focus" @click.self="toggleFocus"/>

    <nav>
      <div class="header">
        <div style="cursor: pointer" @click="navigateTo('/admin')">admin</div>

        <HeaderCatalog v-model:isFocused="isFocusedCatalog" :style="{ zIndex: isFocusedCatalog ? 9 : 1 }"/>
        <HeaderInput v-model:isFocused="isFocusedInput" :style="{ zIndex: isFocusedInput ? 9 : 1 }"/>
        <HeaderLoginModal v-show="store.showLoginModal"/>

        <div class="header-link-container">
          <div
              v-for="item of menu"
              :key="item.name"
              class="header-link"
              @click="navigateTo(`/${item.url}`)"
          >
            <div class="header-link-icon">
              <Icon :name="item.icon"/>
            </div>
            {{ item.name }}
          </div>

          <div
              v-if="!store.user?._id"
              class="header-link"
              @mouseenter="showHeaderLogin = true"
              @mouseleave="showHeaderLogin = false"
          >
            <div class="header-link-icon">
              <Icon name="user"/>
            </div>
            {{ 'Войти' }}

            <HeaderLogin v-show="showHeaderLogin"/>
          </div>

          <div
              v-else
              class="header-link"
              @click="navigateTo('/profile')"
          >
            <div class="header-link-icon">
              <Icon name="user"/>
            </div>
            {{ 'Профиль' }}
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {Icon} from "#components";

import {useUserStore} from "~/stores/user";
const store = useUserStore()

const showHeaderLogin = ref(false)
const isFocusedInput = ref(false)
const isFocusedCatalog = ref(false)

const menu: { name: string, url: string, icon: string }[] = [
  {name: 'Избранное', url: 'wishlist', icon: 'favorite'},
  {name: 'Корзина', url: 'cart', icon: 'cart'},
]

const toggleFocus = () => {
  if (isFocusedInput.value) isFocusedInput.value = false;
  if (isFocusedCatalog.value) isFocusedCatalog.value = false;
  if (store.showLoginModal) store.showLoginModal = false;
}
</script>

<style scoped lang="scss">
.header {
  background-color: white;
  height: 104px;
  width: 100%;
  padding: 20px 144px;
  box-sizing: border-box;
  position: relative;
  font-size: 14px;
  box-shadow: 0 2px 4px -2px $dark-gray;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 1480px) {
    padding: 20px 18px;
  }

  @media(max-width: 1280px) {
    padding: 20px 12px;
  }

  @media(max-width: 1200px) {
    justify-content: center;
  }

  &-link {
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 12px;

    &:hover {
      background-color: $light-gray;
      border-radius: 12px;
    }

    @media(max-width: 800px) {
      padding: 0 8px;
    }

    &-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      height: 100%;
    }

    &-icon {
      color: $dark-gray;
    }
  }
}

.focus {
  background-color: rgba($dark-gray, 0.3);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  pointer-events: auto;
}
</style>