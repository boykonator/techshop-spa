<template>
  <div class="app">
    <Header />
    <NuxtPage class="container" />
  </div>
</template>

<style lang="scss">
.app {
  color: base.$slate-gray;
  font-family: 'Roboto', Roboto, sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.container {
  padding: 48px 144px;
  background-color: base.$light-gray;
  min-height: 70vh;
  display: flex;
  flex-direction: column;

  @media(max-width: 1440px) {
    padding: 48px 72px;
  }

  @media(max-width: 1280px) {
    padding: 48px 36px;
  }
}
</style>
