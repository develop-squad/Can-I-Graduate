<template>
  <div>
    <div class="test-header">
      <img src="../assets/logo.png" alt />
      <span>
        테스트 버전 (2021-02 기준으로 개발하였습니다.)
        <span class="red-text">[학부생 수강신청 테스트]</span>
      </span>
    </div>
    <div class="test-contents">
      <div class="test-sidebar">설정 있는 사이드 바인데, 더미로 개발</div>
      <div class="test-main">
        <div class="register-header">과목 검색 하는곳</div>
        <div class="register-main">메인 영역</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  }
});
</script>



<style lang="scss" scoped>
.test-header {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
  span {
    font-size: 12px;
    font-weight: bold;
    color: #868686;
    line-height: 17px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 0 10px;

    .red-text {
      color: rgb(146, 18, 41);
      padding: 0;
    }
  }
}
</style>