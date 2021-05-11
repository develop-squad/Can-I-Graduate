<template>
  <div class="header">
    <h1>Can I Graduate?</h1>
    <h2>{{ tab }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    tab: String
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 15px;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1,
  h2 {
    text-align: left;
    margin: 0;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>
