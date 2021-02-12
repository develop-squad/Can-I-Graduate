<template>
  <div class="layout">
    <layout-header :tab="state.tab" />
    <div class="main-container">
      <sidebar :tab="state.tab" :changeTab="changeTab"></sidebar>
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
