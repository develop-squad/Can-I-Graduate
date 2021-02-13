<template>
  <div>
    <button @click="onClickBtn">Clicked {{ count }} times.</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: ["checkRouter"],
  setup(props) {
    const count = ref(0);
    const onClickBtn = () => {
      // console.log(defineComponent);
      count.value++;
    };

    props.checkRouter();

    return {
      count,
      onClickBtn
    };
  }
});
</script>
