<!--
@author: chen.liuyong
@since : 2022/10/14
@description: AutoLabel
-->
<template>
  <div class="auto-label">
    <div id="myChart" style="width: 600px; height: 400px"></div>
    <button @click="btnClick" class="btn-click">更新数据</button>
    <div class="textarea-wrapper">
      <textarea v-model="obj"></textarea>
      <textarea v-model="caseObj"></textarea>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "AutoLabel",
  created() {},
  mounted() {
    this.test();
  },
  data() {
    return {
      obj: `{
  "data": [
     [0, 21.68, 3.91, 2.94, 5.49, 21.23, 154.42, 4.88, 4.91, 1.02],
     [0, 4.51, 2.8, 4.24, 3.42, 33.93, 49.44, 2.16, 2.11, 0.38]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}`,
caseObj: `测试替代用例
{
  "data": [
     [1, 2, 3, 4, 5, 6, 7],
     [1.9, 2, 2.8, 4.2, 4.5, 6.2, 7.3]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7]
}

{
  "data": [
     [100, 20, 3, 310, 500, 28, 7],
     [130, 21, 2.8, 250, 504.5, 6.2, 7.3]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7]
}

{
  "data": [
     [1090, 20, 3, 310, 500, 28, 7],
     [130, 21, 2.8, 250, 504.5, 6.2, 7.3]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7]
}

{
  "data": [
     [0, 21.68, 3.91, 2.94, 5.49, 21.23, 154.42, 4.88, 4.91, 1.02],
     [0, 4.51, 2.8, 4.24, 3.42, 33.93, 49.44, 2.16, 2.11, 0.38]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

{
  "data": [
     [0, 21.68, 3.91, 2.94, 5.49, 21.23, 1514.42, 4.88, 4.91, 1.02],
     [0, 4.51, 2.8, 4.24, 3.42, 33.93, 49.44, 2.16, 2.11, 0.38]
  ],
  "xAxis": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
`
    };
  },
  methods: {
    btnClick() {
      this.test();
    },
    bindObj(obj) {
      try {
        return JSON.parse(obj);
      } catch (error) {
        console.log("error", error);
        alert("JSON解析错误")
      }
      return {};
    },
    test() {
      let index = 0;
      let arr = [
        [0, 21.68, 3.91, 2.94, 5.49, 21.23, 154.42, 4.88, 4.91, 1.02],
        [0, 4.51, 2.8, 4.24, 3.42, 33.93, 49.44, 2.16, 2.11, 0.38],
      ];
      arr = this.bindObj(this.obj).data;
      const xAxis = this.bindObj(this.obj).xAxis;
      const myChart = echarts.init(document.getElementById("myChart"));
      const option = {
        title: {
          show: true,
          text: "",
          left: "center",
          textStyle: {
            color: "#73EAF7",
            fontSize: 30,
          },
        },
        tooltip: {},
        legend: { data: [] },
        xAxis: {
          data: xAxis,
          axisLine: {
            lineStyle: { color: "black" },
          },
          axisLabel: { rotate: -45 },
          axisTick: { show: true },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "black",
            },
            show: true,
          },
          axisTick: { show: true },
          splitLine: { show: false },
          // min: 30
          min: "dataMin"
        },
        series: [
          {
            data: arr[0],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "#12577F",
              opacity: 0.5,
            },
            label: {
              show: true,
              color: "white",
              fontWeight: "bold",
            },
            itemStyle: {
              color: "black", //拐点颜色
              borderColor: "white", //  拐点边框颜色
              borderWidth: 0, //  拐点边框宽度
              shadowColor: "white", //  阴影颜色
              shadowBlur: 2, //  阴影渐变范围控制
            },
            symbol: "circle",
            symbolSize: 7,
            lineStyle: {
              color: "black",
            },
          },
          {
            data: arr[1],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "#12577F",
              opacity: 0.5,
            },
            label: {
              show: true,
              color: "pink",
            },
            itemStyle: {
              color: "pink", //拐点颜色
              borderColor: "white", //  拐点边框颜色
              borderWidth: 0, //  拐点边框宽度
              shadowColor: "white", //  阴影颜色
              shadowBlur: 2, //  阴影渐变范围控制
            },
            // symbol: "circle",
            // symbolSize: 5,
            lineStyle: {
              color: "pink",
            },
            labelLayout: function () {
              const prev = arr[0][index];
              const cur = arr[1][index];
              const abs = Math.abs(cur - prev);
              const max = Math.max(...arr[0], ...arr[1]) || 0;
              const min = Math.min(...arr[0], ...arr[1]) || 0;
              const fontGap = 12;
              const gap = (max - min) / 20;
              let boundry = gap;
              gap > 16 ? (boundry = 16) : gap < 10 ? (boundry = 10) : 0;
              let k = abs / (max - min);
              let dy = 0,
                dx = 0;
              if (abs !== 0 && abs < gap) {
                dx = 20;
                cur - prev < 0 ? (dy = fontGap - k) : (dy = k - fontGap);
              }
              index++;
              return {
                dy: dy,
                // dx: dx,
              };
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.auto-label {
  background-color: gray;
}
.btn-click {
  display: block;
}
.textarea-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
textarea {
  height: 200px;
  width: 49vw;
  /* display: block; */
  margin-bottom: 10px;
  padding-bottom: 50px;
}
</style>
