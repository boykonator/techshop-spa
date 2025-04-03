<template>
  <div class="header-login-modal-container">
    <div class="header-login-modal-head">
      <div class="header-login-modal-head-title">Войти</div>
      <div class="header-login-modal-head-close" @click="userStore.showLoginModal = false">
        <Icon name="cross" size="20" />
      </div>
    </div>

    <form class="header-login-modal-body" @submit.prevent="requestUser">
      <div class="header-login-modal-body-input-container">
        <input
            v-model="login"
            class="header-login-modal-body-input"
            :class="{ invalid: invalidMessage.length }"
            type="text"
            placeholder="Телефон или e-mail"
            id="username"
            name="username"
            autocomplete="username"
            inputmode="email"
            required
        />

        <div class="header-login-modal-body-input-icon"
             @mouseenter="showCaption = true"
             @mouseleave="showCaption = false"
        >
          <Icon name="question-mark" size="20" />
        </div>
        <div v-if="showCaption" class="header-login-modal-body-input-annotation">
          Телефон в формате: 7 000 000 00 00 <br>
          Формат e-mail: name@example.ru
        </div>
      </div>

      <div v-if="loginState === 'password'" class="header-login-modal-body-input-container">
        <input
            v-model="password"
            class="header-login-modal-body-input"
            :class="{ invalid : invalidMessage.length }"
            :type="passwordState ? 'password' : 'text'"
            placeholder="Введите пароль"
            id="password"
            name="password"
            autocomplete="current-password"
            required
        />
        <div class="header-login-modal-body-input-icon" @click="showPassword">
          <Icon v-if="passwordState" name="eye-off" size="20"/>
          <Icon v-else name="eye-show" size="20"/>
        </div>
      </div>

      <div v-if="invalidMessage.length" class="header-login-modal-body-invalid-message">
        {{ invalidMessage }}
      </div>

      <button class="header-login-modal-body-button-active" type="submit">
        {{ loginState === 'code' ? 'Получить код' : 'Войти' }}
      </button>

      <button class="header-login-modal-body-button" type="button" v-if="loginState === 'code'" @click="setModalState('password')">
        Войти с паролем
      </button>
    </form>

    <button class="header-login-modal-body-button" type="button" v-if="loginState === 'password'" @click="setModalState('code')">
      Войти с кодом
    </button>

    <div class="header-login-modal-body-caption">
      Нажимая кнопку «{{ loginState === 'code' ? 'Получить код' : 'Войти' }}», вы соглашаетесь c условиями
      <a href="">политики конфиденциальности</a>.
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { useUserStore } from '~/store/user'
const userStore = useUserStore()

const loginState = ref("code")
const showCaption = ref(false)
const passwordState = ref(true)
const login = ref("")
const password = ref("")
const invalidMessage = ref("")

const regex = /^(7\s\d{3}\s\d{3}\s\d{2}\s\d{2}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

const requestUser = async () => {
  validateData()

  if (!invalidMessage.value.length) {
    try {
      const { data } = await axios.post("/api/users/login", {
        email: login.value, password: password.value,
      })

      console.log('data: ',data)

      if (data.status && data.status !== 200) {
        invalidMessage.value = 'Неверный пароль'

        setTimeout(() => {
          invalidMessage.value = ''
        }, 5000)
      } else {
        userStore.user = data.user
        console.log(userStore.user)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }
}

const validateData = () => {
  if (login.value.length || password.value.length) {
    if (!login.value.length && loginState.value === "code") {
      invalidMessage.value = "Заполните поле"
      return
    }

    if ((!login.value.length || !password.value.length) && loginState.value === "password") {
      invalidMessage.value = "Не все поля заполнены"
      return
    }

    if (!regex.test(login.value)) {
      invalidMessage.value = "Введите корректный логин (e-mail или телефон)"
      return
    }

    if (loginState.value === "password" && password.value.length < 6) {
      invalidMessage.value = "Длина пароля должна быть не менее 6 символов"
      return
    }
  }

  invalidMessage.value = ""
}

const showPassword = () => {
  passwordState.value = !passwordState.value
}

const setModalState = (state: string) => {
  loginState.value = state
}

watch(() => userStore.user, () => {
  userStore.showLoginModal = false
})

watch(loginState, () => {
  showCaption.value = false
  passwordState.value = true
})

watch(() => userStore.showLoginModal, () => {
  loginState.value = "code"
  showCaption.value = false
  passwordState.value = true
})
</script>

<style scoped lang="scss">
.header-login-modal {
  &-container {
    position: absolute;
    top: 212px;
    left: calc(50% - 160px);
    background: white;
    padding: 16px 20px 20px;
    border-radius: 12px;
    width: 320px;
    white-space: normal;
    z-index: 9;
  }

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    &-title {
      font-size: 20px;
      font-weight: bold;
    }

    &-close {
      cursor: pointer;
      color: $dark-gray;
    }
  }

  &-body {
    &-input {
      width: 100%;
      padding: 16px 20px;
      font-size: 16px;
      border-radius: 8px;
      outline: none;
      background-color: $light-gray;
      border: 1px solid $light-gray;
      transition: 0.2s ease-in-out;
      box-sizing: border-box;

      &:hover {
        background-color: $soft-silver;
      }

      &:focus {
        background-color: #ffffff;
        border: 1px solid $soft-silver;
        transition: 0.2s ease-in-out;
        box-shadow: 0 4px 10px $soft-silver;
      }

      &-container {
        position: relative;
        margin-bottom: 12px;
      }

      &-icon {
        position: absolute;
        right: 12px;
        top: 12px;
        padding: 4px 9px;
        cursor: pointer;
        color: $dark-gray;
        user-select: none;
      }

      &-annotation {
        font-weight: normal;
        background: $slate-gray;
        position: absolute;
        right: -100px;
        bottom: -36px;
        padding: 8px;
        border-radius: 8px;
        color: #ffffff;
        z-index: 5;
      }
    }

    &-button {
      background: $light-gray;
      border: none;
      color: $slate-gray;
      width: 100%;
      border-radius: 12px;

      &:hover {
        background: $soft-silver
      }

      &-active {
        border-radius: 12px;
        width: 100%;
        margin-bottom: 12px;
      }
    }

    &-caption {
      margin-top: 16px;
      font-size: 12px;
      color: $dark-gray;
    }

    &-invalid-message {
      color: $invalid;
      background: rgba($invalid, 0.2);
      padding: 16px 20px;
      margin-bottom: 12px;
      border-radius: 8px;
      transition: 0.2s ease-in-out;
    }
  }
}

.invalid {
  border-color: $invalid !important;
}
</style>