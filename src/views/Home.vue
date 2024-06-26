<template>
  <div class="home">
    <div class="titleBar">
      <div v-press="pressParam" class="title" @click="changePressParam">
        这是主页内容
      </div>
      <div>
        {{ $store.state.count }} 这里可以通过 about 页面去更改，甚至是可以跨页面进行
      </div>
      <router-link to="/nav">去导航页 &nbsp;</router-link>
      <router-link to="/treeTable">tree table &nbsp;</router-link>
      <router-link to="/sTable">栅格化table &nbsp;</router-link>
      <router-link to="/biasTable">斜线table &nbsp;</router-link>
      <router-link to="/baseTable">baseTable &nbsp;</router-link>
      <router-link to="/vant">vant &nbsp;</router-link>
      <router-link to="/DragPointer">DragPointer &nbsp;</router-link>

      <hr />
      <router-link to="/showTab">tab展示</router-link>
      <button @click="btnClick">按钮</button>
        <el-input type="textarea"></el-input>
      <!-- <div style="width:80px">
      </div> -->
    </div>

    <div class="home1">
      <div class="mybox">
        <div class="img_box">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import press from "@/plugins/directives/press";

export default {
  name: "Home",
  components: {
    // press
  },
  directives: {
    press,
  },
  created() {
    console.log("this.$data", this.$data);
  },
  data() {
    return {
      pressParam: "",
      aaa: [],
    };
  },
  methods: {
    changePressParam() {
      this.pressParam = "111";
    },
    btnClick() {
      this.clyAutoFullscreen()
    },
    clyAutoFullscreen() {
        var docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.title {
  width: 200px;
  height: 50px;
}
.home1 {
  .mybox {
    margin-left: 400px;
    width: 200px;
    height: 200px;
    background-color: greenyellow;
    cursor: pointer;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    .img_box {
      width: 50px;
      height: 50px;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .mybox:hover {
    border: 1px solid #d4b021;
  }
  .mybox:hover .img_box img {
    margin-left: -100px;
    filter: drop-shadow(50px 0 0 0 #d4b021);
  }
}
</style>
