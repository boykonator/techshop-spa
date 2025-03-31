<template>
  <div class="wishlist">
    <div class="wishlist-title">Избранное</div>

    <div v-if="showWarning" class="wishlist-warning">
      <span class="wishlist-warning-icon">!</span>
      <p class="wishlist-warning-text">Если вы не авторизуетесь, список будет удален {{ getDateInAWeek() }}. Чтобы сохранить список и иметь к нему доступ с различных устройств, войдите в личный кабинет</p>
      <div class="wishlist-warning-close" @click="showWarning = false">X</div>
    </div>
<!--    !wishlistContent.length-->
    <div class="wishlist-content" v-if="true">
      <div class="wishlist-content-image"></div>
      <div class="wishlist-content-description">В списке пока нет ни одного избранного товара</div>
      <button class="wishlist-content-button">Перейти в каталог</button>
    </div>
  </div>
</template>

<script setup>
import {useCatalogStore} from "~/store/catalog.ts";
const store = useCatalogStore()

const showWarning = ref(false)

const isWarningShown = () => {
  showWarning.value = !!(!Object.keys(store.user).length && wishlistContent.value.length)
}

const wishlistContent = ref([1, 2])

const getDateInAWeek = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)

  return `${day}.${month}.${year}`
}

onMounted(() => {
  isWarningShown()
})
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: base.$secondary-color;
  padding: 0;
  margin: 0;
  border: none;
}

.wishlist {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 48px 0 12px 0;
  }

  &-content {
    background: #fff;
    box-shadow: 0 2px 4px -2px darkgray;
    height: 50vh;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    &-image {
      height: 200px;
      width: 250px;
      background: base.$primary-color;
    }

    &-button {
      color: white;
      background: linear-gradient(0deg, base.$primary-color, base.$primary-color-light);
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid base.$primary-color;
      height: 44px;
      white-space: nowrap;
      font-size: 16px;
    }


  }

  &-warning {
    background-color: rgba(base.$primary-color-light, 0.3);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    position: relative;

    &-icon {
      padding: 4px 12px;
      background: base.$primary-color;
      color: white;
      border-radius: 8px;
    }

    &-text {
      margin: 0 0 0 16px;
      line-height: 24px;
    }

    &-close {
      position: absolute;
      right: 16px;
      top: 12px;
      cursor: pointer;
    }
  }
}
</style>