<template>
  <div class="dashboard">
    <section class="upload-panel">
      <h1>Excel File Upload</h1>
      <p>학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회 - 성적엑셀다운로드</p>
      <button>Upload</button>
    </section>
    <section class="requirement-panel">
      <h1>Graduate Requirement</h1>
      <div class="inputs">
        <div class="input">
          <label for="req1"></label>
          <input name="req1" type="text" />
        </div>
        <div class="input">
          <label for="req2"></label>
          <input name="req2" type="text" />
        </div>
        <div class="input">
          <label for="req3"></label>
          <input name="req3" type="text" />
        </div>
        <div class="input">
          <label for="req4"></label>
          <input name="req4" type="text" />
        </div>
        <div class="input">
          <label for="req5"></label>
          <input name="req5" type="text" />
        </div>
      </div>
    </section>
    <section class="my-credit-panel">
      <h1>this is my-credit panel</h1>
    </section>
    <section class="graph-panel">
      <h1>this is graph panel</h1>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);
    const onClickBtn = () => {
      // console.log(defineComponent);
      count.value++;
    };

    return {
      count,
      onClickBtn,
    };
  },
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
      display: grid;
      grid-template-columns: repeat(3, minmax(50px, 1fr));
      grid-template-rows: 1fr 1fr;
      .input {
        input {
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
  }

  .upload-panel {
    grid-area: upload-panel;
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