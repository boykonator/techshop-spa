<template>
  <div class="header-catalog">
    <div
        class="header-catalog-logo"
        @click="navigateTo('/')"
        @mouseenter="isLinkHovered = true"
        @mouseleave="isLinkHovered = false"
    >
      LOGO
      <div v-if="isLinkHovered && route.path !== '/'" class="header-catalog-logo-annotation">
        Вернуться на главную
      </div>
    </div>

    <div class="header-catalog-content" @click="toggleCatalog">
      <span class="header-catalog-content-title">Каталог</span>
      <Icon name="arrow-down" />
    </div>

    <div v-if="isCatalogOpened" class="header-catalog-wrapper">
      <div class="header-catalog-menu">
        <div class="header-catalog-menu-link"
             @mouseenter="activeTabIndex = index"
             :class="{ active: activeTabIndex === index }"
             @click="setActiveTab(item.url)"
             v-for="(item, index) of store.catalog"
             :key="item.title"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>

      <div v-if="activeCategory" class="header-catalog-submenu-wrapper">
        <div class="header-catalog-submenu"
             v-for="(category, index) of activeCategory"
             :key="index"
        >
          <div class="header-catalog-submenu-link-title" @click="navigateTo(category.url)">
            {{ category.title }}
          </div>

          <div
              v-for="item of category.subcategories"
              @click="navigateTo(item.url)"
              class="header-catalog-submenu-link"
          >
            {{ item.title }}
            <span class="header-catalog-submenu-link-caption">
              {{ Math.trunc((Math.random() * 100) + 1) }}
              <Icon name="arrow-right" size="16" style="transform: rotate(-90deg)" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

import { useCatalogStore } from "~/store/catalog.ts"
const store = useCatalogStore()

const isLinkHovered = ref(false)
const activeTabIndex = ref(0)
const activeTab = ref(store.activeTab)

const props = defineProps({
  isFocused: Boolean,
})

const isCatalogOpened = ref(props.isFocused)
const emit = defineEmits(["update:isFocused"])

const toggleCatalog = () => {
  isCatalogOpened.value = !isCatalogOpened.value
  emit("update:isFocused", isCatalogOpened.value)
}

watch(() => props.isFocused, () => {
  isCatalogOpened.value = props.isFocused
})

watch(activeTabIndex, () => {
  if (store.catalog[activeTabIndex.value]) {
    setActiveTab(store.catalog[activeTabIndex.value].url)
  }
})

const setActiveTab = (tabUrl) => {
  store.activeTab = tabUrl
  activeTab.value = tabUrl
}

const activeCategory = computed(() => {
  return store.categories[activeTab.value]
})
</script>

<style scoped lang="scss">
.header-catalog {
  background: linear-gradient(0deg, $primary-color, $primary-color-light);
  color: white;
  width: 260px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;

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
      background: $slate-gray;
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
    display: flex;
    align-items: center;

    cursor: pointer;

    &:hover {
      background-color: rgba(#fff, 0.3);
      box-shadow: 0 6px 8px #2d2074;
    }

    &-title {
      margin-right: 8px;
    }
  }

  &-wrapper {
    display: grid;
    background: #fff;
    color: $slate-gray;
    position: absolute;
    top: 64px;
    border-radius: 12px;
    font-size: 16px;
    grid-template-columns: repeat(4, 1fr);
  }

  &-menu {
    padding: 24px 8px 24px 0;

    &-link {
      cursor: pointer;
      padding: 8px 12px;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  &-submenu {
    position: relative;
    background: #ffffff;
    border-radius: 12px;

    &-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 24px;
      padding: 24px;
    }

    &-link {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
      display: flex;
      cursor: pointer;

      &:hover {
        color: $secondary-color;
      }

      &-title {
        font-weight: bold;
        margin-bottom: 12px;
        padding-top: 8px;
        transition: 0.3s ease-in-out;
        grid-column: span 4;
        cursor: pointer;

        &:hover {
          color: $secondary-color;
          transition: 0.3s ease-in-out;
        }
      }

      &-caption {
        margin-left: 4px;
        color: $dark-gray;
        display: flex;
        align-items: center;
      }
    }
  }
}

.active {
  color: $primary-color-light;
  border-left: solid 2px $primary-color-light;
}
</style>