<template>
  <div class="header">
    <h1>Can I Graduate?</h1>
    <h2>{{ tab }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    tab: String,
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;

  & > h1,
  & > h2 {
    text-align: left;
    margin: 0;
  }

  & > h1 {
    font-size: 18px;
  }

  & > h2 {
    font-size: 14px;
  }
}
</style>
