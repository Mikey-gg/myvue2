<!--
@author: wang.weili
@since : 2022/08/26
@description: 数据驾驶舱-良率柱线图
-->
<template>
  <div class="divOp">
    <h3 class="">{{ title }}</h3>
    <div class="chart-position">
      <div ref="echart" class="chart-box"></div>
    </div>
    <p class="center info">{{ info }}</p>
    <div class="left" @click="prev"></div>
    <div class="right" @click="next"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chartBox from "./chart.vue";
import icon1 from "@/assets/images/pointGreen.png";
import icon2 from "@/assets/images/pointYellow.png";
import icon3 from "@/assets/images/ponitRed.png";
import icon4 from "@/assets/images/ponitRed.png";

const conutdown = 10;
export default {
  name: "outputManpower",
  components: {
    chartBox,
  },
  created() {
    // this.init();
    this.options = {
      grid: {
        top: 80,
        bottom: 30,
        left: 40,
        right: 45,
      },
      tooltip: {
        trigger: "axis",
        // todo
        formatter: function (params) {
          const month = "<div>" + params[0].axisValue + "</div>";
          const info1 =
            '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color: ' +
            params[0].color +
            '"></span>' +
            params[0].seriesName +
            "：" +
            params[0].value +
            " 台</div>";
          const info2 =
            '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color: ' +
            params[1].color +
            '"></span>' +
            params[1].seriesName +
            "：" +
            params[1].value +
            " 台</div>";
          const info3 =
            '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color:' +
            params[2].color +
            '"></span>' +
            params[2].seriesName +
            "：" +
            params[2].value +
            " %</div>";
          return month + info1 + info2 + info3;
        },
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: { show: false },
      legend: {
        // icon: 'round',
        itemWidth: 17,
        itemHeight: 17,
        left: -5,
        top: 15,
        textStyle: {
          color: "#999999",
        },
        data: [
          // 自定义图例图标
          { name: "完好", icon: "image://" + icon1 },
          { name: "故障", icon: "image://" + icon2 },
          { name: "完好率", icon: "image://" + icon3 },
          { name: "平均值", icon: "image://" + icon4 },
        ],
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            show: false,
          },
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "(台)",
          min: 0,
          max: 1000,
          axisLabel: {
            formatter: "{value}",
            color: "#666666",
          },
          splitLine: {
            // 网格线
            lineStyle: {
              type: "dashed", // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, // 隐藏或显示
          },
        },
        {
          type: "value",
          name: "",
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: "{value} %",
            color: "#666666",
          },
          splitLine: {
            // 网格线
            lineStyle: {
              color: "rgba(33, 43, 66, 0.9)",
              type: "dashed", // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, // 隐藏或显示
          },
        },
      ],
      series: [
        {
          name: "完好",
          type: "bar",
          barWidth: 4, // 柱图宽度
          barGap: "100%",
          itemStyle: {
            color: "#274AC9",
          },
          data: [400, 200, 700, 500, 500, 500, 700, 500, 500, 500, 550, 500],
        },
        {
          name: "故障",
          type: "bar",
          barWidth: 4, // 柱图宽度
          barGap: "100%",
          itemStyle: {
            color: "#377DFF",
          },
          data: [600, 820, 620, 800, 550, 550, 630, 800, 550, 550, 800, 550],
        },
        {
          name: "完好率",
          type: "line",
          yAxisIndex: 1,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: "#ffc455", // 折线的颜色
              width: "3", // 折线粗细
            },
          },
          itemStyle: {
            borderColor: "white",
            borderWidth: 2,
            color: "#ffc455",
            emphasis: {
              borderColor: "#ffc455", // 拐点边框颜色
              color: "white", // hover拐点颜色定义
              borderWidth: 16,
            },
          },
          data: [70, 50, 73, 65, 65, 65, 82, 50, 65, 65, 82, 75],
        },
        {
          name: "平均值",
          symbol: "none",
          markLine: {
            symbol: "none",
            data: [{ type: "average", yAxis: 60, name: "及格线" }],
            lineStyle: {
              color: "#fd4348",
              width: 1,
            },
            emphasis: {
              // 高亮样式
              lineStyle: {
                width: 1,
              },
            },
            label: {
              normal: {
                formatter: "", // 这儿设置安全基线
              },
            },
          },
          type: "line",
          lineStyle: {
            color: "#fd4348",
            type: "dashed",
          },
        },
      ],
    };
    // this.timerData = setInterval(() => {
    //   let division = "ALPHA组装事业部";
    //   this.$http.axios
    //     .post(`${this.$http.driver_url}mesBoardExi/getMesRepairWipData?division=${division}`, null, {
    //       headers: {
    //         token: "",
    //       },
    //     })
    //     .then((res) => {
    //       this.allData = res.DATA || [];
    //     });
    // }, 1800000);
  },
  mounted() {
    // this.dom = echarts.init(this.$refs.dom);
    // this.dom.setOption(this.options);
    // window.addEventListener("resize", this.resize);
    this.selfTooltip();
  },
  beforeDestroy() {
    // this.$root.charts = this.$root.charts.filter(el=>el._uid!=this._uid);
    window.removeEventListener("resize", this.resize);
  },
  data() {
    return {
      dom: null,
      curIndex: 0,
      title: "",
      info: "",
      chartData: [],
      options: {},
      timer: null,
      timerData: null,
      lefttime: conutdown,
      allData: [],
      stopFlag: false,
      curRotate: "",
      fixedFactoryList: ["第一工厂", "第二工厂", "越南工厂"],
    };
  },
  beforeLeave() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    init() {
      let division = "ALPHA组装事业部";
      this.$http.axios
        .post(
          `${this.$http.driver_url}mesBoardExi/getMesRepairWipData?division=${division}`,
          null,
          {
            headers: {
              token: "",
            },
          }
        )
        .then((res) => {
          this.allData = res.DATA || [];

          // after getting the data, begin the circulation.
          this.switchData();
          this.swipe();
        });
    },
    swipe() {
      // by the index to swith our data here, every second will use it
      this.timer = setInterval(() => {
        // countdown over, switch to next line
        if (!this.stopFlag) {
          this.lefttime--;
        }
        if (this.lefttime < 0) {
          this.lefttime = conutdown;
        }
        if (this.lefttime == 0) {
          this.next();
          this.switchData();
        }
      }, 1000);
    },
    prev() {
      if (this.curIndex <= 0) {
        this.curIndex = (this.allData.length || 1) - 1;
      } else {
        this.curIndex--;
      }
      this.switchData();
    },
    next() {
      if (this.curIndex >= this.allData.length - 1) {
        this.curIndex = 0;
      } else {
        this.curIndex++;
      }
      this.switchData();
    },
    switchData() {
      // this.data = this.allData[this.curIndex];
      // var xlist = [];
      // var ylist = [];
      // for (var i = 0; i < this.data.data.length; i++) {
      //   xlist[i] = this.data.data[i].project;
      //   ylist[i] = this.data.data[i].wip_qty;
      // }
      // this.options.xAxis.data = xlist;
      // this.options.series[0].data = ylist;
      // this.curRotate = this.options.title.text = this.data.factory;
      this.lefttime = conutdown;
      this.dom.setOption(this.options);
    },
    selfTooltip() {
      const option = {
        grid: {
          top: 80,
          bottom: 30,
          left: 40,
          right: 45,
        },
        tooltip: {
          trigger: "axis",
          // todo
          formatter: function (params) {
            const month = "<div>" + params[0].axisValue + "</div>";
            const info1 =
              '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color: ' +
              params[0].color +
              '"></span>' +
              params[0].seriesName +
              "：" +
              params[0].value +
              " 台</div>";
            const info2 =
              '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color: ' +
              params[1].color +
              '"></span>' +
              params[1].seriesName +
              "：" +
              params[1].value +
              " 台</div>";
            const info3 =
              '<div><span style="display:inline-block;border-radius:8px;margin-right:5px;width: 8px;height:8px;background-color:' +
              params[2].color +
              '"></span>' +
              params[2].seriesName +
              "：" +
              params[2].value +
              " %</div>";

            return month + info1 + info2 + info3;
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: { show: true },
        legend: {
          // icon: 'round',
          itemWidth: 17,
          itemHeight: 17,
          left: -5,
          top: 15,
          textStyle: {
            color: "#999999",
          },
          data: [
            // 自定义图例图标
            { name: "完好", icon: "image://" + icon1 },
            { name: "故障", icon: "image://" + icon2 },
            { name: "完好率", icon: "image://" + icon3 },
            { name: "平均值", icon: "image://" + icon4 },
          ],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              show: false,
            },
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(台)",
            min: 0,
            max: 1000,
            axisLabel: {
              formatter: "{value}",
              color: "#666666",
            },
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed", // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true, // 隐藏或显示
            },
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value} %",
              color: "#666666",
            },
            splitLine: {
              // 网格线
              lineStyle: {
                color: "rgba(33, 43, 66, 0.9)",
                type: "dashed", // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true, // 隐藏或显示
            },
          },
        ],
        series: [
          {
            name: "完好",
            type: "bar",
            barWidth: 4, // 柱图宽度
            barGap: "100%",
            itemStyle: {
              color: "#274AC9",
            },
            data: [400, 200, 700, 500, 500, 500, 700, 500, 500, 500, 550, 500],
          },
          {
            name: "故障",
            type: "bar",
            barWidth: 4, // 柱图宽度
            barGap: "100%",
            itemStyle: {
              color: "#377DFF",
            },
            data: [600, 820, 620, 800, 550, 550, 630, 800, 550, 550, 800, 550],
          },
          {
            name: "完好率",
            type: "line",
            yAxisIndex: 1,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#ffc455", // 折线的颜色
                width: "3", // 折线粗细
              },
            },
            itemStyle: {
              borderColor: "white",
              borderWidth: 2,
              color: "#ffc455",
              emphasis: {
                borderColor: "#ffc455", // 拐点边框颜色
                color: "white", // hover拐点颜色定义
                borderWidth: 16,
              },
            },
            data: [70, 50, 73, 65, 65, 65, 82, 50, 65, 65, 82, 75],
          },
          {
            name: "平均值",
            symbol: "none",
            markLine: {
              symbol: "none",
              data: [{ type: "average", yAxis: 60, name: "及格线" }],
              lineStyle: {
                color: "#fd4348",
                width: 1,
              },
              emphasis: {
                // 高亮样式
                lineStyle: {
                  width: 1,
                },
              },
              label: {
                normal: {
                  formatter: "", // 这儿设置安全基线
                },
              },
            },
            type: "line",
            lineStyle: {
              color: "#fd4348",
              type: "dashed",
            },
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
  },
};
</script>
<style>
.divOp .chart-box {
  height: 470px;
  width: 550px;
  left: 45px;
}
</style>
<style scoped>
.divOp {
  /* background-image: url("../../assets/images/一级效果图.png");
  background-size: 100% 100%; */
  width: 550px;
  height: 470px;
  position: relative;
}
.chart-position {
  /* position: absolute; */
  width: 550px;
  height: 470px;
}
.rotate-position {
  position: absolute;
  top: 0;
  left: 0;
}
.rotate-wrapper {
  position: relative;
}
.rotate-wrapper > div {
  /* background-image: url("../../assets/images/rotatePicture.png"); */
  background-size: 100% 100%;
  height: 153.005px;
  width: 224.006px;
  position: absolute;
}
.left {
  background-image: url("../../assets/images/arrow.png");
  background-size: 100% 100%;
  width: 29.997px;
  height: 29.997px;
  position: absolute;
  top: 230px;
  left: 5px;
}
.right {
  background-image: url("../../assets/images/arrow.png");
  background-size: 100% 100%;
  width: 29.997px;
  height: 29.997px;
  transform: rotate(180deg);
  position: absolute;
  top: 230px;
  right: 5px;
}
/* * {
  background: transparent;
} */
.info {
  color: white;
  font-weight: bold;
  font-size: 15.994px;
  padding: 0 60px;
  text-align: left;
  position: absolute;
  left: 40px;
  width: 550px;
  height: 470px;
  display: flex;
  justify-content: center;
}
.startImg {
  animation: turn 1s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.chart-box {
  min-height: 180px;
}
</style>
