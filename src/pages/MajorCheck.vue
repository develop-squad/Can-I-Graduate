<template>
  <div>
    <div class="cig-card">
      <h1>MajorCheck</h1>
      <p>여기에선 등록되어 있는 전공을 확인하고, 신청할 수 있는 사이트로 이동하는 기능이 있습니다. 현재 등록된 학과는 {{majorList.length}}개.</p>
      <div class="button-wrapper">
        <a
          class="cig-button"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfvKUcKaZdoS9eXbIYlkc_o5ZFTrqHApygLUXJdbinuAiIXVA/viewform"
        >Submit</a>
      </div>
    </div>

    <div class="cig-card">
      <h1>List</h1>
      <div class="button-wrapper">
        <select name="admission-year" v-model="state.searchYear" @change="onChangeSearch">
          <option value>입학년도</option>
          <option v-for="(item, index) in yearList" :key="index" v-on:value="item">{{item}}</option>
        </select>
        <input
          class="major-search-form"
          type="text"
          v-model="state.textInput"
          v-on:input="state.textInput=$event.target.value"
          @keyup="onChangeSearch"
        />
      </div>

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
          <li v-for="(item, index) in refinedMajorList" :key="index">
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
import { defineComponent, reactive, ref, computed, watch } from "vue";

export default defineComponent({
  props: ["checkRouter", "majorList"],
  setup(props) {
    const majorList = ref(computed(() => props.majorList));
    const refinedMajorList = ref([]);
    const yearList = ref([]);

    const state = reactive({
      textInput: "",
      searchYear: ""
    });

    watch(majorList, (majorL, prevMajorL) => {
      refineYearList();
      refineMajorList();
    });

    const refineYearList = () => {
      yearList.value = majorList.value.map(el => el.year);
      yearList.value.filter((el, index) => yearList.value.indexOf(el) == index);
    };

    const refineMajorList = () => {
      refinedMajorList.value = [];
      majorList.value.forEach(el => {
        refinedMajorList.value.push(el);
      });
    };

    const onChangeSearch = () => {
      refineMajorList();
      if (state.textInput) {
        refinedMajorList.value = majorList.value.filter(el =>
          el.major.includes(state.textInput)
        );
      }

      if (state.searchYear) {
        refinedMajorList.value = refinedMajorList.value.filter(
          el => el.year == state.searchYear
        );
      }
    };

    props.checkRouter();
    refineYearList();
    refineMajorList();

    return {
      state,
      majorList,
      refinedMajorList,
      yearList,
      onChangeSearch
    };
  }
});
</script>

<style lang="scss" scoped>
.major-table {
  li {
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      width: 12.5%;

      span {
      }
    }

    .year {
      width: 10%;
    }
    .name {
      width: 15%;
    }
    .total {
      width: 12%;
    }
  }
}

.button-wrapper {
  select{
    width: calc(16% - 8px);
    margin: 0 8px 0 0;
  }

  input {
     width: calc(24% - 8px);
  }
}
</style>
