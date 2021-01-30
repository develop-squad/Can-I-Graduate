<template>
  <div class="sidebar">
    <ul>
      <li v-bind:class="tab == 'dashboard' ? 'selected' : ''" @click="onClickTab('dashboard')">Dashboard</li>
      <li v-bind:class="tab == 'majorCheck' ? 'selected' : ''" @click="onClickTab('majorCheck')">MajorCheck</li>
      <li v-bind:class="tab == 'menu3' ? 'selected' : ''" @click="onClickTab('menu3')">Menu 03</li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    tab: String,
    changeTab: Function,
  },
  setup(props) {
    onMounted(() => {
      // console.log(props);
    })

    const onClickTab = (param) => {
      props.changeTab(param);
    };

    return {
      onClickTab
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  margin: 0 15px;
  background-color: #28273f;
  border-radius: 4px;

  & > ul {
    padding: 10px;

    & > li {
      margin: 5px;
      padding: 5px;
      cursor: pointer;
    }

    & > li.selected {
      font-weight: bold;
    }
  }
}
</style>
