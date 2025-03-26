<template>
  <nav>
    <div class="header">
      <HeaderCatalog />
      <div
          class="header-input-container"
          @mouseover="isHovered = true"
          @mouseout="isHovered = false"
      >
        <input
            v-model="input"
            type="text"
            placeholder="Поиск по сайту"
            class="header-input"
            :class="{ 'header-input-hover': isHovered }"
        >
        <div class="header-input-icons">
          <span class="header-input-icon" v-if="input.length" @click="input = ''">X</span>
          <span class="header-input-icon-divider" v-if="input.length" ></span>
          <span class="header-input-icon">Q</span>
        </div>
      </div>
      <div class="header-link-container">
        <div
            v-for="item of menu"
            :key="item.name"
            class="header-link"
            @click="navigateTo(item.url)">
          <div>
            icon
          </div>
          {{ item.name }}
        </div>

        <div v-if="!user" class="header-link">
          <div>
            icon
          </div>
          Войти
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
const user = ref(false)
const input = ref('')
const isHovered = ref(false)

const menu: {name: string, url: string}[] = [
  {name: 'Избранное', url: 'wishlist'},
  {name: 'Корзина', url: 'cart'},
]
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 2px 4px -2px $dark-gray;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  width: 100%;
  padding: 20px 28px;
  position: relative;
  font-size: 14px;

  &-link {
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 12px;

    &-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      height: 100%;
    }
  }

  &-input {
    width: 60vh;
    height: 100%;
    padding: 0 120px 0 28px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: $light-gray;
    transition: 0.2s ease-in-out;

    &-hover {
      background-color: #fff;
      border-color: $light-gray;
      box-shadow: 0 20px 40px 1px $mid-gray;
      transition: 0.2s ease-in-out;
    }

    &-icons {
      position: absolute;
      top: 24px;
      right: 24px;
      gap: 4px;
      color: $dark-gray;
    }

    &-container {
      position: relative;
      height: 100%;
    }

    &-icon {
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      margin: 4px;

      &:hover {
        background-color: $light-gray;
      }

      &-divider {
        padding: 6px 0;
        border: 0.75px solid $mid-gray;
      }
    }

  }
}
</style>