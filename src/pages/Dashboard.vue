<template>
  <div class="dashboard">
    <div class="cig-card upload-panel">
      <h1>Excel File Upload</h1>
      <p>
        <a href="https://portal.sejong.ac.kr/">세종대학교 포털</a> - 학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회 - 성적엑셀다운로드
        - 업로드 후 전공 선택
      </p>
      <div class="button-wrapper">
        <label for="file-input" class="cig-button">
          <span>Upload</span>
        </label>
        <input
          type="file"
          id="file-input"
          @change="uploadFile"
          accept="application/vnd.ms-excel, .xlsx"
        />
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
          <span>{{requirementPoint[0]}}</span>
        </div>
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <span>{{requirementPoint[1]}}</span>
        </div>
        <div class="input">
          <label for="req3">전공기초교양</label>
          <span>{{requirementPoint[2]}}</span>
        </div>
        <div class="input">
          <label for="req4">전공필수</label>
          <span>{{requirementPoint[3]}}</span>
        </div>
        <div class="input">
          <label for="req5">전공선택</label>
          <span>{{requirementPoint[4]}}</span>
        </div>
      </div>
    </div>

    <div class="cig-card my-credit-panel harf-panel">
      <h1>My Credit</h1>
      <div class="inputs">
        <div class="input">
          <label for="req1">교양필수(중핵필수)</label>
          <span>{{myGrade[0]}}</span>
        </div>
        
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <span>{{myGrade[1]}}</span>
        </div>
        
        <div class="input">
          <label for="req3">전공기초교양</label>
          <span>{{myGrade[2]}}</span>
        </div>
        
        <div class="input">
          <label for="req4">전공필수</label>
          <span>{{myGrade[3]}}</span>
        </div>
        
        <div class="input">
          <label for="req5">전공선택</label>
          <span>{{myGrade[4]}}</span>
        </div>
        
        <div class="input">
          <label for="req5">교양선택2(자유교양)</label>
          <span>{{myGrade[5]}}</span>
        </div>
        
      </div>
    </div>

    <div class="cig-card progress-panel">
      <h1>Progress Bar</h1>
      <div class="progress-bar-wrapper">
        <div v-if="(uploaded && selected)">
          <div class="progress-bar">
            <div class="progress-bar__complete" :style="`width: ${progressBarWidth}%`">
              <span>이수 학점 : {{completeCredit}}</span>
            </div>
            <span>필요 학점 : {{maxCredit}}</span>
          </div>
        </div>
        <span v-else>전공을 선택하고, 성적표를 업로드 해주세요.</span>
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
        <span v-else>전공을 선택하거나, 성적표를 업로드 해주세요.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
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
    const selected = ref(false);
    const uploaded = ref(false);
    const maxCredit = ref(0);
    const completeCredit = ref(0);
    const progressBarWidth = ref(0);

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
            borderColor: "#8274e5",
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
          setMyGrade(XLSX.utils.sheet_to_json(wb.Sheets[sheetName]), sheetName);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    };

    const setMyGrade = (gradeList, sheetName) => {
      completeCredit.value = 0;
      let rowName01 = "등급";
      let rowName02 = "이수구분";
      let rowName03 = "학점";
      if (sheetName === "기이수성적") {
        rowName01 = "__EMPTY_9";
        rowName02 = "__EMPTY_4";
        rowName03 = "__EMPTY_7";
      }

      const gradePointList = [0, 0, 0, 0, 0, 0];
      const typeList = ["교필", "교선1", "기교", "전필", "전선", "교선2"];
      const exceptionGradeList = ["F", "FA", "NP"];
      gradeList.forEach(grade => {
        if (
          exceptionGradeList.findIndex(el => el == grade[rowName01]) == -1 &&
          parseInt(grade[rowName03])
        ) {
          gradePointList[
            typeList.findIndex(el => el == grade[rowName02])
          ] += parseInt(grade[rowName03]);
          completeCredit.value += parseInt(grade[rowName03]);
        }
      });
      myGrade.value = gradePointList;
      changeChartData();
      uploaded.value = true;
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
        maxCredit.value =
          parseInt(selectedMajor.value.grade01) +
          parseInt(selectedMajor.value.grade02) +
          parseInt(selectedMajor.value.grade03) +
          parseInt(selectedMajor.value.grade04) +
          parseInt(selectedMajor.value.grade05) +
          parseInt(selectedMajor.value.leftGrade);
        changeChartData();
        selected.value = true;
      } else {
        requirementPoint.value = [0, 0, 0, 0, 0, 0];
        selected.value = false;
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

    watch([maxCredit, completeCredit], () => {
      if (selected.value && uploaded.value) {
        setTimeout(() => {
          progressBarWidth.value =
            (completeCredit.value / maxCredit.value) * 100;
        }, 400);
      }
    });

    props.checkRouter();

    return {
      selectedMajor,
      onSelectMajor,
      requirementPoint,
      myGrade,
      majorList,
      blueBarChart,
      chartLoad,
      uploadFile,
      uploaded,
      selected,
      maxCredit,
      completeCredit,
      progressBarWidth
    };
  }
});
</script>

<style lang="scss">
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .upload-panel {
    a {
      color: white;
    }
  }

  .requirement-panel,
  .my-credit-panel {
    select {
      border-color: #8274e5;
      font-weight: bold;
    }
    .inputs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .input {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 0 4px;
      }
    }

    select {
      width: 100%;
    }
  }

  .progress-panel {
    .progress-bar-wrapper {
      display: flex;

      & > div {
        width: 100%;
      }
      .progress-bar {
        width: 100%;
        height: 28px;
        background-color: #554e91;
        position: relative;
        border-radius: 4px;
        &__complete {
          background-color: #8274e5;
          border-radius: 4px;
          height: 100%;
          transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          width: 0%;
          span {
            left: 4px;
          }
        }
        span {
          top: 0;
          padding: 2px;
          position: absolute;
          right: 4px;
          color: white;
        }
      }
    }
  }
}
</style>