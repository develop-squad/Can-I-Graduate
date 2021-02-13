<template>
  <div class="dashboard">
    <section class="upload-panel">
      <h1>Excel File Upload</h1>
      <p>
        학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회
        - 성적엑셀다운로드
      </p>
      <div class="file-upload-button">
        <label for="file-input">Upload</label>
        <input
          type="file"
          id="file-input"
          @change="uploadFile"
          accept="application/vnd.ms-excel"
        />
      </div>
    </section>
    <section class="requirement-panel">
      <h1>Graduate Requirement</h1>
      <div class="inputs">
        <div class="input">
          <label for="req1">교양필수(중핵필수)</label>
          <input name="req1" type="text" v-model="pageData.requirementCredit.liberal_E"/>
          <!-- <input name="req1" type="text" /> -->
        </div>
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <input name="req2" type="text" v-model="pageData.requirementCredit.liberal_S1"/>
          <!-- <input name="req2" type="text" /> -->
        </div>
        <div class="input">
          <label for="req3">전공기초교양</label>
          <input name="req3" type="text" v-model="pageData.requirementCredit.liberal_B" />
          <!-- <input name="req3" type="text" /> -->
        </div>
        <div class="input">
          <label for="req4">전공필수</label>
          <input name="req4" type="text" v-model="pageData.requirementCredit.major_E" />
          <!-- <input name="req4" type="text" /> -->
        </div>
        <div class="input">
          <label for="req5">전공선택</label>
          <input name="req5" type="text" v-model="pageData.requirementCredit.major_S" />
          <!-- <input name="req5" type="text" /> -->
        </div>
      </div>
    </section>
    <section class="my-credit-panel">
      <h1>My Credit</h1>
      <div class="inputs">
        <div class="input">
          <label for="req1">교양필수(중핵필수)</label>
          <input name="req1" type="text" v-model="pageData.myData.liberal_E" />
          <!-- <input name="req1" type="text" /> -->
        </div>
        <div class="input">
          <label for="req2">교양선택1(중핵필수선택)</label>
          <input name="req2" type="text" v-model="pageData.myData.liberal_S1" />
          <!-- <input name="req2" type="text" /> -->
        </div>
        <div class="input">
          <label for="req3">전공기초교양</label>
          <input name="req3" type="text" v-model="pageData.myData.liberal_B" />
          <!-- <input name="req3" type="text" /> -->
        </div>
        <div class="input">
          <label for="req4">전공필수</label>
          <input name="req4" type="text" v-model="pageData.myData.major_E" />
          <!-- <input name="req4" type="text" /> -->
        </div>
        <div class="input">
          <label for="req5">전공선택</label>
          <input name="req5" type="text" v-model="pageData.myData.major_S" />
          <!-- <input name="req5" type="text" /> -->
        </div>
        <div class="input">
          <label for="req5">교양선택2(자유교양)</label>
          <input name="req5" type="text" v-model="pageData.myData.liberal_S2" />
          <!-- <input name="req5" type="text" /> -->
        </div>
      </div>
    </section>
    <section class="graph-panel">
      <h1>Remain Credits</h1>
      <div class="chart-area">
        <BarChart
          v-if="pageData.chartLoad"
          style="height: 100%"
          chart-id="blue-bar-chart"
          :chart-data="pageData.blueBarChart.chartData"
          :gradient-stops="pageData.blueBarChart.gradientStops"
          :extra-options="pageData.blueBarChart.extraOptions"
        ></BarChart>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import XLSX from "xlsx";
import * as chartConfigs from "../components/Charts/config";
import config from "../config";
import BarChart from "../components/Charts/BarChart";
export default defineComponent({
  props: ["checkRouter"],

  components: {
    // chartConfigs,
    // config,
    BarChart,
  },
  setup(props) {
    // const uploadFile = (event: any): void => {
    onMounted(() => {
      setRequrmentCredit("컴퓨터공학과");
    })
    const pageData = reactive({
      classList: [],
      myData: {
        total: 0,
        liberal_E: 0,
        liberal_S1: 0,
        liberal_S2: 0,
        liberal_B: 0,
        major_E: 0,
        major_S: 0,
      },
      majorList: [
        {
          label: "컴퓨터공학과",
          liberal_E: 11,
          liberal_S1: 15,
          liberal_S2: 0,
          liberal_B: 12,
          major_E: 27,
          major_S: 45,
        },
      ],
      requirementCredit: {
        total: 130,
        liberal_E: 0,
        liberal_S1: 0,
        liberal_S2: 0,
        liberal_B: 0,
        major_E: 0,
        major_S: 0,
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["교필", "교선1", "기교", "전필", "전선", "교선2"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [10, 0, 0, 0, 0, 0],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
      chartLoad: false,
    });
    const uploadFile = (event) => {
      let input = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(function (sheetName) {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          setData(rowObj);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    };
    const setData = (data) => {
      console.log(data);
      let requireLiberal_S2 =
        pageData.requirementCredit.total -
        (pageData.requirementCredit.liberal_E +
          pageData.requirementCredit.liberal_S1 +
          pageData.requirementCredit.liberal_B +
          pageData.requirementCredit.major_E +
          pageData.requirementCredit.major_S);
      let chartData = [
        pageData.requirementCredit.liberal_E,
        pageData.requirementCredit.liberal_S1,
        pageData.requirementCredit.liberal_B,
        pageData.requirementCredit.major_E,
        pageData.requirementCredit.major_S,
        requireLiberal_S2,
      ];
      console.log(pageData.blueBarChart.chartData);
      pageData.blueBarChart.chartData.datasets[0].data = chartData;

      data.forEach((r) => {
        pageData.classList.push(r);
        let credit = parseInt(r["학점"]);
        switch (r["이수구분"]) {
          case "교필":
            pageData.myData.liberal_E += credit;
            pageData.blueBarChart.chartData.datasets[0].data[0] -= credit;
            break;
          case "교선1":
            pageData.myData.liberal_S1 += credit;
            pageData.blueBarChart.chartData.datasets[0].data[1] -= credit;
            break;
          case "교선2":
            pageData.myData.liberal_S2 += credit;
            pageData.blueBarChart.chartData.datasets[0].data[5] -= credit;
            break;

          case "기교":
            pageData.myData.liberal_B += credit;
            pageData.blueBarChart.chartData.datasets[0].data[2] -= credit;
            break;

          case "전필":
            pageData.myData.major_E += credit;
            pageData.blueBarChart.chartData.datasets[0].data[3] -= credit;
            break;

          case "전선":
            pageData.myData.major_S += credit;
            pageData.blueBarChart.chartData.datasets[0].data[4] -= credit;
            break;
        }
      });

      pageData.myData.total =
        pageData.myData.liberal_E +
        pageData.myData.liberal_S1 +
        pageData.myData.liberal_S2 +
        pageData.myData.liberal_B +
        pageData.myData.major_E +
        pageData.myData.major_S;


      pageData.blueBarChart.chartData.datasets[0].data.forEach((c, index) => {
        if (c < 0 && index != 5) {
          pageData.blueBarChart.chartData.datasets[0].data[5] += c;
          pageData.blueBarChart.chartData.datasets[0].data[index] = 0;
        }
      });

      pageData.blueBarChart.chartData.labels.forEach((label, index) => {
        let credit = pageData.blueBarChart.chartData.datasets[0].data[index];
        pageData.blueBarChart.chartData.labels[index] += ` (${credit})`;
      });

      pageData.chartLoad = true;
      alert("chartload is true");
    };
    const setRequrmentCredit = (major) => {
      let majorData = pageData.majorList.find((m) => m.label == major);
      pageData.requirementCredit.liberal_E = majorData.liberal_E;
      pageData.requirementCredit.liberal_S1 = majorData.liberal_S1;
      pageData.requirementCredit.liberal_S2 = majorData.liberal_S2;
      pageData.requirementCredit.liberal_B = majorData.liberal_B;
      pageData.requirementCredit.major_E = majorData.major_E;
      pageData.requirementCredit.major_S = majorData.major_S;
    };    
    
    props.checkRouter();
    
    
    return {
      pageData,
      uploadFile,
      setData,
      setRequrmentCredit,
    };
  }
});
</script>
<style lang="scss">
.dashboard {
  // background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "upload-panel upload-panel"
    "requirement-panel my-credit-panel"
    "graph-panel graph-panel";
  justify-content: space-between;
  .upload-panel,
  .requirement-panel,
  .my-credit-panel,
  .graph-panel {
    h1 {
      font-size: 13px;
      font-weight: 600;
    }
    background-color: #27293d;
    border-radius: 10px;
    margin: 5px;
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

  .upload-panel {
    grid-area: upload-panel;
    .file-upload-button {
      label {
        display: inline-block;
        padding: 0.5em 0.75em;
        color: white;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        // background-color: #fdfdfd;
        background-image: linear-gradient(
          to bottom left,
          #e14eca,
          #ba54f5,
          #e14eca
        );
        cursor: pointer;
        // border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: 0.25em;
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