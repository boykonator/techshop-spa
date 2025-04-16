<template>
  <div class="header-catalog">
    <div
        class="header-catalog-logo"
        @click="() => { navigateTo('/'); toggleCatalog(false) }"
        @mouseenter="isLinkHovered = true"
        @mouseleave="isLinkHovered = false"
    >
      IBTech
      <div v-if="isLinkHovered && route.path !== '/'" class="header-catalog-logo-annotation">
        Вернуться на главную
      </div>
    </div>

    <div class="header-catalog-content" @click="toggleCatalog(!isCatalogOpened)">
      <span>Каталог</span>
      <Icon name="arrow-down"/>
    </div>

    <div v-if="isCatalogOpened" class="header-catalog-wrapper">
      <div class="header-catalog-menu">
        <div
            v-for="item in catalog"
            :key="item.title"
            class="header-catalog-menu-link"
            @mouseenter="activeTabIndex = index"
            :class="{ active: activeTabIndex === index }"
            @click="navigateTo(`/catalog/${item.url}`)"
        >
          {{ item.title }}
        </div>
      </div>

      <div v-if="activeCategory" class="header-catalog-submenu-wrapper">
        <div
            v-for="(category, index) in activeCategory.categories"
            :key="index"
            class="header-catalog-submenu"
        >
          <div class="header-catalog-submenu-link-title" @click="navigateTo(`/catalog/${category.url}`)">
            {{ category.title }}
          </div>

          <div
              v-for="item in category.subcategories"
              :key="item.url"
              @click="navigateTo(`/catalog/${item.url}`)"
              class="header-catalog-submenu-link"
          >
            <span class="header-catalog-submenu-link-text">
              <span v-html="splitTitle(item.title)[0]"></span>
              <span class="header-catalog-submenu-link-caption-group">
                {{ splitTitle(item.title)[1] }}
                <span class="header-catalog-submenu-link-caption">
                  {{ Math.trunc(Math.random() * 100 + 1) }}
                  <Icon name="arrow-right" size="16" class="caption-icon"/>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useCatalogStore} from '~/stores/catalog'

const route = useRoute()
const store = useCatalogStore()

const catalog = ref(store.catalog)
const isLinkHovered = ref(false)
const activeTabIndex = ref(0)
const activeTab = ref(store.activeTab)

const props = defineProps({isFocused: Boolean})
const emit = defineEmits(['update:isFocused'])

const isCatalogOpened = ref(props.isFocused)

const splitTitle = (title: string) => {
  const words = title.trim().split(' ')
  const lastWord = words.pop()
  const rest = words.join(' ')
  return [rest ? rest + ' ' : '', lastWord]
}

const toggleCatalog = (value) => {
  isCatalogOpened.value = value
  emit('update:isFocused', value)
}

const setActiveTab = (tabUrl: string) => {
  store.activeTab = tabUrl
  activeTab.value = tabUrl
}

const activeCategory = computed(() =>
    store.categoryTree.find(category => category.url === activeTab.value)
)

watch(() => store.catalog, () => {
  catalog.value = store.catalog
})

watch(() => props.isFocused, () => {
  isCatalogOpened.value = props.isFocused
})

watch(activeTabIndex, () => {
  const tab = store.catalog[activeTabIndex.value]
  if (tab) setActiveTab(tab.url)
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
    padding: 10px 16px;
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

  &-submenu-wrapper {
    padding: 24px;
  }

  &-submenu {
    display: grid;
    grid-template-columns: repeat(3, 290px);
    column-gap: 24px;
    margin-bottom: 16px;

    &-link-title {
      font-weight: bold;
      margin-bottom: 12px;
      padding-top: 8px;
      grid-column: span 3;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        color: $secondary-color;
      }
    }

    &-link {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 8px;
      cursor: pointer;

      &:hover {
        color: $secondary-color;
      }

      &-text {
        display: inline;
        white-space: normal;
        word-break: break-word;
      }

      &-caption-group {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
      }

      &-caption {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: $dark-gray;
      }

      .caption-icon {
        transform: rotate(-90deg);
      }
    }
  }
}

.active {
  color: $primary-color-light;
  border-left: solid 2px $primary-color-light;
}
</style>
