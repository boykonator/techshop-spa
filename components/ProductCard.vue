<template>
  <div
      class="catalog-content-card-container"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
  >
    <div class="catalog-content-card">
      <input
          type="checkbox"
          v-if="route.path === '/wishlist'"
          :checked="selected"
          @change="onCheckboxChange($event.target.checked)"
      />
      <img
          class="catalog-content-card-image"
          :src="`/images/${product.url}/1.jpg.webp`"
          :alt="product.title"
      />

      <div class="catalog-content-card-info">
        <div
            @click="navigateTo(`/product/${product.url}`)"
            class="catalog-content-card-product-name"
        >
          {{ product.title }} {{ product.description }}
        </div>

        <div class="catalog-content-card-additional">
          <div class="catalog-content-card-additional-container">
            <div class="catalog-content-card-additional-item">
              <input type="checkbox" /> Сравнить
            </div>
            <div class="catalog-content-card-additional-item">
              <Icon name="star" class="catalog-content-card-reviews-star" />
              <strong>0.00</strong>
              <span class="catalog-content-card-reviews-divider">|</span>{{ product.reviews.length }} отзывов
            </div>
          </div>

          <div>
            <span>В наличии <a href="#">в 5 магазинах</a></span>
            <span> Пункты выдачи <a href="#">доступны</a></span>
          </div>
        </div>
      </div>

      <div class="catalog-content-card-action">
        <div class="catalog-content-card-action-price-container">
          <div class="catalog-content-card-action-price">
            <div class="catalog-content-card-action-price-tag">
              {{ product.price.toLocaleString('ru-RU') }} ₽
            </div>
            <div class="catalog-content-card-action-price-sub">
              от {{ Math.trunc(product.price / 10).toLocaleString('ru-RU') }} ₽ / мес.
            </div>
          </div>
        </div>

        <div class="catalog-content-card-action-buttons">
          <Icon
              name="favorite"
              width="20"
              height="20"
              fill="red"
              class="catalog-content-card-action-favorite"
              :class="{ 'favorite-active': isInWishlist }"
              @mouseenter="favoriteHovered = true"
              @mouseleave="favoriteHovered = false"
              @click="toggleFavorite"
          />

          <div v-if="favoriteHovered" class="catalog-content-card-action-favorite-annotation">
            {{ isInWishlist ? 'Убрать из избранного' : 'Добавить в избранное' }}
          </div>

          <Icon name="trash" v-if="route.path === '/cart'" />

          <button
              v-if="!product.stock"
              :class="isButtonHovered ? 'hovered-button' : 'in-cart'"
              @mouseenter="isButtonHovered = true"
              @mouseleave="isButtonHovered = false"
              disabled
          >
            Нет в наличии
          </button>

          <button
              v-else-if="!isInCart"
              @click="addToCart"
              :class="isHovered && !isSoldOut ? 'hovered-button' : 'catalog-buy-button'"
          >
            Купить
          </button>

          <button
              v-else-if="isInCart"
              @click="navigateTo('/cart')"
              :class="isButtonHovered ? 'hovered-button' : 'in-cart'"
              @mouseenter="isButtonHovered = true"
              @mouseleave="isButtonHovered = false"
          >
            В корзине
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IProduct} from "~/types/catalog"
import { useRoute } from 'vue-router'
import {useProductStore} from "~/stores/product"

const productStore = useProductStore()
const route = useRoute()

const props = defineProps<{
  product: IProduct
  selected?: boolean
}>()

const emit = defineEmits(['update:selected'])

const onCheckboxChange = (value: boolean) => {
  emit('update:selected', value)
}

const isHovered = ref(false)
const isButtonHovered = ref(false)
const favoriteHovered = ref(false)

const onMouseEnter = () => (isHovered.value = true)
const onMouseLeave = () => (isHovered.value = false)

const isSoldOut = computed(() => !props.product.stock)
const isInWishlist = computed(() => productStore.isInWishlist(props.product._id))
const isInCart = computed(() => productStore.isInCart(props.product._id))

const toggleFavorite = () => productStore.updateList('wishlist', !isInWishlist.value, props.product)
const addToCart = () => productStore.updateList('cart', !isInCart.value, props.product)
</script>

<style scoped lang="scss">
.catalog-content {
  &-card {
    min-height: 200px;
    height: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 4px -2px $dark-gray;
    transition: box-shadow 0.3s ease-in-out;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px;
    text-align: center;

    &:hover {
      box-shadow: 0 10px 20px 1px $mid-gray;
    }

    &-container {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-direction: column;
      position: relative;
      width: 100%;
    }

    &-image {
      min-height: 200px;
      max-height: 200px;
      min-width: 190px;
      max-width: 200px;
      margin-right: 12px;
    }

    &-text {
      font-size: 15px;
      font-weight: bold;
      line-height: 26px;
      text-align: center;
      word-wrap: break-word;
    }

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      width: 100%;
    }

    &-product-name {
      font-size: 16px;
      line-height: 22px;
      overflow: hidden;
      text-align: left;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: $secondary-color;
        transition: 0.3s ease-in-out;
      }
    }

    &-action {
      display: grid;
      grid-template-rows: repeat(2, auto);
      grid-auto-flow: column;
      gap: 8px 16px;

      &-price-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      &-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        cursor: pointer;

        &:hover {
          color: rgba($slate-gray, 0.8);
        }

        &-tag {
          font-size: 20px;
          font-weight: bold;
        }

        &-sub {
          font-size: 14px;
        }
      }

      &-buttons {
        display: flex;
        align-items: center;
        position: relative;
      }

      &-favorite {
        color: $dark-gray;
        background-color: $light-gray;
        fill: none;
        min-width: 20px;
        min-height: 20px;
        padding: 12px;
        border-radius: 12px;
        cursor: pointer;
        margin-right: 8px;

        &:hover {
          color: $slate-gray;
          background-color: rgba($soft-silver, 0.6);
        }

        &:active {
          background-color: $soft-silver;
        }

        &-annotation {
          font-size: 14px;
          color: #ffffff;
          background: $slate-gray;
          position: absolute;
          left: -60px;
          bottom: 52px;
          padding: 12px 16px;
          border-radius: 8px;
          white-space: nowrap;
        }
      }
    }

    &-reviews {
      &-star {
        color: $primary-color-light;
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }

      &-divider {
        margin: 0 6px;
      }
    }

    &-additional {
      &-container {
        display: flex;
        gap: 4px;
        margin-bottom: 8px;
        cursor: pointer;
      }

      &-item {
        background: $light-gray;
        font-size: 14px;
        line-height: 18px;
        padding: 6px 8px;
        border-radius: 8px;
        display: flex;
        align-items: center;

        &:hover {
          background: $soft-silver;
        }
      }
    }
  }
}

.hovered-button {
  background: $primary-color-light;
  box-sizing: border-box;
}

.favorite-active {
  color: $secondary-color;
  fill: $secondary-color;

  &:hover {
    color: $secondary-color;
  }
}

.in-cart {
  color: $secondary-color;
  border: 1px solid $secondary-color;
  background: #fff;

  &:hover {
    background: $light-gray;
  }
}

.sold-out {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba($dark-gray, 0.6);
  border-radius: 12px;
  z-index: 2;

  &-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: 100%;
    height: 28px;
    background: rgba($dark-gray, 0.8);
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.sold-out-active {
  pointer-events: none;
  box-shadow: none;
  transition: opacity 0.3s ease;

  &:hover {
    box-shadow: none;
  }
}
</style>