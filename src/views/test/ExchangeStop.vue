<!--
@author: chen.liuyong
@since : 2022/11/02
@description: 使用动画换位置并暂停
-->
<template>
  <div class="exchangeStop">
    <button @click="btnClick" class="btn-click">按钮</button>
    <div class="single1" :class="[item1]"></div>
    <div class="single2" :class="[item2]"></div>
    <div class="single3" :class="[item3]"></div>
  </div>
</template>

<script>
export default {
  name: "exchangeStop",
  created() {},
  data() {
    return {
      item1: "",
      item2: "",
      item3: "",
      index: 0,
    };
  },
  methods: {
    btnClick() {
      const map = ["position1", "position2", "position3"];
      map.forEach((item, index) => {
        const curIndex = ((this.index + index + 1) % 3) + 1;
        this["item" + curIndex] = item;
      });
      this.index++;
    },
  },
};
</script>

<style scoped>
.exchangeStop {
  height: 100%;
  position: relative;
}
.exchangeStop > div {
  height: 200px;
  width: 200px;
  position: absolute;
  transition: 1s all;
  background-color: gray;
  margin-right: 30px;
}
.position1 {
  left: 30px;
  top: 30px;
}
.position2 {
  left: 330px;
  top: 30px;
  transform: scale(0.8);
}
.position3 {
  left: 630px;
  top: 30px;
}
</style>
