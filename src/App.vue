<template>
  <router-view />
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
html {
  background-color: #1f1d30;
  height: 100vh;
  body {
    margin: 0;
    height: 100vh;
    #app {
      height: 100vh;
      font-family: "Noto Sans KR", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: white;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
