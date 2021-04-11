<template>
  <div class="test-wrapper">
    <div class="test-header">
      <img src="../assets/logo.png" alt />
      <span>
        테스트 버전 (2021-02 기준으로 개발하였습니다.)
        <span class="red-text">[학부생 수강신청 테스트]</span>
      </span>
    </div>
    <div class="test-contents">
      <div class="test-sidebar">
        <a v-on:click="onClickNone">설정</a>
        <a v-on:click="onClickNone">
          메뉴보기
          <i class="material-icons">keyboard_arrow_up</i>
        </a>
      </div>
      <div class="test-main">
        <div class="register-header">
          <div class="register-header__notice">경고 : 세종대학교 수강 신청 시뮬레이션 사이트 입니다.</div>
          <div class="register-header__search">
            <div class="register-header__line">
              <div>
                <span>조직분류</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
              <div>
                <span>년도/학기</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
            </div>
            <div class="register-header__line">
              <div>
                <span>주전공(교직)</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
              <div>
                <span>복수전공(교직)</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
              <div>
                <span>부전공(교직)</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
            </div>
            <div class="register-header__line">
              <div>
                <span>검색구분</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
              </div>
              <div>
                <span>학수번호:</span>
                <select>
                  <option value>- 전체 -</option>
                </select>
                <input type="text" />
              </div>
              <div>
                <span>분반:</span>
                <input type="text" />
              </div>
              <div>
                <button>조회</button>
              </div>
            </div>
          </div>
        </div>
        <div class="register-main">
          <div>
            <div>
              <span>수강대상교과목</span>
            </div>
            <ul>
              <li></li>
            </ul>
          </div>
          <div>
            <div>
              <span>수강신청내역</span>
            </div>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const onClickNone = () => {
      alert("지원하지 않는 기능입니다.");
    };

    const classData = [
      {
        classNum: "000001",
        group: "001",
        major: "컴퓨터공학과",
        name: "테스트전공",
        lang: "",
        point: "3",
        type: "전선",
        grade: "1",
        time: "월09:00~12:00",
        people: "50",
        memo: "",
        online: "",

      }
    ];

    return {
      onClickNone
    };
  }
});
</script>



<style lang="scss" scoped>
.test-wrapper {
  height: calc(100vh - 50px);
  .test-header {
    display: flex;
    width: 100%;
    align-items: center;
    background-color: white;
    img {
      margin: 0 0 -5px;
    }

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

  .test-contents {
    display: flex;
    height: 100%;

    .test-sidebar {
      display: flex;
      flex-direction: column;
      background-color: #eaeaea;
      align-items: center;

      a {
        cursor: pointer;
        padding: 9px 0;
        width: 100%;
        writing-mode: vertical-lr;
        background-color: #adb6cc;
        font-size: 14px;
        text-align: center;

        &:nth-child(1) {
          border-bottom: 1px solid white;
        }

        &:nth-child(2) {
          padding: 4px 0;
        }

        i {
          margin: 10px 0 0;
          font-size: 20px;
        }
      }
    }

    .test-main {
      width: 100%;
      background-color: white;
      color: black;
      .register-header {
        display: flex;
        flex-direction: column;

        &__notice {
          width: 100%;
          font-size: 13px;
          background-color: #c30e2e;
          padding: 4px 0;
          color: white;
          margin: 0 0 8px;
        }

        &__search {
          background-color: #f8f8f8;
          border-top: 1px solid #dedede;
          border-bottom: 1px solid #dedede;
        }

        &__line {
          display: flex;
        }
      }
    }
  }
}
</style>