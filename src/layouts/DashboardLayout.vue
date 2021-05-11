<template>
  <div class="layout">
    <layout-header :tab="state.tab" />
    <sidebar :tab="state.tab" :changeTab="changeTab"></sidebar>
    <div class="contents-wrapper">
      <router-view class="contents" :checkRouter="checkRouter" />
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
    LayoutHeader
  },
  setup() {
    const state = reactive({
      tab: "dashboard"
    });

    const checkRouter = () => {
      let routeTab = "";
      switch (location.pathname.replace("/", "")) {
        case "":
          routeTab = "dashboard";
          break;
        case "major-check":
          routeTab = "majorCheck";
          break;
        case "register-test":
          routeTab = "registerTest";
          break;
      }

      if (routeTab != state.tab) {
        state.tab = routeTab;
      }
    };

    const changeTab = tab => {
      state.tab = tab;
      switch (tab) {
        case "dashboard":
          router.push("/");
          break;
        case "majorCheck":
          router.push("major-check");
          break;

        case "registerTest":
          router.push("register-test");
          break;
      }
    };

    return {
      state,
      changeTab,
      checkRouter
    };
  }
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  .sidebar {
    width: calc(20% - 30px);
    height: calc(100vh - 89px);
  }
  .contents-wrapper {
    width: calc(80% - 15px);
    margin: 0 15px 0 0;
    overflow: scroll;
    height: calc(100vh - 89px);
  }

  .cig-button {
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    color: black;
    line-height: 1;
    box-shadow: 0 1px 5px #00000033, 0 2px 2px #00000024,
      0 3px 1px -2px #0000001f;
    padding: 10px 16px;
    background-color: white;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
