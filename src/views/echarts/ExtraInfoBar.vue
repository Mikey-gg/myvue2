<!--
@author: chen.liuyong
@since : 2023/02/06
@description: ExtraInfoBar
-->
<template>
  <div class="extraInfoBar">
    <div class="order vertical-base">
      <div class="title">排序</div>
      <div v-for="(item, i) in arr" :key="item.$index">
        {{ i + 1 }}
      </div>
    </div>
    <div class="key vertical-base">
      <div class="title">station</div>
      <div v-for="item in arr" :key="item.$index">
        {{ item.name }}
      </div>
    </div>
    <div id="myChart"></div>
    <div class="value vertical-base">
      <div class="title">count</div>
      <div v-for="item in arr" :key="item.$index">
        {{ item.num }}
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "extraInfoBar",
  created() {},
  mounted() {
    this.buildEcharts();
  },
  data() {
    return {
      arr: [],
    };
  },
  methods: {
    buildEcharts() {
      const myChart = echarts.init(document.getElementById("myChart"));
      const arr = [
        { name: "c1", num: 100 },
        { name: "c2", num: 120 },
        { name: "c3", num: 260 },
        { name: "c4", num: 200 },
        { name: "c5", num: 300 },
        { name: "c6", num: 160 },
        { name: "c7", num: 400 },
        { name: "c8", num: 100 },
        { name: "c9", num: 360 },
      ];
      this.arr = arr;

      const option = {
        grid: { left: 0, right: 0, bottom: 0, top: 32 },
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
          type: "value",
          data: [1, 2, 3, 4, 5],
          axisLine: {
            lineStyle: { color: "rgba(0,0,0,0)" },
          },
          axisLabel: { rotate: -45 },
          axisTick: { show: true },
          splitLine: { show: false },
        },
        yAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
            },
            show: false,
          },
          inverse: false,
          axisTick: { show: true },
          splitLine: { show: false },
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: arr.map((el) => el.num),
            showBackground: true,
            // backgroundStyle: {
            //   color: "#1A3053",
            // },
            barGap: "0%",
            itemStyle: {
              normal: { barBorderRadius: 15 },
              emphasis: {
                barBorderRadius: 15,
              },
            },
            barWidth: 10,
            barMinHeight: 0,
            barBorderRadius: 7,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#1789E6" },
                { offset: 1, color: "#0045B2" },
              ]),
            },
          },
        ],
      };
      const option1 = {
        grid: { left: 10, right: 40, bottom: 10, top: 50, containLabel: true },
        legend: {
          textStyle: { color: "#fff", fontSize: 14 },
          show: true,
          left: "auto",
          right: "auto",
          top: "auto",
          bottom: "auto",
          orient: "",
          itemWidth: 15,
        },
        xAxis: {
          type: "value",
          show: true,
          name: "",
          nameTextStyle: {},
          nameRotate: 0,
          inverse: false,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            textStyle: { color: "#fff", fontSize: 14 },
          },
          axisLine: { show: true, lineStyle: { color: "#fff" } },
          splitLine: { show: false, lineStyle: { color: "#fff" } },
          data: [],
        },
        yAxis: {
          type: "category",
          scale: false,
          splitNumber: 0,
          show: true,
          name: "",
          nameTextStyle: { color: "#fff", fontSize: 14 },
          inverse: false,
          axisLabel: {
            show: true,
            rotate: 0,
            textStyle: { color: "#fff", fontSize: 14 },
          },
          axisLine: { show: true, lineStyle: { color: "#fff" } },
          splitLine: { show: false, lineStyle: { color: "#fff" } },
          data: ["苹果", "三星", "小米", "oppo", "vivo"],
        },
        series: [
          {
            data: [1000, 2229, 3879, 2379, 4079],
            type: "bar",
            barGap: "0%",
            itemStyle: { normal: { barBorderRadius: 5 } },
            label: {
              show: true,
              position: "right",
              distance: 5,
              textStyle: { fontSize: 14, color: "#fff", fontWeight: "normal" },
            },
            barWidth: 10,
            barMinHeight: 0,
          },
        ],
        title: {
          text: "",
          show: true,
          left: "center",
          textStyle: { color: "#FFD700", fontSize: 20, fontWeight: "normal" },
          subtext: "",
          subtextStyle: { color: "#fff", fontWeight: "normal", fontSize: 20 },
        },
        tooltip: { trigger: "item", show: true, textStyle: {} },
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.extraInfoBar {
  height: 100%;
  background-color: gray;
}
.extraInfoBar > div {
  vertical-align: top;
}
#myChart {
  background-color: lightseagreen;
  width: 600px;
  height: 400px;
  display: inline-block;
}
.vertical-base {
  display: inline-block;
  width: 100px;
  background-color: lightcoral;
}
.vertical-base > div {
  height: 41px;
}
.value {
  text-align: right;
}
.order {
  text-align: center;
}
</style>
