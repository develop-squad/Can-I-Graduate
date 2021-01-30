<template>
  <div>
    <div class="contents-card contents-title">
      <h1>MajorCheck</h1>
      <div class="contents-title__right">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfvKUcKaZdoS9eXbIYlkc_o5ZFTrqHApygLUXJdbinuAiIXVA/viewform"
        >추가하기</a>
      </div>

      <div class="contents-title__content">
        <p>여기에선 등록되어 있는 전공을 확인하고, 신청할 수 있는 사이트로 이동하는 기능이 있습니다. 현재 등록된 학과는 {{state.majorList.length}}개.</p>
      </div>
    </div>

    <div class="contents-card">
      <h2>Search</h2>
      <div class="major-search-wrapper">
        <select name="admission-year" v-model="state.searchYear" @change="onChangeSearch">
          <option value>입학년도</option>
          <option v-for="(item, index) in state.yearList" :key="index" v-on:value="item">{{item}}</option>
        </select>
        <input class="major-search-form" type="text" v-model="state.textInput" v-on:input="state.textInput=$event.target.value" @keyup="onChangeSearch" />
      </div>
    </div>

    <div class="contents-card">
      <h2>List</h2>
      <ul class="major-table">
        <li>
          <div class="year">입학년도</div>
          <div class="name">전공명</div>
          <div class="grade01">
            교양 필수
            <span>(중핵 필수)</span>
          </div>
          <div class="grade02">
            교양 선택 1
            <span>(중핵 필수 선택)</span>
          </div>
          <div class="grade03">학문 기초 교양</div>
          <div class="grade04">전공 필수</div>
          <div class="grade05">전공 선택</div>
          <div class="total">총 이수 학점</div>
        </li>
        <div>
          <li v-for="(item, index) in state.majorList" :key="index">
            <div class="year">{{item.year}}</div>
            <div class="name">{{item.major}}</div>
            <div class="grade01">{{item.grade01}}</div>
            <div class="grade02">{{item.grade02}}</div>
            <div class="grade03">{{item.grade03}}</div>
            <div class="grade04">{{item.grade04}}</div>
            <div class="grade05">{{item.grade05}}</div>
            <div class="total">{{item.totalGrade}}</div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const state = reactive({
      majorList: [],
      yearList: [],
      textInput: "",
      searchYear: ""
    });

    const getMajorList = () => {
      const sheetUrl =
        "https://spreadsheets.google.com/feeds/cells/1xkSro5XjOkM1_mJqCcXgfqlvk1DsaLlmeTyA1A8_DBQ/2/public/basic?alt=json-in-script";

      let api = axios.create();
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

              state.yearList.push(dataObj.year);

              sheetDataList.push(dataObj);
            }
          });

          state.majorList = sheetDataList;
          refineYearList();
        })
        .catch(err => {
          console.log(err);
        });
    };

    const refineYearList = () => {
      state.yearList.filter((el, index) => state.yearList.indexOf(el) == index);
    };

    const onChangeSearch = () => {
      console.log(state.searchYear, state.textInput);
    };

    onMounted(() => {
      getMajorList();
    });

    return {
      state,
      onChangeSearch
    };
  }
});
</script>
