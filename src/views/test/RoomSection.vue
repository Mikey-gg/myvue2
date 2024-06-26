<template>
  <div :class="{ fixed: fixed }">
    <!-- <div class="main-container" v-if="flex">
     <div class="header">
       <button @click="changeStyle">样式</button>
       <button @click="changeFlex">切换为普通的滚动，不加flex</button>
       <button @click="changeFixed">切换为fixed {{fixed ? "已添加" : "未添加"}} </button>
       <button @click="changeScroll">scrolling {{scrolling ? "已添加" : "未添加"}} </button>
     </div>
     <div class="sub-container" :class="{'scrolling': scrolling}">
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
         <div class="content">1</div>
     </div>
     <div class="footer"></div>
 </div> -->
    <div v-if="flex" class="self-container">
      <div class="myheader">
        <button @click="changeStyle">样式</button>
        <button @click="changeFlex">切换为普通的滚动，不加flex</button>
        <button @click="changeFixed">
          切换为fixed {{ fixed ? "已添加" : "未添加" }}
        </button>
        <button @click="changeScroll">
          切换为scrolling {{ scrolling ? "已添加" : "未添加" }}
        </button>
      </div>
      <div class="main-thing">
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
      </div>
    </div>
    <div v-if="!flex">
      <div class="header">
        <button @click="changeStyle">样式</button>
        <button @click="changeFlex">切换为普通的滚动，不加flex</button>
        <button @click="changeFixed">
          切换为fixed {{ fixed ? "已添加" : "未添加" }}
        </button>
        <button @click="changeScroll">
          切换为scrolling {{ scrolling ? "已添加" : "未添加" }}
        </button>
      </div>

      <div class="scroll-body" :class="{ scrolling: scrolling }">
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
        <div class="content">1</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roomSection",
  data() {
    return {
      flex: true,
      style: true,
      fixed: false,
      scrolling: false,
    };
  },
  methods: {
    changeFlex() {
      this.flex = !this.flex;
    },
    changeStyle() {},
    changeFixed() {
      this.fixed = !this.fixed;
    },
    changeScroll() {
      this.scrolling = !this.scrolling;
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 200px;
  height: 90vh;
  background-color: yellow;
  display: flex;
  flex-direction: column;
}
.header {
  height: 150px;
  background-color: gray;
}
.footer {
  height: 60px;
  background-color: gray;
}
.sub-container {
  height: 0;
  flex: 1;
  overflow: auto;
  background-color: pink;
  overflow-y: scroll;
  overflow-x: hidden;
}
.content {
  height: 50px;
}
.scroll-body {
  height: 300px;
  overflow: auto;
  background-color: skyblue;
  overflow-y: scroll;
  overflow-x: hidden;
}

.fixed {
  position: fixed;
  left: 0;
  top: 0;
}
.scrolling {
  -webkit-overflow-scrolling: touch;
}
.myheader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: gray;
  height: 100px;
}
.main-thing {
  margin-top: 100px;
}
html,
body {
  height: 100%;
}
.self-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
