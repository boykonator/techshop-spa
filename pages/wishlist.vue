<template>
  <div class="wishlist">
    <div class="wishlist-title">Избранное</div>

    <div v-if="showWarning" class="wishlist-warning" >
      <span class="wishlist-warning-icon">
        <Icon name="exclamation-mark" />
      </span>
      <p class="wishlist-warning-text">
        Если вы не авторизуетесь, список будет удален {{ getDateInAWeek() }}.
        Чтобы сохранить список и иметь к нему доступ с различных устройств, войдите в
        <a href="" @click.prevent="toggleLoginModal">личный кабинет</a>
      </p>
      <div class="wishlist-warning-close" @click="showWarning = false">
        <Icon name="cross" size="24" />
      </div>
    </div>
    <!--    !wishlistContent.length-->
    <div class="wishlist-content" v-if="true">
      <div class="wishlist-content-image"></div>
      <div class="wishlist-content-description">В списке пока нет ни одного избранного товара</div>
      <button class="wishlist-content-button" @click="navigateTo('/catalog')">Перейти в каталог</button>
    </div>
    <div v-else>
      <div class="wishlist-content-image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const store = useUserStore();

const showWarning = ref(false)

const isWarningShown = () => {
  showWarning.value = !!(!store.user && wishlistContent.value.length)
}

const wishlistContent = ref([{}])

const toggleLoginModal = () => {
  store.showLoginModal = !store.showLoginModal
}

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

watch(() => store.user, () => {
  isWarningShown()
}, )
</script>

<style scoped lang="scss">
.wishlist {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 12px 0;
  }

  &-content {
    background: #fff;
    box-shadow: 0 2px 4px -2px $dark-gray;
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
      background: $primary-color;
    }

    &-description {
      margin: 8px 0 12px 0;
    }
  }

  &-warning {
    background-color: rgba($primary-color-light, 0.3);
    border-radius: 8px;
    padding: 20px 36px 20px 20px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    position: relative;

    &-icon {
      padding: 8px;
      background: $primary-color;
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
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