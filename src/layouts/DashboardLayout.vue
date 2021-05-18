<template>
  <div class="layout">
    <layout-header :tab="state.tab" />
    <sidebar :tab="state.tab" :changeTab="changeTab"></sidebar>
    <div class="contents-wrapper">
      <router-view class="contents" :checkRouter="checkRouter" :majorList="state.majorList" />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import LayoutHeader from "../components/LayoutHeader";
import { reactive } from "vue";
import router from "../router";
import axios from "axios";

export default {
  components: {
    Sidebar,
    LayoutHeader
  },
  setup() {
    const state = reactive({
      majorList: [],
      tab: "dashboard"
    });

    const getMajorList = () => {
      const sheetUrl =
        "https://spreadsheets.google.com/feeds/cells/1xkSro5XjOkM1_mJqCcXgfqlvk1DsaLlmeTyA1A8_DBQ/2/public/basic?alt=json-in-script";

      const api = axios.create();
      let sheetDataList = [];

      axios
        .all([api.get(sheetUrl)])
        .then(res => {
          const sheetData = JSON.parse(
            res[0].data.slice(28, res[0].data.length - 2)
          );

          sheetData.feed.entry.forEach((el, index) => {
            const lineNum = Math.floor(index / 10);
            if (index % 10 == 0 && lineNum > 0) {
              const dataObj = {
                time: sheetData.feed.entry[index].content.$t,
                major: sheetData.feed.entry[index + 1].content.$t,
                year: sheetData.feed.entry[index + 2].content.$t,
                grade01: sheetData.feed.entry[index + 3].content.$t,
                grade02: sheetData.feed.entry[index + 4].content.$t,
                grade03: sheetData.feed.entry[index + 5].content.$t,
                grade04: sheetData.feed.entry[index + 6].content.$t,
                grade05: sheetData.feed.entry[index + 7].content.$t,
                totalGrade: sheetData.feed.entry[index + 8].content.$t,
                leftGrade: sheetData.feed.entry[index + 9].content.$t
              };
              sheetDataList.push(dataObj);
            }
          });

          state.majorList = sheetDataList;
          console.log(sheetDataList);
        })
        .catch(err => {
          console.log(err);
        });
    };

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

    getMajorList();

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
