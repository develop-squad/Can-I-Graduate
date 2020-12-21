<template>
  <div class="overview-contents">
    <div class="row">
      <div class="col-12">
        <card>
          <h5 slot="header" class="title">Excel File Upload</h5>
          <p>학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회 - 성적엑셀다운로드</p>

          <base-button class="upload-btn" slot="footer" type="primary" fill>
            Upload
            <input type="file" @change="uploadFile" accept="application/vnd.ms-excel" />
          </base-button>
        </card>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <card>
          <h5 slot="header" class="title">Graduate Requirement</h5>

          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="교양필수(중핵필수)" v-model="requirementCredit.liberal_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택1(중핵필수선택)" v-model="requirementCredit.liberal_S1"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공기초교양" v-model="requirementCredit.liberal_B"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="전공필수" v-model="requirementCredit.major_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공선택" v-model="requirementCredit.major_S"></base-input>
            </div>
          </div>
          <!-- <base-button slot="footer" type="primary" fill>Button</base-button> -->
        </card>
      </div>
      <div class="col-6">
        <card>
          <h5 slot="header" class="title">My Credit</h5>

          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="교양필수(중핵필수)" v-model="myData.liberal_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택1(중핵필수선택)" v-model="myData.liberal_S1"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공기초교양" v-model="myData.liberal_B"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="전공필수" v-model="myData.major_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공선택" v-model="myData.major_S"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택2(자유교양)" v-model="myData.liberal_S2"></base-input>
            </div>
          </div>
          <!-- <base-button slot="footer" type="primary" fill>Button</base-button> -->
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <h5 slot="header" class="title">Remain Credits</h5>
          <template slot="header">
            <h3
              class="card-title"
            >{{chartLoad ? `Total : ${requirementCredit.total - myData.total}` : "엑셀 파일을 업로드하여 차트를 확인하세요."}}</h3>
          </template>
          <div class="chart-area">
            <bar-chart
              v-if="chartLoad"
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            ></bar-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { parse } from "querystring";

import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import BarChart from "@/components/Charts/BarChart";

export default {
  mounted() {
    this.setRequrmentCredit("컴퓨터공학과");
  },
  components: {
    BarChart,
  },
  data() {
    return {
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
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  methods: {
    setRequrmentCredit(major) {
      let majorData = this.majorList.find((m) => m.label == major);
      this.requirementCredit.liberal_E = majorData.liberal_E;
      this.requirementCredit.liberal_S1 = majorData.liberal_S1;
      this.requirementCredit.liberal_S2 = majorData.liberal_S2;
      this.requirementCredit.liberal_B = majorData.liberal_B;
      this.requirementCredit.major_E = majorData.major_E;
      this.requirementCredit.major_S = majorData.major_S;
    },
    uploadFile(event) {
      let input = event.target;
      let reader = new FileReader();
      let vue = this;
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(function (sheetName) {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          vue.setData(rowObj);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    },
    setData(data) {
      console.log(data);
      let requireLiberal_S2 =
        this.requirementCredit.total -
        (this.requirementCredit.liberal_E +
          this.requirementCredit.liberal_S1 +
          this.requirementCredit.liberal_B +
          this.requirementCredit.major_E +
          this.requirementCredit.major_S);
      let chartData = [
        this.requirementCredit.liberal_E,
        this.requirementCredit.liberal_S1,
        this.requirementCredit.liberal_B,
        this.requirementCredit.major_E,
        this.requirementCredit.major_S,
        requireLiberal_S2,
      ];
      console.log(this.blueBarChart.chartData);
      this.blueBarChart.chartData.datasets[0].data = chartData;

      data.forEach((r) => {
        this.classList.push(r);
        let credit = parseInt(r["학점"]);
        switch (r["이수구분"]) {
          case "교필":
            this.myData.liberal_E += credit;
            this.blueBarChart.chartData.datasets[0].data[0] -= credit;
            break;
          case "교선1":
            this.myData.liberal_S1 += credit;
            this.blueBarChart.chartData.datasets[0].data[1] -= credit;
            break;
          case "교선2":
            this.myData.liberal_S2 += credit;
            this.blueBarChart.chartData.datasets[0].data[5] -= credit;
            break;

          case "기교":
            this.myData.liberal_B += credit;
            this.blueBarChart.chartData.datasets[0].data[2] -= credit;
            break;

          case "전필":
            this.myData.major_E += credit;
            this.blueBarChart.chartData.datasets[0].data[3] -= credit;
            break;

          case "전선":
            this.myData.major_S += credit;
            this.blueBarChart.chartData.datasets[0].data[4] -= credit;
            break;
        }
      });

      this.myData.total =
        this.myData.liberal_E +
        this.myData.liberal_S1 +
        this.myData.liberal_S2 +
        this.myData.liberal_B +
        this.myData.major_E +
        this.myData.major_S;

      this.blueBarChart.chartData.datasets[0].data.forEach((c, index) => {
        if (c < 0 && index != 5) {
          this.blueBarChart.chartData.datasets[0].data[5] += c;
          this.blueBarChart.chartData.datasets[0].data[index] = 0;
        }
      });

      this.blueBarChart.chartData.labels.forEach((label, index) => {
        let credit = this.blueBarChart.chartData.datasets[0].data[index];
        this.blueBarChart.chartData.labels[index] += ` (${credit})`;
      });

      this.chartLoad = true;
    },
  },
};
</script>
<style lang="scss">
.overview-contents {
  .upload-btn {
    overflow: hidden;
    input {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
    }
  }
}
</style>
