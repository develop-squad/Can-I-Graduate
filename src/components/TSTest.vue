<template>
  <div>
    <button @click="onClickBtn">Clicked {{ count }} times.</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);
    const onClickBtn = () => {
      count.value++;
    };

    return {
      count,
      onClickBtn
    };
  }
});
</script>

