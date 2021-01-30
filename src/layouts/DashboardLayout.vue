<template>
  <div class="layout">
    <layout-header :tab="state.tab" />
    <div class="main-container">
      <sidebar :tab="state.tab" :changeTab="changeTab"></sidebar>
      <router-view class="contents" />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import LayoutHeader from "../components/LayoutHeader";
import { reactive } from "vue";
import router from "../router";

export default {
  components: {
    Sidebar,
    LayoutHeader,
  },
  setup() {
    const state = reactive({
      tab: "dashboard",
    });

    const changeTab = (tab) => {
      state.tab = tab;
      switch (tab) {
        case "dashboard":
          router.push("/");
          break;
        case "majorCheck":
          router.push("major-check");
          break;

        case "menu3":
          router.push("menu3");
          break;
      }
    };

    return {
      state,
      changeTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-wrap: wrap;

  & > .main-container {
    display: flex;
    width: 100%;
  }

  & > .main-container > .sidebar {
    width: 20%;
  }

  & > .main-container > .contents {
    width: 80%;
    margin: 0 15px 0 0;
  }
}
</style>
