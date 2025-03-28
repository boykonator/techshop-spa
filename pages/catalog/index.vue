<template>
  <div class="catalog">
    <div class="catalog-title">Каталог</div>
    <div v-if="store.catalog.length" class="catalog-content">
      <div class="catalog-content-card"
           v-for="item in store.catalog"
           :key="item.title"
           @click="navigateTo(`catalog/${item.url}`)"
      >
        <div class="catalog-content-card-image">

        </div>
        <div class="catalog-content-card-text"> {{ item.title }} </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCatalogStore} from "~/store/catalog.ts";
const store = useCatalogStore()

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

    &-card {
      background: #fff;
      box-shadow: 0 2px 4px -2px darkgray;
      border-radius: 8px;
      height: 200px;
      width: 240px;
      padding: 16px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      cursor: pointer;

      &:hover {
        background-color: #fff;
        border-color: base.$light-gray;
        box-shadow: 0 10px 20px 1px base.$mid-gray;
      }

      &-image {
        height: 120px;
        width: 180px;
        background: base.$primary-color;
      }

      &-text {
        font-size: 15px;
        line-height: 26px;
        font-weight: bold;
        word-wrap: break-word;

      }
    }
  }
}
</style>