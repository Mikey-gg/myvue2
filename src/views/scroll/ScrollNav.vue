<template>
    <cube-scroll-nav
      :side="true"
      :data="data"
      :current="current"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler"
    >
      <!-- <ul class="prepend-header" slot="prepend">
        <li>11</li>
        <li>22</li>
        <li>333</li>
      </ul> -->
      <cube-scroll-nav-panel
        v-for="item in data"
        :key="item.name"
        :label="item.name"
        :title="item.name"
      >
        <ul>
          <li v-for="food in item.foods" :key="food.$index">
            <div>
              <img :src="food.icon" />
              <p>{{ food.name }}</p>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
</template>

<script>
import goodsData from "./example/data/goods-list.js";

const goods = goodsData.goods;
export default {
  name: "ScrollNav",
  data() {
    return {
      data: goods,
      current: goods[3].name,
    };
  },
  methods: {
    changeHandler(label) {
      this.current = label
    },
    stickyChangeHandler(current) {
      console.log("sticky-change", current);
    },
  },
};
</script>

<style scoped></style>
