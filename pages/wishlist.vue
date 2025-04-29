<template>
  <div class="wishlist">
    <div class="wishlist-title">Избранное</div>

    <div v-if="isWarningVisible" class="wishlist-warning">
      <span class="wishlist-warning-icon">
        <Icon name="exclamation-mark" />
      </span>
      <p class="wishlist-warning-text">
        Если вы не авторизуетесь, список будет удален {{ getDateInAWeek }}.
        Чтобы сохранить список и иметь к нему доступ с различных устройств, войдите в
        <a href="" @click.prevent="state.toggleLoginModal">личный кабинет</a>
      </p>
      <div class="wishlist-warning-close" @click="dismissedWarning = true">
        <Icon name="cross" size="24"/>
      </div>
    </div>

    <div class="wishlist-content-empty" v-if="!userStore.user?.wishlist?.length && !userStore.tempWishlist?.length">
      <div class="wishlist-content-image"></div>
      <div class="wishlist-content-description">В списке пока нет ни одного избранного товара</div>
      <button class="wishlist-content-button" @click="navigateTo('/catalog')">Перейти в каталог</button>
    </div>

    <div v-else class="wishlist-content">
      <div class="wishlist-content-info">
        <div class="wishlist-content-info-heading">
          {{ products?.length }} {{ productsWordEnding }} на сумму: ${{ wishlistSum }}
        </div>

        <div class="wishlist-content-info-content">
          <div class="wishlist-content-info-select-all" @click="selectAllHandler">
            <input type="checkbox" :checked="isSelectAll">
            <span>Выбрать все</span>
          </div>
          <button @click="productStore.updateList('cart', true)">Купить</button>
        </div>
      </div>
      <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product"
          v-model:selected="selectedProducts[product._id]"
          class="wishlist-content-product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {useUserStore} from '~/stores/user'
import {useStateStore} from "~/stores/state"
import {useProductStore} from "~/stores/product"

const productStore = useProductStore()
const state = useStateStore()
const userStore = useUserStore()

const products = ref([])
const selectedProducts = reactive({})

const isSelectAll = computed(() => {
  return products.value.length && products.value.every(product => selectedProducts[product._id])
})

const selectAllHandler = (event) => {
  const checked = event?.target?.checked ?? !isSelectAll.value
  products.value.forEach(product => {
    selectedProducts[product._id] = checked
  })
}

const wishlistSum = computed(() => {
  return products.value.reduce((acc, cur) => acc + cur.price, 0).toLocaleString('ru-RU');
})

const productsWordEnding = computed(() => {
  return products.value?.length === 1 ? 'товар' : products.value?.length > 1 && products.value?.length < 5 ? 'товара' : 'товаров'
})

const fetchProducts = async () => {
  try {
    const ids = userStore.user?.wishlist.length ? userStore.user?.wishlist.map(item => item).join(',') : userStore.tempWishlist.map(item => item).join(',')
    const {data} = await axios.get('/api/products', {
      params: {
        ids
      }
    })
    products.value = data
  } catch (error) {
    console.error('Failed to load wishlist products:', error)
  }
}

const dismissedWarning = ref(false)

const isWarningVisible = computed(() => {
  return !dismissedWarning.value && !userStore.user
})

const getDateInAWeek = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)

  return `${day}.${month}.${year}`
})

onMounted(fetchProducts)

watch(() => [userStore.isAuthenticated, userStore.user], () => {
  fetchProducts()
})
</script>

<style scoped lang="scss">
.wishlist {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 12px 0;
  }

  &-content {
    height: 100%;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    &-empty {
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
    }

    &-info {
      background: #fff;
      box-shadow: 0 2px 4px -2px $dark-gray;
      height: 100%;
      width: 100%;
      padding: 16px;
      margin: 5px 0 25px;
      border-radius: 8px;
      position: relative;
      box-sizing: border-box;

      &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
      }

      &-heading {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 16px;
      }

      &-select-all {
        padding: 10px;
        border: 1px solid $mid-gray;
        border-radius: 8px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background: $light-gray;
        }
      }
    }

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