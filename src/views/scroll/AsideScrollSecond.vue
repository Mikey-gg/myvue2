<template>
  <div class="cate-list">
    <div class="left-nav">
      <van-sidebar v-model="activeKey" @change="changeNav">
        <van-sidebar-item
          :title="item.cat_name"
          v-for="(item, index) in cateList"
          :key="index"
        />
      </van-sidebar>
    </div>
    <div class="cate-body">
      <div
        class="cate-body-item"
        v-for="(item, index) in catev2List"
        :key="index"
      >
        <div class="title">/ {{ item.cat_name }} /</div>
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(subitem, index2) in catev2List[index].children"
            :key="index2"
          >
            <img :src="subitem.cat_icon" />
            <span class="name">{{ subitem.cat_name }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideScrollSecond",
  data() {
    return {
      ymHeight: document.body.offsetHeight + "px",
      activeKey: 0,
      cateList: [],
      catev2List: [],
      list: [
        {
          name: "列表一",
          children: [
            { id: 1, title: "内容一" },
            { id: 2, title: "内容二" },
            { id: 3, title: "内容三" },
            { id: 4, title: "内容四" },
          ],
        },
        {
          name: "列表二",
          children: [
            { id: 5, title: "内容一" },
            { id: 6, title: "内容二" },
            { id: 7, title: "内容三" },
            { id: 8, title: "内容四" },
          ],
        },
        {
          name: "列表三",
          children: [
            { id: 9, title: "内容一" },
            { id: 10, title: "内容二" },
            { id: 11, title: "内容三" },
            { id: 12, title: "内容四" },
          ],
        },
        {
          name: "列表四",
          children: [
            { id: 10, title: "内容一" },
            { id: 11, title: "内容二" },
            { id: 12, title: "内容三" },
            { id: 13, title: "内容四" },
          ],
        },
      ],
    };
  },
  methods: {
    changeNav(index) {
      Notify({ type: 'primary', message: index });
    },
    handleMenulist(index) {
      this.activeKey = index;
      let navPage = document.querySelector("#scroll" + index);
      this.$refs.scrollbar.scrollTop = navPage.offsetTop;
    },
    handleScroll() {
      let scrollTop = $("#gddb").scrollTop(); //这是右边内容滚动时距离顶部的高度
      let len = this.list.length;
      for (let a = 0; a < len; a++) {
        if (document.querySelector("#scroll" + a).offsetTop < scrollTop + 20) {
          //如果（找到每一块距离顶部的高度）< 内容顶部高度
          this.activeKey = a; //那就改变左侧的index
        }
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeRouteEnter(to, from, next) {
    document
      .querySelector("body")
      .setAttribute("style", "background-color: #F9F8F8");
    next((vm) => {});
  },
  beforeRouteLeave(to, from, next) {
    // this.$destroy();
    next();
  },
};
</script>
<style lang="less">
  .cate-list {
    display: flex;
    justify-content: space-between;
    .left-nav {
      width: 22%;
      height: calc(100vh -100px);
      overflow: scroll;
    }
    .cate-body {
      width: 78%;
      height: calc(100vh -100px);
      overflow: scroll;
      .title {
        margin-top: 40px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      img {
        width: 140px;
        height: 140px;
      }
      .name {
        font-size: 24px;
      }
    }
  }
</style>
<style scoped></style>
