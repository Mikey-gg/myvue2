<!--
@author: chen.liuyong
@since : 2022/12/27
@description: Waterfall
-->
<template>
  <div class="waterfall">
    <waterfall-wrapper :line-gap="200" :watch="items">
      <!-- <waterfall-slot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.id"
      >
        <div class="myitem">
            {{index}}
        </div>
      </waterfall-slot> -->
      <template>
        <div
          class="myitem"
          v-for="(item, index) in items"
          :key="index"
        >
          
          {{index}}
        </div>
      </template>
    </waterfall-wrapper>
  </div>
</template>

<script>
import WaterfallWrapper from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
export default {
  name: "waterfall",
  created() {
    // this.$nextTick(() => {
    this.items = [
      { width: 30, height: 20, id: 0 },
      { width: 10, height: 20, id: 1 },
      { width: 20, height: 40, id: 2 },
      { width: 30, height: 20, id: 3 },
      { width: 20, height: 20, id: 4 },
      { width: 30, height: 30, id: 5 },
      { width: 30, height: 20, id: 6 },
      { width: 30, height: 20, id: 7 },
      { width: 30, height: 20, id: 8 },
    ];
    // });
  },
  components: {
    WaterfallWrapper,
    WaterfallSlot,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
.waterfall {
  height: 100%;
}
.myitem {
    width: 180px;
    background-color: pink;
    display: inline-block;
    height: 100px;
    text-align: center;
}
.myitem:nth-child(2n) {
  background-color: gray;
  height: 130px;
}
.myitem:nth-child(3n) {
  background-color: yellow;
  height: 180px;
}
</style>
<style>
/* .waterfall .vue-waterfall {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
} */
</style>