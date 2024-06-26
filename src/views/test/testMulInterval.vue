<!--
@author: chen.liuyong
@since : 2022/10/24
@description: testMulInterval
-->
<template>
  <div class="test-mul-interval"></div>
</template>

<script>
export default {
  name: "testMulInterval",
  created() {
    this.test1();
    this.test2();
  },
  data() {
    return {
      timer1: null,
      timer2: null,
    };
  },
  methods: {
    test1() {
      this.timer1 = setInterval(() => {
        console.log(3333);
      }, 3000);
    },
    test2() {
      this.timer2 = setInterval(() => {
        console.log(2222);
      }, 2000);
    },
  },
};
</script>
<style scoped>
.test-mul-interval {
  height: 100%;
}
</style>
