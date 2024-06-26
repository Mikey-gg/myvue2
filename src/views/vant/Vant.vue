<template>
  <div>
    <van-circle
      v-model="currentRate"
      :rate="90"
      :speed="100"
      :text="text"
      :stroke-width="60"
      :color="gradientColor"
      size="26.67vw"
      class="half"
    />

    <van-collapse v-model="activeName" accordion class="half">
      <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>

    <hr />

    <van-count-down :time="time">
      <template #default="timeData">
        <span class="block">{{ timeData.hours }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.minutes }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.seconds }}</span>
      </template>
    </van-count-down>

    <hr />

    <div style="width: 53.33vw">
      <lazy-component>
        <img
          v-for="img in imageList"
          v-lazy="img"
          :key="img.$index"
          class="fit-img"
        />
      </lazy-component>
    </div>

    <hr />

    <van-swipe>
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="fit-img" />
      </van-swipe-item>
    </van-swipe>

    <hr />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <hr />

    <div class="flex">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          loading-text="数据加载中，请稍后~"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: "vant",
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      activeName: "1",
      time: 30 * 60 * 60 * 1000,
      imageList: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 2000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.half {
  width: 50%;
  display: inline-block;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.fit-img {
  width: 100%;
  height: auto;
  /* max-width: 26.67vw; */
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
hr {
  margin: 10px 0px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
