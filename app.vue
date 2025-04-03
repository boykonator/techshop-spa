<template>
  <div class="app">
    <Header />
    <NuxtPage class="container" />
  </div>
</template>

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
}
</style>
