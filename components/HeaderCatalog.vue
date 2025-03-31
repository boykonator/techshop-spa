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


    <div v-if="isCatalogOpened" class="header-catalog-wrapper">
      <div class="header-catalog-menu">
        <div class="header-catalog-menu-link"
             @mouseenter="activeTabIndex = index"
             :class="{ active : activeTabIndex === index }"
             @click="navigateTo(`/catalog/${item.url}`)"
             v-for="(item, index) of store.catalog"
             :key="item.title"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>

      <div class="header-catalog-submenu-wrapper">
        <div class="header-catalog-submenu" v-if="store.activeTab">
          <div
              v-for="(item, index) of store[activeTab]"
              :key="item.url"
              @click="navigateTo(item.url)"
              :class="index === 0 ? 'header-catalog-submenu-link-title' : 'header-catalog-submenu-link'"
          >
            {{ item.title }}
            <span v-if="index !== 0" class="header-catalog-submenu-link-caption">{{
                Math.trunc((Math.random() * 100) + 1)
              }}</span>
          </div>
        </div>
        <div class="header-catalog-submenu" v-if="store.activeTab">
          <div
              v-for="(item, index) of store[activeTab]"
              :key="item.url"
              @click="navigateTo(item.url)"
              :class="index === 0 ? 'header-catalog-submenu-link-title' : 'header-catalog-submenu-link'"
          >
            {{ item.title }}
            <span v-if="index !== 0" class="header-catalog-submenu-link-caption">{{
                Math.trunc((Math.random() * 100) + 1)
              }}</span>
          </div>
        </div>
        <div class="header-catalog-submenu" v-if="store.activeTab">
          <div
              v-for="(item, index) of store[activeTab]"
              :key="item.url"
              @click="navigateTo(item.url)"
              :class="index === 0 ? 'header-catalog-submenu-link-title' : 'header-catalog-submenu-link'"
          >
            {{ item.title }}
            <span v-if="index !== 0" class="header-catalog-submenu-link-caption">{{
                Math.trunc((Math.random() * 100) + 1)
              }}</span>
          </div>
        </div>
        <div class="header-catalog-submenu" v-if="store.activeTab">
          <div
              v-for="(item, index) of store[activeTab]"
              :key="item.url"
              @click="navigateTo(item.url)"
              :class="index === 0 ? 'header-catalog-submenu-link-title' : 'header-catalog-submenu-link'"
          >
            {{ item.title }}
            <span v-if="index !== 0" class="header-catalog-submenu-link-caption">{{
                Math.trunc((Math.random() * 100) + 1)
              }}</span>
          </div>
        </div>
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
const activeTab = ref(store.activeTab.split('-').join('_'))

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

watch(activeTabIndex, () => {
  if (store.catalog[activeTabIndex.value]) {
    store.activeTab = store.catalog[activeTabIndex.value].url
    activeTab.value = store.activeTab.split('-').join('_')
  }
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

  &-wrapper {
    display: grid;
    background: #fff;
    color: base.$slate-gray;
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
    padding: 24px;
    border-radius: 12px;

    &-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    &-link {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;

      &:hover {
        color: base.$secondary-color;
      }

      &-title {
        font-weight: bold;
        margin-bottom: 12px;
        padding-top: 8px;
        transition: 0.3s ease-in-out;
        grid-column: span 4;

        &:hover {
          color: base.$secondary-color;
          transition: 0.3s ease-in-out;
        }
      }

      &-caption {
        color: base.$dark-gray;
      }
    }
  }
}

.active {
  color: base.$primary-color-light;
  border-left: solid 2px base.$primary-color-light;
}
</style>