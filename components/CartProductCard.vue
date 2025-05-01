<template>
  <div class="cart-product">
    <div class="cart-product-container">
      <input type="checkbox" class="cart-product-input" />

      <img
          class="cart-product-image"
          :src="`/images/${product.url}/1.jpg.webp`"
          :alt="product.title"
      />

      <div class="cart-product-content">
        <div class="cart-product-content-title">
          {{ product.title }} {{ product.description }}
        </div>

        <div class="cart-product-count">
          <button
              class="cart-product-count-button"
              @click="counter('-')"
              :disabled="count === 1"
          >
            —
          </button>
          <input
              class="cart-product-count-input"
              type="number"
              v-model="count"
              min="1"
              :max="product.stock"
          />
          <button
              class="cart-product-count-button"
              @click="counter('+')"
              :disabled="count === product.stock"
          >
            +
          </button>
        </div>

        <div>В магазинах: <a href="">Завтра (c 09:00)</a></div>
      </div>

      <div class="cart-product-actions">
        <div class="cart-product-actions-icons-container">
          <Icon
              name="favorite"
              height="18"
              width="18"
              class="cart-product-actions-icon favorite"
              :class="{ 'favorite-active': isInWishlist }"
              @click="toggleFavorite"
          />

          <Icon
              name="trash"
              height="18"
              width="18"
              class="cart-product-actions-icon trash"
              @click="state.openModal('delete', product._id)"
          />

          <DeleteModal
              v-if="state.showAdminModal && state.deleteIndex === product._id"
              :entity="product"
          />
        </div>

        <div class="cart-product-price-section">
          <div class="cart-product-price-container">
            <span class="cart-product-price-section-old-price">
              {{ ((product.price + discount) * count).toLocaleString('ru-RU') }} ₽
            </span>
            <span class="cart-product-price-section-actual-price">
              {{ (product.price * count).toLocaleString('ru-RU') }} ₽
            </span>
          </div>
          <div class="cart-product-price-section-discount">
            выгода {{ (discount * count).toLocaleString('ru-RU') }} ₽
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/product";
import { useStateStore } from "~/stores/state";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore()
const state = useStateStore()
const productStore = useProductStore()

const props = defineProps({
  product: Object,
})

const product = computed(() => props.product)
const discount = Math.random() * 10000;

const cartItem = computed(() => userStore.user?.cart?.find((item) => item.productId === product.value._id))

const count = computed({
  get() {
    return cartItem.value?.quantity || 1;
  },
  set(newVal) {
    if (cartItem.value) {
      const diff = newVal - cartItem.value.quantity
      cartItem.value.quantity = newVal
      state.cartTotalPrice += diff * product.value.price
    }
  }
})

const counter = (action: '+' | '-') => {
  if (action === '+' && count.value < product.value.stock) {
    count.value++;
  }
  if (action === '-' && count.value > 1) {
    count.value--;
  }
};

const isInWishlist = computed(() =>
    productStore.isInWishlist(product.value._id)
)

const toggleFavorite = () => productStore.updateList("wishlist", !isInWishlist.value, product.value)
</script>

<style scoped lang="scss">
.cart-product {
  background: #fff;
  box-shadow: 0 2px 4px -2px $dark-gray;
  border-radius: 8px;
  padding: 24px;
  font-size: 14px;
  position: relative;

  &-container {
    display: grid;
    grid-template-columns: auto minmax(0%, 1fr) auto;
    gap: 16px;
    align-items: center;
  }

  &-input {
    position: absolute;
    top: 12px;
    left: 8px;
  }

  &-image {
    height: 110px;
    width: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;

    &-title {
      transition: 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        color: $secondary-color;
        transition: 0.2s ease-in-out;
      }
    }
  }

  &-count {
    display: flex;
    align-items: center;
    border: 1px solid $dark-gray;
    border-radius: 8px;
    width: 100px;
    height: 32px;

    &-button {
      all: unset;
      color: #afafaf;
      font-size: 18px;
      font-weight: 400;
      height: 100%;
      width: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      cursor: pointer;
      border: none;

      &:hover {
        background: $light-gray;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &:focus,
      &:active {
        outline: none;
        box-shadow: none;
      }
    }

    &-input {
      all: unset;
      text-align: center;
      width: 30px;
      font-size: 14px;
    }
  }

  &-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    height: 100%;

    &-icon {
      padding: 7px;
      fill: none;
      color: $dark-gray;
      cursor: pointer;
      border-radius: 8px;
    }

    &-icon.favorite-active {
      fill: $secondary-color;
      color: $secondary-color;
    }

    &-icon.favorite:hover {
      background: rgba($secondary-color, 0.1);
      color: $secondary-color;
    }

    &-icon.trash:hover {
      background: $light-gray;
    }
  }

  &-price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &-old-price {
      text-decoration: line-through;
      color: $dark-gray;
      font-size: 12px;
    }

    &-actual-price {
      font-size: 16px;
      font-weight: bold;
      margin-left: 4px;
    }

    &-discount {
      color: $secondary-color;
      font-size: 12px;
    }
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.favorite-active {
  color: $secondary-color;
  fill: $secondary-color;

  &:hover {
    color: $secondary-color;
  }
}
</style>
