<!--
@author: chen.liuyong
@since : 2023/02/01
@description: AutoScrollBar
-->
<template>
  <div class="autoScrollBar">
    <div ref="myChart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "autoScrollBar",
  mounted() {
    this.initChart();
  },
  data() {
    return {};
  },
  methods: {
    initChart() {
      let data = [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130];
      let chart = echarts.init(this.$refs.myChart);
      let option = {
        // 区域缩放
        dataZoom: [
          {
            // 第一个 dataZoom 组件
            type: "inside",
            xAxisIndex: 0, // 表示这个 dataZoom 组件控制 第一个 xAxis
            startValue: 0, // 数据窗口范围的起始数值index
            endValue: 5, // 数据窗口范围的结束数值index
          },
        ],
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data,
            type: "bar",
          },
        ],
      };
      option && chart.setOption(option);
      // 设置定时器, 每隔2s判断是否滚动到末尾, 是则重置为初始状态, 否则向前滚动一位
      setInterval(() => {
        if (option.dataZoom[0].endValue == data.length - 1) {
          option.dataZoom[0].endValue = 5;
          option.dataZoom[0].startValue = 0;
        } else {
          option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
          option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
        }
        chart.setOption(option);
      }, 2000);
    },
  },
};
</script>

<style scoped>
.autoScrollBar {
  height: 100%;
}
</style>
