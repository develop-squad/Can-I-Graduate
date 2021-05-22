<template>
  <div class="layout">
    <layout-header :tab="tab" />
    <sidebar :tab="tab" :changeTab="changeTab"></sidebar>
    <div class="contents-wrapper">
      <router-view class="contents" :checkRouter="checkRouter" :majorList="majorList" />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import LayoutHeader from "../components/LayoutHeader";
import { ref, watch } from "vue";
import router from "../router";
import axios from "axios";

export default {
  components: {
    Sidebar,
    LayoutHeader
  },
  setup() {
    const majorList = ref([]);
    const tab = ref("dashboard");

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

          majorList.value = sheetDataList;
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

      if (routeTab != tab.value) {
        tab.value = routeTab;
      }
    };

    const changeTab = tabName => {
      tab.value = tabName;
      switch (tab.value) {
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
      majorList,
      tab,
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

  .cig-card {
    background-color: #28273e;
    border-radius: 4px;
    margin: 0 0 10px;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: calc(100% - 32px);

    &.harf-panel {
      width: calc(50% - 37px);
    }

    h1 {
      margin: 0 0 8px;
      padding: 0 0 8px;
      border-bottom: 1px solid #ffffff66;
      font-size: 18px;
      font-weight: 600;
    }

    p {
      margin: 0;
    }

    .button-wrapper {
      margin: 16px 0 0;
      display: flex;
      justify-content: flex-end;

      input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    }
  }

  a.cig-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
    padding: 6px 18px;
    border-radius: 4px;
    text-decoration: none;
    background: linear-gradient(to bottom left, #1d8cf8, #e14eca);
    z-index: 1;
    &:hover,
    &:active {
      &::before {
        opacity: 0;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #8274e5;
      transition: opacity 0.6s cubic-bezier(0.83, 0, 0.17, 1);
      border-radius: 4px;
      content: "";
      z-index: -1;
    }
  }

  label.cig-button {
    position: relative;
    display: flex;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;

    &::before {
      position: absolute;
      top: -8px;
      left: -8px;
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      background: linear-gradient(to bottom left, #1d8cf8, #e14eca);
      border-radius: 4px;
      content: "";
      z-index: 0;
    }

    span {
      z-index: 1;
      padding: 6px 18px;
      border-radius: 4px;
      background-color: #8274e5;
      transition: background-color 0.6s cubic-bezier(0.83, 0, 0.17, 1);
    }

    &:hover,
    &:active {
      span {
        background-color: transparent;
      }
    }
  }
}
</style>
