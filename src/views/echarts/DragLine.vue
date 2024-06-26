<template>
  <!-- 定义标签 -->
  <div
    id="main"
    ref="echart"
    :style="{
      width: width,
      height: height,
    }"
  >
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'echarts',
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
      default: '300px',
    },
    height: {
      type: String,
      default: '300px',
    },
    options: {
      type: Object,
      default: () => {
        return {
          xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              id: 'canMove',
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: [10, , , , , , 10],
              type: 'line',
            },
          ],
        };
      },
    },
  },

  mounted() {
    this.myObserver = new ResizeObserver((entries) => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.loadEchart(), 50);
    });
    this.myObserver.observe(this.$refs.echart);
  },

  beforeDestory() {
    clearTimeout(this.timer);
    this.myObserver.unobserve(this.$refs.echart);
  },

  methods: {
    loadEchart() {
      if (this.myEchart) {
        //如果echart已经初始化过，需要销毁，否则会报错：重复初始化
        this.myEchart.dispose();
      }
      // 初始化
      // this.myEchart = echarts.init(document.getElementById('main'));
      this.myEchart = echarts.init(this.$refs.echart);
      // 画图
      this.myEchart.setOption(this.options, true);
      this.moveLine();
    },

    moveLine() {
      let enableMove = false; //折线是否可移动
      let _curSer = null; //点击的server

      let myEchart = this.myEchart;
      this.myEchart.on('mousedown', function (params) {
        //点击的线条的下标 seriesIndex
        let seriesIndex = params.seriesIndex;

        //重要!  那些线可以移动
        enableMove = params.seriesId === 'canMove' ? true : false;
        _curSer = myEchart.getOption().series[seriesIndex];
      });

      myEchart._zr.on('mousemove', function (params) {
        params.event.preventDefault();
        if (!enableMove) {
          return;
        }

        let position = [params.offsetX, params.offsetY];

        let res = myEchart.convertFromPixel({ xAxisIndex: 0, yAxisIndex: 0 }, position);
        let changeData = _curSer.data;
        //获取点击点位
        let changeIndex = res[0];

        if (changeIndex == -0) {
          changeIndex = 0;
        }

        if (changeData[changeIndex]) {
          changeData[changeIndex] = Number(res[1].toFixed(2)); //连续拖动
        }
        myEchart.setOption({
          series: [
            {
              id: _curSer.id,
              data: changeData,
            },
          ],
        });

        //更新站点数据集合
        // station.planData.data[changeIndex].value = changeData[changeIndex][1];
        // that.stationDataList[index] = station;
      });

      this.myEchart._zr.on('mouseup', function (params) {
        if (!enableMove) {
          return false;
        }
        enableMove = false;
        _curSer = null; //清空down状态
      });
    },

    push() {},
  },
};
</script>