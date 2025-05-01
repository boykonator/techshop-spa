<template>
  <div class="cart">
    <div class="cart-title">
      Корзина
      <span class="cart-products-count" v-if="products.length"> {{products.length}} {{ productsWordEnding }}</span>
    </div>

    <div class="cart-content-empty" v-if="!products.length">
      <div class="cart-content-image">

      </div>
      <h1>Пока пусто</h1>
      <span class="cart-content-text">Воспользуйтесь <a href="catalog">каталогом</a> или поиском</span>
      <span class="cart-content-text">Если у вас были товары в корзине – <a href="">войдите</a> в профиль</span>
    </div>

    <div class="cart-content-grid" v-if="products.length">
      <div class="cart-content">
        <div class="cart-content-select">
          <div class="cart-content-selector">
            <input type="checkbox">Выбрать все
          </div>
          <div class="cart-content-delete-selected">Удалить выбранные</div>
        </div>

        <div class="cart-content-items">
          <CartProductCard :product="product" v-for="product of products" />
        </div>
      </div>

      <div class="cart-content-checkout">
        <div class="cart-content-title">Условия заказа</div>

        <div class="cart-content-tabs-wrapper">
          <div class="cart-content-tab" :class="{'active-tab' : true}">Выгода до 8 000 ₽</div>
          <div class="cart-content-tab">Рассрочка 0-0-24</div>
        </div>

        <div class="cart-content-bonus">
          Выгода 33 000 ₽
          <div class="annotation">по акции</div>
        </div>

        <div class="cart-content-amount-container">
          <div class="cart-content-amount">Скрыть витринные образцы  <Icon name="exclamation-mark" height="16" width="16"  class="cart-content-amount-icon" /></div>
          <div class="cart-content-amount-annotation">условия получения заказа могут измениться</div>
        </div>

        <div class="cart-content-order">
          <div>
            <div class="annotation">Итого:</div>
            <div class="cart-content-order-title">1 товар</div>
          </div>

          <div class="cart-content-price-container">
            <div class="cart-content-price-old">164 999 ₽</div>
            <div class="cart-content-order-title">{{ state.cartTotalPrice?.toLocaleString('ru-RU') }} ₽</div>
          </div>
        </div>

        <div class="cart-content-purchase-button-container">
          <button class="cart-content-purchase-button" @click="proceedToCheckout">Перейти к оформлению</button>
        </div>

        <div class="cart-content-delivery">
          <div class="cart-content-delivery-section">В наличии: <a href="">в 227 магазинах</a></div>
          <div class="cart-content-delivery-section">Доставим на дом: <a href="">Сегодня</a></div>
          <div class="cart-content-delivery-section">Пункты выдачи:<a href="">доступны</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {useUserStore} from '~/stores/user'
import { useStateStore } from '~/stores/state'

const state = useStateStore()
const userStore = useUserStore()
const products = ref([])

const productsWordEnding = computed(() => {
  return products.value?.length === 1 ? 'товар' : products.value?.length > 1 && products.value?.length < 5 ? 'товара' : 'товаров'
})

const fetchProducts = async () => {
  if (!userStore.user) {
    products.value = []
    return
  }

  const idsArray = userStore.user.cart.map(item => item.productId)
  if (!idsArray?.length) {
    products.value = []
    return
  }

  try {
    const ids = idsArray.join(',')
    const { data } = await axios.get('/api/products', {
      params: { ids }
    })

    products.value = data
  } catch (error) {
    console.error('Failed to load cart products:', error)
    products.value = []
  }
}

const proceedToCheckout = async () => {
  await userStore.syncCartWithServer()
}

onBeforeUnmount(() => {
  userStore.syncCartWithServer()
})

onMounted(fetchProducts)

watch(() => [userStore.isAuthenticated, userStore.user?.wishlist, userStore.user?.cart], () => {
  fetchProducts()
})
</script>

<style scoped lang="scss">
.cart {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 12px 0 12px 0;
  }

  &-products-count {
    font-size: 16px;
    line-height: 34px;
    color: $dark-gray;
    font-weight: lighter;
  }

  &-content {
    &-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-selector {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &-delete-selected {
      color: $dark-gray;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      &:hover {
        color: $secondary-color;
        transition: 0.2s ease-in-out;
      }
    }

    &-select {
      background: #fff;
      box-shadow: 0 2px 4px -2px $dark-gray;
      height: auto;
      width: auto;
      font-size: 16px;
      line-height: 16px;
      border-radius: 8px;
      position: relative;
      margin: 0 0 16px;
      padding: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 20px;
      padding: 24px 16px 16px;
      overflow: hidden;
    }

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

    &-checkout {
      background: #fff;
      box-shadow: 0 2px 4px -2px $dark-gray;
      height: auto;
      width: auto;
      font-size: 14px;
      border-radius: 8px;
      position: relative;
    }

    &-image {
      height: 200px;
      width: 250px;
      background: $primary-color;
    }

    &-text {
      font-size: 16px;
      line-height: 26px;
    }

    &-grid {
      display: grid;
      position: relative;
      grid-template-columns: 3fr 1fr;
      gap: 20px;
    }

    &-tab {
      margin: 8px;
      padding: 8px 12px;
      cursor: pointer;
      white-space: nowrap;
      line-height: 20px;
      font-size: 16px;
      background: $light-gray;
      border-radius: 8px;
    }

    &-tabs-wrapper {
      display: flex;
      flex-direction: row;
      padding: 10px;
    }

    &-bonus {
      font-size: 16px;
      line-height: 20px;
      padding: 6px 16px 16px;
    }

    &-amount {
      white-space: nowrap;
      font-size: 16px;
      line-height: 20px;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;

      &-container {
        padding: 16px;
        background: $light-gray;
        border: 1px solid $soft-silver;
        border-left: none;
        border-right: none;
      }

      &-annotation {
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
      }

      &-icon {
        color: $dark-gray;
        cursor: pointer;
      }
    }

    &-order {
      padding: 16px 16px 20px;
      display: flex;
      justify-content: space-between;

      &-title {
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
        overflow: hidden;
      }
    }

    &-price {
      &-old {
        text-decoration: line-through;
        color: $dark-gray;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
      }

      &-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }

    &-purchase-button {
      width: 100%;
      white-space: nowrap;
      height: 64px;
      font-size: 16px;
      font-weight: 700;

      &-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 16px 16px;
      }
    }

    &-delivery {
      padding: 4px 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;

      &-section {
        background: $light-gray;
        border-radius: 8px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 100px;
      }
    }
  }
}

.active-tab {
  background: #fff;
  box-shadow: 0 0 10px $mid-gray;
  border-radius: 8px;
  font-weight: 700;
}

.annotation {
  color: $dark-gray;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}
</style>