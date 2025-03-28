<template>
  <div class="cart">
    <div class="cart-title">Корзина</div>
    <div class="cart-content" v-if="!cartContent.length">
      <div class="cart-content-image">

      </div>
      <h1>Пока пусто</h1>
      <span class="cart-content-text">Воспользуйтесь <a href="catalog">каталогом</a> или поиском</span>
      <span class="cart-content-text">Если у вас были товары в корзине – <a href="">войдите</a> в профиль</span>
    </div>
  </div>
</template>

<script setup>
const cartContent = ref([])
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: base.$secondary-color;
  padding: 0;
  margin: 0;
  border: none;
}

.cart {

  &-title {
    font-size: 32px;
    font-weight: bold;
    padding: 48px 0 12px 0;
  }

  &-content {
    background: #fff;
    box-shadow: 0 2px 4px -2px darkgray;
    height: 50vh;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    &-image {
      height: 200px;
      width: 250px;
      background: base.$primary-color;
    }

    &-text {
      font-size: 16px;
      line-height: 26px;
    }
  }
}
</style>