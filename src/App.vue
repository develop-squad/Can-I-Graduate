<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #1F1D30;
  padding-bottom: 20px;
  height: 100vh;
}

body {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
