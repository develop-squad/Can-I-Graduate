<template>
  <div class="dashboard">
    <section class="upload-panel">
      <h1>Excel File Upload</h1>
      <p>
        학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회
        - 성적엑셀다운로드
      </p>
      <div class="file-upload-button">
        <label for="file-input">
          <span>Upload</span>
        </label>
        <input type="file" id="file-input" @change="uploadFile" accept="application/vnd.ms-excel" />
      </div>
    </section>

    <section class="requirement-panel harf-panel">
      <h1>Graduate Requirement</h1>
      <div>
        <select v-model="selectedMajor" @change="onSelectMajor">
          <option value>-- 전공을 선택해주세요 --</option>
          <option
            :value="item"
            v-for="(item, index) in majorList"
            :key="index"
          >{{item.year}} - {{item.major}}</option>
        </select>
      </div>
      <div class="inputs">
        <div class="input">
          <label for="req1">교양필수(중핵필수)</label>
          <input name="req1" type="text" v-model="requirementPoint[0]" />
        </div>
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <input name="req2" type="text" v-model="requirementPoint[1]" />
        </div>
        <div class="input">
          <label for="req3">전공기초교양</label>
          <input name="req3" type="text" v-model="requirementPoint[2]" />
        </div>
        <div class="input">
          <label for="req4">전공필수</label>
          <input name="req4" type="text" v-model="requirementPoint[3]" />
        </div>
        <div class="input">
          <label for="req5">전공선택</label>
          <input name="req5" type="text" v-model="requirementPoint[4]" />
        </div>
      </div>
    </section>

    <section class="my-credit-panel harf-panel">
      <h1>My Credit</h1>
      <div class="inputs">
        <div class="input">
          <label for="req1">교양필수(중핵필수)</label>
          <input name="req1" type="text" v-model="myGrade[0]" />
        </div>
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <input name="req2" type="text" v-model="myGrade[1]" />
        </div>
        <div class="input">
          <label for="req3">전공기초교양</label>
          <input name="req3" type="text" v-model="myGrade[2]" />
        </div>
        <div class="input">
          <label for="req4">전공필수</label>
          <input name="req4" type="text" v-model="myGrade[3]" />
        </div>
        <div class="input">
          <label for="req5">전공선택</label>
          <input name="req5" type="text" v-model="myGrade[4]" />
        </div>
        <div class="input">
          <label for="req5">교양선택2(자유교양)</label>
          <input name="req5" type="text" v-model="myGrade[5]" />
        </div>
      </div>
    </section>

    <section class="graph-panel">
      <h1>Remain Credits</h1>
      <div class="chart-area">
        <BarChart
          v-if="chartLoad"
          style="height: 100%"
          chart-id="blue-bar-chart"
          :chart-data="blueBarChart.chartData"
          :gradient-stops="blueBarChart.gradientStops"
          :extra-options="blueBarChart.extraOptions"
        ></BarChart>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

import XLSX from "xlsx";
import * as chartConfigs from "../components/Charts/config";
import config from "../config";
import BarChart from "../components/Charts/BarChart";

export default defineComponent({
  props: ["checkRouter", "majorList"],
  components: {
    BarChart
  },

  setup(props) {
    const majorList = ref(computed(() => props.majorList));
    const selectedMajor = ref("");

    const requirementPoint = ref([0, 0, 0, 0, 0, 0]);
    const myGrade = ref([0, 0, 0, 0, 0, 0]);

    const blueBarChart = ref({
      extraOptions: chartConfigs.barChartOptions,
      chartData: {
        labels: ["교필", "교선1", "기교", "전필", "전선", "교선2"],
        datasets: [
          {
            label: "이수 학점",
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            label: "필요 학점",
            fill: true,
            borderColor: "#d1515f",
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      },
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0]
    });

    const chartLoad = ref(false);

    const uploadFile = event => {
      chartLoad.value = false;
      const input = event.target;
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        const wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(sheetName => {
          setMyGrade(XLSX.utils.sheet_to_json(wb.Sheets[sheetName]));
        });
      };
      reader.readAsBinaryString(input.files[0]);
    };

    const setMyGrade = gradeList => {
      const gradePointList = [0, 0, 0, 0, 0, 0];
      gradeList.forEach(grade => {
        // console.log(grade["학점"], grade["이수구분"], grade["등급"]);
        switch (grade["이수구분"]) {
          case "교필":
            gradePointList[0] += parseInt(grade["학점"]);
            break;
          case "교선1":
            gradePointList[1] += parseInt(grade["학점"]);
            break;
          case "교선2":
            gradePointList[5] += parseInt(grade["학점"]);
            break;
          case "기교":
            gradePointList[2] += parseInt(grade["학점"]);
            break;
          case "전필":
            gradePointList[3] += parseInt(grade["학점"]);
            break;
          case "전선":
            gradePointList[4] += parseInt(grade["학점"]);
            break;
        }
      });
      myGrade.value = gradePointList;
      changeChartData();
    };

    const onSelectMajor = () => {
      chartLoad.value = false;

      if (selectedMajor.value != "") {
        requirementPoint.value = [
          parseInt(selectedMajor.value.grade01),
          parseInt(selectedMajor.value.grade02),
          parseInt(selectedMajor.value.grade03),
          parseInt(selectedMajor.value.grade04),
          parseInt(selectedMajor.value.grade05),
          parseInt(selectedMajor.value.leftGrade)
        ];
        changeChartData();
      } else {
        requirementPoint.value = [0, 0, 0, 0, 0, 0];
      }
    };

    const changeChartData = () => {
      blueBarChart.value.chartData.datasets[0].data = myGrade.value;

      const needGradeList = [];
      let lastNum = 0;
      requirementPoint.value.forEach((el, index) => {
        const num = el - myGrade.value[index];
        if (num < 0) lastNum += num;
        needGradeList.push(
          index < 5
            ? num > 0
              ? num
              : 0
            : num + lastNum > 0
            ? num + lastNum
            : 0
        );
      });

      blueBarChart.value.chartData.datasets[1].data = needGradeList;

      console.log(blueBarChart.value);
      setTimeout(() => {
        chartLoad.value = true;
      }, 100);
    };

    props.checkRouter();

    return {
      selectedMajor,
      onSelectMajor,
      requirementPoint,
      myGrade,
      majorList,
      blueBarChart,
      chartLoad,
      uploadFile
    };
  }
});
</script>

<style lang="scss">
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  section {
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

    &.upload-panel {
      .file-upload-button {
        margin: 16px 0 0;
        display: flex;
        justify-content: flex-end;

        label {
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
  }

  .requirement-panel,
  .my-credit-panel {
    .inputs {
      display: flex;
      flex-wrap: wrap;
      input {
        display: flex;
        flex-direction: column;
        color: white;
        border-style: solid;
        border-color: #2b3553;
        border-width: 1px;
        background-color: transparent;
        &:focus {
          outline: none;
        }
      }
    }
  }

  .requirement-panel {
    grid-area: requirement-panel;
  }
  .my-credit-panel {
    grid-area: my-credit-panel;
  }
  .graph-panel {
    grid-area: graph-panel;
  }
}
</style>