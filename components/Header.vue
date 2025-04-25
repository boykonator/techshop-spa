<template>
  <div>
    <div v-if="isFocusedInput || isFocusedCatalog || state.showLoginModal || state.showAdminModal" class="focus"
         @click.self="toggleFocus"/>

    <nav>
      <div class="header">
        <div style="cursor: pointer" @click="navigateTo('/admin')">admin</div>

        <HeaderCatalog v-model:isFocused="isFocusedCatalog" :style="{ zIndex: isFocusedCatalog ? 9 : 1 }"/>
        <HeaderInput v-model:isFocused="isFocusedInput" :style="{ zIndex: isFocusedInput ? 9 : 1 }"/>
        <HeaderLoginModal v-show="state.showLoginModal"/>

        <div class="header-link-container">
          <div
              v-for="item of menu"
              :key="item.name"
              class="header-link"
              @click="navigateTo(`/${item.url}`)"
          >
            <div class="header-link-inner">
              <div class="header-link-icon">
                <Icon :name="item.icon" class="header-link-icon-color" />
              </div>
              <span
                  :class="[
                    'header-link-text',
                    item.url === 'cart' && item.name !== 'Корзина' ? 'header-link-text-bold' : ''
                  ]"
              >
                {{ item.name }}
              </span>
            </div>

            <span
                v-if="item.url === 'cart'"
                class="header-link-cart-count"
            >{{ store.user?.cart.length }}</span>
          </div>

          <div
              v-if="!store.user?._id"
              class="header-link"
              @mouseenter="showHeaderLogin = true"
              @mouseleave="showHeaderLogin = false"
          >
            <div class="header-link-inner">
              <div class="header-link-icon">
                <Icon name="user" />
              </div>
              <span class="header-link-text">Войти</span>
            </div>
            <HeaderLogin v-show="showHeaderLogin" />
          </div>

          <div
              v-else
              class="header-link"
              @click="navigateTo('/profile')"
          >
            <div class="header-link-inner">
              <div class="header-link-icon">
                <Icon name="user" />
              </div>
              <span class="header-link-text">Профиль</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/user";
import {useStateStore} from "~/stores/state";
import axios from "axios";

const store = useUserStore()
const state = useStateStore()

const showHeaderLogin = ref(false)
const isFocusedInput = ref(false)
const isFocusedCatalog = ref(false)

const cartName = ref('Корзина')

const fetchCartProducts = async () => {
  if (!store.user?.cart.length) return

  try {
    const ids = store.user.cart.join(',')
    const { data } = await axios.get('/api/products', {
      params: { ids }
    })

    cartName.value = '$' + data.reduce((acc, cur) => acc + cur.price, 0).toLocaleString('ru-RU')
  } catch (error) {
    console.error('Failed to load cart products:', error)
  }
}

const menu: { name: string, url: string, icon: string }[] = computed(() => {
  return [
    {name: 'Избранное', url: 'wishlist', icon: 'favorite'},
    {name: cartName.value, url: 'cart', icon: 'cart'},
  ]
})

const toggleFocus = () => {
  if (isFocusedInput.value) isFocusedInput.value = false;
  if (isFocusedCatalog.value) isFocusedCatalog.value = false;
  if (state.showLoginModal) state.showLoginModal = false;
  if (state.showAdminModal) state.showAdminModal = false;
}

watchEffect(() => {
  if (store.user) {
    fetchCartProducts()
  }
})
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
    position: relative;

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

    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 48px;
    }

    &-icon-color {
      color: $dark-gray;
      fill: none;
    }

    &-cart-count {
      position: absolute;
      top: 8px;
      right: 20px;
      border: 2px solid #fff;
      border-radius: 100px;
      background: $secondary-color;
      color: #ffffff;
      padding: 0 4px;
      font-size: 12px;
    }

    &-text {
      margin-top: 4px;
      line-height: 1;
      white-space: nowrap;

      &-bold {
        font-weight: bold;
      }
    }

    &-icon {
      color: $dark-gray;
      fill: none;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 24px;
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