<template>
  <div>
    <div class="contents-card contents-title">
      <h1>RegisterTest</h1>
      <div class="contents-title__right">
        <a href="/test">체험하기</a>
      </div>

      <div class="contents-title__content">
        <p>수강신청을 시뮬레이션 해볼 수 있는 기능입니다.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: ["checkRouter"],
  setup(props) {
    const state = reactive({});

    props.checkRouter();

    return {
      state
    };
  }
});
</script>

<style lang="scss" scoped>
.contents-card {
  background-color: #28273f;
  padding: 20px;
  margin: 0 0 15px;

  h2 {
    text-align: left;
  }

  .major-search-form {
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid black;
  }
}

.contents-title {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h1 {
    margin: 0;
  }

  & &__right {
    display: flex;
    a {
      text-decoration: none;
      color: black;
      padding: 8px 10px;
      background-color: white;
      height: fit-content;
    }
  }

  & &__content {
    width: 100%;
    p {
      text-align: left;
    }
  }
}

.major-search-wrapper {
  display: flex;
  padding: 0 0 20px 0;
}

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
</style>
