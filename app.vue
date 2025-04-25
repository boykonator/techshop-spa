<template>
  <div class="app">
    <Header />
    <NuxtPage class="container" />
  </div>
</template>

<script setup>
import { useCatalogStore } from "~/stores/catalog"
const store = useCatalogStore()

onMounted(async () => {
  await store.fetchCatalog()
})
</script>

<style lang="scss">
a {
  text-decoration: none;
  padding: 0;
  margin: 0;
  border: none;
  color: $primary-color;

  &:hover {
    color: $secondary-color
  }
}

.label {
  margin: 6px 0 4px 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.4;
}

.modal-heading {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}

.app {
  color: $slate-gray;
  font-family: 'Roboto', Roboto, sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.container {
  padding: 24px 144px;
  background-color: $light-gray;
  min-height: 70vh;
  display: flex;
  flex-direction: column;

  @media(max-width: 1440px) {
    padding: 24px 72px;
  }

  @media(max-width: 1280px) {
    padding: 24px 36px;
  }
}

button {
  color: white;
  background: linear-gradient(0deg, $primary-color, $primary-color-light);
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid $primary-color;
  height: 44px;
  white-space: nowrap;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: $primary-color-light;
  }

  &:hover:active {
    box-shadow: 0 0 0 2px rgba($primary-color-light, 0.3);
    background: linear-gradient(0deg, $primary-color, $primary-color-light);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.edit {
  &-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 360px;
    max-width: 600px;
    z-index: 5;

    &-close {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 8px;
    }

    &-content {
      display: flex;
      flex-direction: column;
    }
  }
}

.add-page {
  &-modal {
    position: absolute;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 300px;
    z-index: 5;

    &-close {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 8px;
    }

    &-content {
      display: flex;
      flex-direction: column;
    }
  }
}

.buttons-container {
  display: flex;
  gap: 8px;
}

.error {
  margin-top: 4px;
  color: $invalid
}

.success {
  margin-top: 4px;
  color: $success
}

.submit {
  margin-top: 12px;
}
</style>
