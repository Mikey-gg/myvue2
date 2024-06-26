<!--
@author: chen.liuyong
@since : 2023/02/16
@description: 数值范围
-->
<template>
  <div class="numRange">
    <button @click="switchSmall">{{ smallText }}</button>

    <div class="div-wrapper" title="点击中括号可切换包含关系">
      <div class="input-wrapper">
        <div v-show="this.smallText == '无穷小'">
          <span class="small-aspect" @click="containSmall"
            >[&nbsp;&nbsp;&nbsp;</span
          >
          <input class="num-range-input" type="number" v-model="value1" /><span
            class="small-aspect"
            @click="containSmall"
            >]</span
          >
        </div>
        <span v-show="this.smallText !== '无穷小'">无穷小</span>
      </div>
    </div>
    ~
    <div class="div-wrapper" title="点击中括号可切换包含关系">
      <div class="input-wrapper">
        <div v-show="this.bigText == '无穷大'">
          <span class="big-aspect" @click="containBig"
            >[&nbsp;&nbsp;&nbsp;</span
          >
          <input class="num-range-input" type="number" v-model="value2" /><span
            class="big-aspect"
            @click="containBig"
            >]</span
          >
        </div>
        <span v-show="this.bigText !== '无穷大'">无穷大</span>
      </div>
    </div>
    <button @click="switchBig">{{ bigText }}</button>
    <button @click="finishInput">完成</button>
  </div>
</template>

<script>
export default {
  name: "numRange",
  created() {},
  data() {
    return {
      value1: 0,
      value2: 0,
      smallText: "无穷小",
      bigText: "无穷大",
      
    };
  },
  methods: {
      finishInput() {
        const small = this.smallText == '无穷小' ? this.value1 : -Infinity;
        const big = this.bigText == '无穷大' ? this.value2 : Infinity;
        console.log('small',small);
        console.log('big',big);
      },
    containSmall() {
      const doms = document.querySelectorAll(".numRange .small-aspect");
      doms.forEach((item) => {
        item.classList.toggle("bold-bracket");
      });
    },
    containBig() {
      const doms = document.querySelectorAll(".numRange .big-aspect");
      doms.forEach((item) => {
        item.classList.toggle("bold-bracket");
      });
    },
    switchSmall() {
      const text = ["无穷小", "数值"];
      if (this.smallText === "无穷小") this.smallText = "数值";
      else this.smallText = "无穷小";
    },
    switchBig() {
      const text = ["无穷大", "数值"];
      if (this.bigText === "无穷大") this.bigText = "数值";
      else this.bigText = "无穷大";
    },
  },
};
</script>

<style scoped>
.numRange {
  height: 100%;
}
.div-wrapper {
  display: inline-block;
}
.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.num-range-input {
  flex: auto;
  width: 50px;
  text-align: center;
}
.bold-bracket {
  font-weight: bold;
  font-size: 20px;
}
</style>
