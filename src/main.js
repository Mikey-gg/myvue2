import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
import { Lazyload } from "vant";
// import Cube from "cube-ui";

Vue.prototype.axios = axios
Vue.prototype.$bus = new Vue();
// Vue.use(Cube);
import {
  /* eslint-disable no-unused-vars */
  Style,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar,
} from "cube-ui";

Vue.use(Scroll);
Vue.use(Slide);
Vue.use(IndexList);
Vue.use(Swipe);
Vue.use(Sticky);
Vue.use(ScrollNav);
Vue.use(ScrollNavBar);
Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(Lazyload);

Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false;

import "./assets/main.css";
// import "amfe-flexible";

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
  methods: {
    resizeTable(offset) {
      try {
        // 默认减去Tabs栏高�?46)||Breadcrumbs栏高�?38)+分页组件高度(32)+空白边距(5)=83
        offset = offset || 75;
        let $form = document.querySelector(".el-form");
        if ($form && $form.offsetHeight) {
          offset += $form.offsetHeight;
        }
        // ht为根据窗口高度计算表格所占高�?
        let ht =
          document.querySelector(".el-main.el-scroll").offsetHeight - offset;
        // 最小表格高�?20
        if (ht >= 120) {
          let $tb = document.querySelector(".el-table");
          let $tbFixed = document.querySelector(".el-table__fixed");
          let $tbWrapper = $tbFixed
            ? document.querySelector(".el-table__fixed-body-wrapper")
            : document.querySelector(".el-table__body-wrapper");
          $tb.style.height = ht + "px";
          if ($tbFixed) $tbFixed.style.height = ht - 1 + "px";
          $tbWrapper.style.height = ht - 41 + "px";
        }
      } catch (e) {
        console.log(e);
      }
    },
    resizeTableVersion2(tableDom) {
      let table = document.querySelector(`.${tableDom}`);

      let wholeHeight = document.body.clientHeight;

      table.style.height = wholeHeight - table.offsetTop - 32 + "px";
    },
  },
}).$mount("#app");
