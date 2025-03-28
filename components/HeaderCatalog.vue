<template>
  <div class="header-catalog">
    <div
        class="header-catalog-logo"
        @click="navigateTo('/')"
        @mouseenter="isLinkHovered = true"
        @mouseleave="isLinkHovered = false"
    >
      LOGO
      <div
          v-if="isLinkHovered && route.path !== '/'"
          class="header-catalog-logo-annotation"
      >
        Вернуться на главную
      </div>
    </div>
    <div
        class="header-catalog-content"
        @click="toggleCatalog"
    >
      <span class="header-catalog-content-title">Каталог</span>
      <span>V</span>
    </div>

    <div
        v-if="props.isFocused"
        class="header-catalog-menu"
    >
      <div
          v-for="(item, index) of store.catalog"
          :key="item.title"
          class="header-catalog-menu-link"
          @mouseenter="activeTabIndex = index"
          :class="{ active : activeTabIndex === index }"
          @click="navigateTo(!route.path.includes('catalog') ? `catalog/${item.url}` : item.url )"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();

import {useCatalogStore} from "~/store/catalog.ts";
const store = useCatalogStore()

const isLinkHovered = ref(false);
const activeTabIndex = ref(0)

const props = defineProps({
  isFocused: Boolean,
})

const isCatalogOpened = ref(props.isFocused)

const emit = defineEmits(["update:isFocused"]);

const toggleCatalog = () => {
  isCatalogOpened.value = !isCatalogOpened.value
  emit("update:isFocused", isCatalogOpened.value);
}

watch(() => props.isFocused, () => {
  isCatalogOpened.value = props.isFocused;
})
</script>

<style scoped lang="scss">
.header-catalog {
  background: linear-gradient(0deg, base.$primary-color, base.$primary-color-light);
  color: white;
  width: 260px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  cursor: pointer;

  &-logo {
    font-weight: bold;
    font-size: 20px;
    padding: 0 20px;
    height: 64px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: rgba(#fff, 0.1);
    }

    &-annotation {
      font-weight: normal;
      font-size: 14px;
      background: base.$slate-gray;
      position: absolute;
      left: 0;
      bottom: -36px;
      padding: 8px;
      border-radius: 8px;
    }
  }

  &-content {
    padding: 10px 16px 10px 20px;
    margin-right: 12px;
    font-weight: bold;
    background-color: rgba(#fff, 0.1);
    border-radius: 8px;
    box-shadow: 0 6px 8px #59100014;
    font-size: 16px;

    &:hover {
      background-color: rgba(#fff, 0.3);
      box-shadow: 0 6px 8px #2d2074;
    }

    &-title {
      margin-right: 8px;
    }
  }

  &-menu {
    background: #fff;
    color: base.$slate-gray;
    position: absolute;
    top: 64px;
    border-radius: 12px;
    padding: 24px 8px 24px 0;
    font-size: 16px;
    width: 100%;

    &-link {
      cursor: pointer;
      padding: 8px 12px;
      font-weight: 500;
      //margin: 0 0 24px -2px;
    }
  }
}

.active {
  color: base.$primary-color-light;
  border-left: solid 2px base.$primary-color-light;
}
</style>