<template>
  <!-- 定义标签 -->
  <div
    id="main"
    ref="echart"
    :style="{
      width: width,
      height: height,
    }"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import icon1 from '@/assets/images/pointGreen.png'
import icon2 from '@/assets/images/pointYellow.png'
import icon3 from '@/assets/images/ponitRed.png'
import icon4 from '@/assets/images/ponitRed.png'
export default {
  name: "DragPointer",
  created() {
    console.log("222222");
  },
  data() {
    return {
      myObserver: null, //resize监听器
      timer: null, //定时器
      myEchart: null, //echart实例
    };
  },
  props: {
    width: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "300px",
    },
    // options: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       xAxis: {
    //         type: "category",
    //         data: [
    //           "星期一",
    //           "星期二",
    //           "星期三",
    //           "星期四",
    //           "星期五",
    //           "星期六",
    //           "星期日",
    //         ],
    //       },
    //       yAxis: {
    //         type: "value",
    //       },
    //       series: [
    //         {
    //           id: "canMove",
    //           xAxisIndex: 0,
    //           yAxisIndex: 0,
    //           data: [10, , , , , , 10],
    //           type: "line",
    //         },
    //       ],
    //     };
    //   },
    // },
  },

  mounted() {
    // this.myObserver = new ResizeObserver((entries) => {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //   }
    //   this.timer = setTimeout(this.loadEchart(), 50);
    // });
    // this.myObserver.observe(this.$refs.echart);
    // this.test();
    // this.stackBar();
    // this.mulBarColrs();
    // this.mulLines();
    this.selfTooltip();
    // this.barAndLine();
  },

  //   beforeDestory() {
  //     clearTimeout(this.timer);
  //     this.myObserver.unobserve(this.$refs.echart);
  //   },

  methods: {
    test() {
      let base = +new Date(2016, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let valueBase = Math.random() * 300;
      let valueBase2 = Math.random() * 50;
      let data = [];
      let data2 = [];
      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay));
        var dayStr = [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
        ].join("-");
        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
        valueBase <= 0 && (valueBase = Math.random() * 300);
        data.push([dayStr, valueBase]);
        valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
        data2.push([dayStr, valueBase2]);
      }
      const option = {
        title: {
          left: "center",
          text: "Tootip and dataZoom on Mobile Device",
        },
        legend: {
          top: "bottom",
          data: ["Intention"],
        },
        tooltip: {
          triggerOn: "click",
          position: function (pt) {
            return [pt[0], 130];
          },
        },
        // toolbox: {
        //   left: "center",
        //   itemSize: 25,
        //   top: 55,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: "none",
        //     },
        //     restore: {},
        //   },
        // },
        xAxis: {
          type: "time",
          //   axisPointer: {
          //     value: "2016-10-7",
          //     snap: true,
          //     lineStyle: {
          //       color: "#7581BD",
          //       width: 6,
          //     },
          //     label: {
          //       show: true,
          //       formatter: function (params) {
          //         return echarts.format.formatTime("yyyy-MM-dd", params.value);
          //       },
          //       backgroundColor: "#7581BD",
          //     },
          //     handle: {
          //       show: true,
          //       color: "#7581BD",
          //     },
          //   },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisPointer: {
            // value: "30",
            // snap: true,
            lineStyle: {
              color: "#7581BD",
              width: 6,
            },
            label: {
              show: true,
              backgroundColor: "#7581BD",
            },
            handle: {
              show: true,
              color: "red",
              size: 20,
            },
            show: true,
            // type: 'line',
            value: "30",
            label: "cly",
            z: 1000,
          },
          //   axisTick: {
          //     inside: true,
          //   },
          splitLine: {
            show: false,
          },
          axisLabel: {
            inside: true,
            formatter: "{value}\n",
          },
          z: 10,
        },
        grid: {
          top: 110,
          left: 15,
          right: 15,
          height: 160,
        },
        dataZoom: [
          {
            type: "inside",
            throttle: 50,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              color: "#0770FF",
            },
            stack: "a",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(58,77,233,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(58,77,233,0.3)",
                },
              ]),
            },
            data: data,
          },
          {
            name: "Fake Data",
            type: "line",
            smooth: true,
            stack: "a",
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              color: "#F2597F",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(213,72,120,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(213,72,120,0.3)",
                },
              ]),
            },
            data: data2,
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
    stackBar() {
      let option = {
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F"],
        },
        yAxis: {},
        series: [
          {
            data: [1, 2, 0, 0, 1, 1],
            type: "bar",
            stack: "x",
            label: {
              show: true,
            },
          },
          {
            data: [2, 1, 1, 1, 0, 1],
            type: "bar",
            stack: "x",
            label: {
              show: true,
            },
          },
          {
            data: [1, 0, 1, 0, 1, 1],
            type: "bar",
            stack: "x",
            label: {
              show: true,
            },
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
    mulBarColrs() {
      const colors = ["red", "green"];
      let option = {
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F"],
        },
        yAxis: {},
        series: [
          {
            data: [1, 2, 0, 0, 1, 1],
            type: "bar",
            label: {
              show: true,
            },
            itemStyle: {
              color: function (params) {
                if (params.dataIndex == 1 || params.dataIndex == 4) {
                  return colors[0];
                } else {
                  return colors[1];
                }
              },
            },
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
    mulLines() {
      const colors = ["red", "green"];
      let option = {
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F"],
        },
        legend: {
          textStyle: { color: "black", fontSize: 16 },
          show: true,
          left: "center",
          top: 0,
          bottom: "auto",
          orient: "horizontal",
          itemWidth: 15,
        },
        yAxis: {},
        tooltip: {
          show: true,
          trigger: "axis",
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
        series: [
          {
            data: [1, 2, 0, 0, 1, 1],
            type: "line",
            name: "111",
            label: {
              show: true,
            },
          },
          {
            data: [1, 2, 0, 0, 1, 1],
            type: "line",
            name: "222",
            label: {
              show: true,
            },
          },
          {
            data: [1, 2, 0, 0, 1, 1],
            type: "line",
            name: "333",
            label: {
              show: true,
            },
          },
          {
            data: [1, 2, 0, 10, 1, 13],
            type: "line",
            name: "444",
            label: {
              show: true,
            },
          },
          {
            data: [1, 2, 0, 10, 1, 13],
            type: "line",
            name: "555",
            label: {
              show: true,
            },
          },
          {
            data: [1, 2, 0, 10, 1, 13],
            type: "line",
            name: "666",
            label: {
              show: true,
            },
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
    barAndLine() {
      const colors = ["red", "green"];
      let option = {
        xAxis: {
          data: ["A", "B", "C", "D", "E", "F"],
        },
        legend: {
          textStyle: { color: "black", fontSize: 16 },
          show: true,
          left: "center",
          top: 0,
          bottom: "auto",
          orient: "horizontal",
          itemWidth: 15,
        },
        yAxis: {
          label: {
            show: true,
            //
          },
          min: "dataMin",
        },
        series: [
          {
            data: [97, 97, 97, 97, 97, 97],
            type: "line",
            name: "111",
            label: {
              show: true,
            },
          },
          {
            data: [95, 96, 99, 94, 93, 92],
            type: "bar",
            name: "222",
            label: {
              show: true,
            },
          },
          {
            data: [92, 99, 93, 96, 98, 97],
            type: "bar",
            name: "333",
            label: {
              show: true,
            },
          },
        ],
      };
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
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
      const myEchart = echarts.init(this.$refs.echart);
      myEchart.setOption(option);
    },
    // loadEchart() {
    //   if (this.myEchart) {
    //     //如果echart已经初始化过，需要销毁，否则会报错：重复初始化
    //     this.myEchart.dispose();
    //   }
    //   // 初始化
    //   // this.myEchart = echarts.init(document.getElementById('main'));
    //   this.myEchart = echarts.init(this.$refs.echart);
    //   // 画图
    //   this.myEchart.setOption(this.options, true);
    //   this.moveLine();
    // },

    // moveLine() {
    //   let enableMove = false; //折线是否可移动
    //   let _curSer = null; //点击的server

    //   let myEchart = this.myEchart;
    //   this.myEchart.on("mousedown", function (params) {
    //     //点击的线条的下标 seriesIndex
    //     let seriesIndex = params.seriesIndex;

    //     //重要!  那些线可以移动
    //     enableMove = params.seriesId === "canMove" ? true : false;
    //     _curSer = myEchart.getOption().series[seriesIndex];
    //   });

    //   myEchart._zr.on("mousemove", function (params) {
    //     params.event.preventDefault();
    //     if (!enableMove) {
    //       return;
    //     }

    //     let position = [params.offsetX, params.offsetY];

    //     let res = myEchart.convertFromPixel(
    //       { xAxisIndex: 0, yAxisIndex: 0 },
    //       position
    //     );
    //     let changeData = _curSer.data;
    //     //获取点击点位
    //     let changeIndex = res[0];

    //     if (changeIndex == -0) {
    //       changeIndex = 0;
    //     }

    //     if (changeData[changeIndex]) {
    //       changeData[changeIndex] = Number(res[1].toFixed(2)); //连续拖动
    //     }
    //     myEchart.setOption({
    //       series: [
    //         {
    //           id: _curSer.id,
    //           data: changeData,
    //         },
    //       ],
    //     });

    //     //更新站点数据集合
    //     // station.planData.data[changeIndex].value = changeData[changeIndex][1];
    //     // that.stationDataList[index] = station;
    //   });

    //   this.myEchart._zr.on("mouseup", function (params) {
    //     if (!enableMove) {
    //       return false;
    //     }
    //     enableMove = false;
    //     _curSer = null; //清空down状态
    //   });
    // },

    // push() {},
  },
};
</script>
<style>
#main {
  margin-left: 200px;
}
</style>
