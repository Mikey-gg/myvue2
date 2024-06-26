<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
let d = [];
for (let i = 0; i < 100000; i++) {
  d.push({ id: i, value: i });
}
export default {
  name: "app",
  // watch: {
  //   $route(to, from) {
  //     console.log("111111");
  //     if (to.meta.index > 0 && from.meta.index) {
  //       if (to.meta.index < from.meta.index) {
  //         this.transitionName = "slide-right";
  //       } else {
  //         this.transitionName = "slide-left";
  //       }
  //     } else if (to.meta.index == 0 && from.meta.index > 0) {
  //       this.transitionName = "";
  //     }
  //   },
  // },
  created() {},
  data() {
    return {
      transitionName: "",
    };
  },

  computed: {
    windowW() {
      return document.documentElement.clientWidth;
    },
    windowH() {
      return document.documentElement.clientHeight;
    },
  },
  components: {},
  methods: {
    clickThis() {
      try {
        setTimeout(() => {
          console.log("11111");
        }, 1000);
        // console.log(e.length);
        let len = 6;
        for (; len--; ) {
          console.log(len);
        }
        console.log();
      } finally {
        // catch{
        // 	console.log("3333");
        // }
        console.log("22222");
      }
    },
    al() {
      alert(this.name);
      console.log(this.doc);
    },
    change() {
      this.name = "123";
      console.log(this.title);
    },
    changeTheName(a) {
      console.log(a);
      this.name = a;
    },
  },
};
</script>

<style>
/* 页面切换动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  /* will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置 */
  will-change: transform;
  transition: all ease 3s;
  -webkit-transition: all ease 3s;
  position: absolute;
  width: 100%;
  left: 0;
}

.slide-right-enter {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}

.slide-right-leave-active {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.slide-left-leave-active {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}
</style>
