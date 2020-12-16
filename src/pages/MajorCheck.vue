<template>
  <div>
    <h1>MajorCheck</h1>

    <p>
      여기에선 등록되어 있는 전공을 확인하고, 신청할 수 있는 사이트로 이동하는 기능이
      있다.
      <!-- 설문지 주소 : https://docs.google.com/forms/d/e/1FAIpQLSfvKUcKaZdoS9eXbIYlkc_o5ZFTrqHApygLUXJdbinuAiIXVA/viewform -->
    </p>

    <ul>
      <li v-for="(item, index) in state.majorList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const state = reactive({
      majorList: [],
    });

    const getMajorList = () => {
      const sheetUrl =
        "https://spreadsheets.google.com/feeds/cells/1xkSro5XjOkM1_mJqCcXgfqlvk1DsaLlmeTyA1A8_DBQ/2/public/basic?alt=json-in-script";

      let api = axios.create();
      let sheetDataList = [];

      axios
        .all([api.get(sheetUrl)])
        .then((res) => {
          const sheetData = JSON.parse(res[0].data.slice(28, res[0].data.length - 2));

          sheetData.feed.entry.forEach((el, index) => {
            const lineNum = Math.floor(index / 10);
            if (index % 10 == 0 && lineNum > 0) {
              const dataObj = {
                time: sheetData.feed.entry[index].content.$t,
                major: sheetData.feed.entry[index + 1].content.$t,
                year: sheetData.feed.entry[index + 2].content.$t,
                grader01: sheetData.feed.entry[index + 3].content.$t,
                grader02: sheetData.feed.entry[index + 4].content.$t,
                grader03: sheetData.feed.entry[index + 5].content.$t,
                grader04: sheetData.feed.entry[index + 6].content.$t,
                grader05: sheetData.feed.entry[index + 7].content.$t,
                totalGrade: sheetData.feed.entry[index + 8].content.$t,
                leftGrade: sheetData.feed.entry[index + 9].content.$t,
              };

              sheetDataList.push(dataObj);
            }
          });

          state.majorList = sheetDataList;
          console.log(state.majorList);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      getMajorList();
    });

    return {
      state,
    };
  },
});
</script>
