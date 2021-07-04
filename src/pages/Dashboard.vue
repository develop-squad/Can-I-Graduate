<template>
  <div class="dashboard">
    <div class="cig-card upload-panel">
      <h1>Excel File Upload</h1>
      <p>
        학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회
        - 성적엑셀다운로드
      </p>
      <div class="button-wrapper">
        <label for="file-input" class="cig-button">
          <span>Upload</span>
        </label>
        <input type="file" id="file-input" @change="uploadFile" accept="application/vnd.ms-excel" />
      </div>
    </div>

    <div class="cig-card requirement-panel harf-panel">
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
    </div>

    <div class="cig-card my-credit-panel harf-panel">
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
    </div>

    <div class="cig-card graph-panel">
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
    </div>
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
            borderColor: '#8274e5',
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            label: "필요 학점",
            fill: true,
            borderColor: "#e14eca",
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
      const typeList = ["교필", "교선1", "기교", "전필", "전선", "교선2"];
      const exceptionGradeList = ["F", "FA", "NP"];
      gradeList.forEach(grade => {
        if (exceptionGradeList.findIndex(el => el == grade["등급"]) == -1) {
          gradePointList[
            typeList.findIndex(el => el == grade["이수구분"])
          ] += parseInt(grade["학점"]);
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