<template>
  <div>
    <div v-if="isFocusedInput || isFocusedCatalog" class="focus" @click.self="toggleFocus"></div>

    <nav>
      <div class="header">

        <HeaderCatalog v-model:isFocused="isFocusedCatalog" :style="{ zIndex: isFocusedCatalog ? 9 : '' }"/>

        <HeaderInput v-model:isFocused="isFocusedInput" :style="{ zIndex: isFocusedCatalog ? 1 : '' }"/>

        <div class="header-link-container">
          <div
              v-for="item of menu"
              :key="item.name"
              class="header-link"
              @click="navigateTo(item.url)">
            <div>
              <Icon :iconName="item.icon" />
            </div>
            {{ item.name }}
          </div>

          <div v-if="!user" class="header-link">
            <div>
              <Icon iconName="user" />
            </div>
            Войти
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const user = ref(false)
const isFocusedInput = ref(false)
const isFocusedCatalog = ref(false)


import {Icon} from "#components";

const menu: {name: string, url: string, icon: string}[] = [
  {name: 'Избранное', url: 'wishlist', icon: 'wishlist'},
  {name: 'Корзина', url: 'cart', icon: 'cart'},
]

const toggleFocus = () => {
  console.log('toggleFocus', isFocusedCatalog.value)
  if (isFocusedInput.value || isFocusedCatalog.value) {
    console.log('inner toggle')
    isFocusedInput.value = false
    isFocusedCatalog.value = false
  }
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
  box-shadow: 0 2px 4px -2px base.$dark-gray;
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
  }
}

.focus {
  background-color: rgba(base.$dark-gray, 0.3);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  pointer-events: auto;
}
</style>