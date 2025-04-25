<template>
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
        @focus="toggleInput(true)"
        @blur="toggleInput(false)"
        tabindex="-1"
    >
    <div class="header-input-icons">
      <span class="header-input-icon"
            v-if="input.length && isFocused"
            @mousedown.prevent
            @click="input = ''; toggleInput(true)"
      >
        <Icon name="cross" size="28"/>
      </span>

      <span class="header-input-icon-divider" v-if="input.length && isFocused"/>

      <span class="header-input-icon" @click="toggleInput(true)">
        <Icon name="search" size="28"/>
      </span>
    </div>
  </div>
</template>

<script setup>
const input = ref('')
const isHovered = ref(false)
const isFocused = ref(false)

const emit = defineEmits(['update:isFocused'])

const toggleInput = (value) => {
  isFocused.value = value
  emit('update:isFocused', value)
}
</script>

<style scoped lang="scss">
.header-input {
  width: 38vw;
  height: 100%;
  padding: 0 120px 0 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: $light-gray;
  transition: 0.2s ease-in-out;
  z-index: 3;

  @media(max-width: 1200px) {
    width: 25vw;
  }

  @media(max-width: 800px) {
    width: 15vw;
  }

  &:focus {
    background-color: #fff;
    border-color: $light-gray;
    transition: 0.2s ease-in-out;
  }

  &:hover:not(:focus) {
    background-color: #fff;
    border-color: $light-gray;
    box-shadow: 0 20px 40px 1px $mid-gray;
    transition: 0.2s ease-in-out;
  }

  &-container {
    position: relative;
    height: 100%;
    z-index: 4;
    padding: 0 18px;

    @media(max-width: 800px) {
      padding: 0 8px;
    }

    @media(max-width: 600px) {
      display: none;
    }
  }

  &-icons {
    position: absolute;
    top: 10px;
    right: 24px;
    gap: 2px;
    color: $dark-gray;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;

    @media(max-width: 1200px) {
      right: 22px;
    }
  }

  &-icon {
    padding: 6px 8px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 4px;
    z-index: 6;

    &:hover {
      background-color: rgba($mid-gray, 0.2);
    }

    &-divider {
      padding: 10px 0;
      border: 0.75px solid $mid-gray;
    }
  }
}
</style>