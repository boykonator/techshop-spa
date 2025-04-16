<template>
  <div class="catalog">
    <div class="catalog-breadcrumb-list">
      <span @click="navigateTo('/')" class="catalog-breadcrumb-list-item">IBTech</span>
      <Icon
          name="arrow-right"
          size="16"
          class="catalog-breadcrumb-list-arrow"
      />
      <span class="catalog-breadcrumb-list-item-last">Каталог</span>
    </div>

    <div class="catalog-title">Каталог</div>
    <div v-if="store.catalog.length" class="catalog-content">
      <div
          class="catalog-content-card-container"
          v-for="(item, index) in store.categoryTree"
          :key="item.title"
          @mouseenter="hoveredCardIndex = index"
          @mouseleave="hoveredCardIndex = null"
      >
        <div class="catalog-content-card">
          <div class="catalog-content-card-inner">
            <div
                class="catalog-content-card-face card-default"
                :class="{ 'card-hidden': hoveredCardIndex === index }"
            >
              <img class="catalog-content-card-image" :src="`/images/catalog/${item.url}.png`" alt="catalog-content-card-image">
              <div class="catalog-content-card-text">{{ item.title }}</div>
            </div>

            <div
                class="catalog-content-card-face card-hover"
                :class="{ 'card-visible': hoveredCardIndex === index }"
            >
              <div
                  class="catalog-content-card-title"
                  @click="navigateTo(`/catalog/${item.url}`)"
              >
                {{ item.title }}
              </div>

              <div
                  v-for="category of item.categories"
                  class="catalog-content-card-category"
                  @click="navigateTo(`/catalog/${category.url}`)"
              >
                {{ category.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from "~/stores/catalog.ts";
const store = useCatalogStore();

const hoveredCardIndex = ref(null);
</script>

<style scoped lang="scss">
.catalog {
  &-title {
    font-size: 32px;
    font-weight: bold;
    padding-bottom: 12px;
  }

  &-content {
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 16px;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

    @media (max-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }

    &-card-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-card {
      position: relative;
      width: 240px;
      height: 220px;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px -2px $dark-gray;
      transition: box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 10px 20px 1px $mid-gray;
      }

      &-inner {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &-face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
        overflow: hidden;
        transition: opacity 0.4s ease-in-out;
        opacity: 1;
        z-index: 0;
        background: #fff;
      }

      .card-default {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        text-align: center;
      }

      .card-hover {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;

        opacity: 0;
        z-index: 0;
      }

      .card-visible {
        opacity: 1;
      }

      .card-hidden {
        opacity: 0;
      }

      &-image {
        height: 152px;
        width: 152px;
      }

      &-text {
        font-size: 15px;
        line-height: 26px;
        font-weight: bold;
        word-wrap: break-word;
        text-align: center;
      }

      &-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
        cursor: pointer;

        &:hover {
          color: $secondary-color;
        }
      }

      &-category {
        font-size: 14px;
        line-height: 18px;
        padding-bottom: 10px;
        cursor: pointer;

        &:hover {
          color: $secondary-color;
        }
      }
    }
  }

  &-breadcrumb-list {
    display: flex;
    align-content: center;
    font-size: 13px;

    &-item {
      cursor: pointer;

      &-last {
        color: $graphite-gray;
      }
    }

    &-arrow {
      transform: rotate(-90deg);
      color: $graphite-gray;
    }
  }
}
</style>