import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import transitionExtend from './transition-extend';

const files = require.context(".", false, /\.js$/);
const arr = [];
files.keys().forEach((file) => {
  if (file == "./transition-extend.js" || file == "./index.js") return; 
  const content = files(file).default;
  arr.push(...content)
})


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/nav",
    name: "myNav",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MyNav.vue"),
  },
  {
    path: "/TwoTableInOnePage",
    name: "TwoTableInOnePage",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/table/TwoTableInOnePage.vue"
      ),
  },
  {
    path: "/TwoTableAboutOne",
    name: "TwoTableAboutOne",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/table/TwoTableAboutOne.vue"
      ),
  },
  {
    path: "/treeTable",
    name: "TreeTable",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/TreeTable.vue"),
  },
  {
    path: "/sTable",
    name: "sTable",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/STable.vue"),
  },
  {
    path: "/showTab",
    name: "showTab",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tabs/ShowTab.vue"),
  },
  {
    path: "/biasTable",
    name: "biasTable",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/BiasTable.vue"),
  },
  {
    path: "/CombineColRow",
    name: "CombineColRow",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/CombineColRow.vue"),
  },
  {
    path: "/CombineColRowHtml",
    name: "CombineColRowHtml",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/CombineColRowHtml.vue"),
  },
  {
    path: "/TotalBar",
    name: "TotalBar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/TotalBar.vue"),
  },
  {
    path: "/vant",
    name: "vant",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/vant/Vant.vue"),
  },
  {
    path: "/dragElement",
    name: "dragElement",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/drag/DragElement.vue"),
  },
  {
    path: "/print",
    name: "print",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/print/Print.vue"),
  },
  {
    path: "/CodeGenerator",
    name: "CodeGenerator",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/auto/CodeGenerator.vue"),
  },
  {
    path: "/MenuFollowScroll",
    name: "MenuFollowScroll",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/scroll/MenuFollowScroll.vue"
      ),
  },
  {
    path: "/waterfall",
    name: "waterfall",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/scroll/Waterfall.vue"),
  },
  {
    path: "/ScrollNav",
    name: "ScrollNav",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/ScrollNav.vue"),
  },
  {
    path: "/HorizontalScrollNav",
    name: "HorizontalScrollNav",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/HorizontalScrollNav.vue"),
  },
  {
    path: "/AsideScroll",
    name: "AsideScroll",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/AsideScroll.vue"),
  },
  {
    path: "/AsideScrollSecond",
    name: "AsideScrollSecond",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/AsideScrollSecond.vue"),
  },
  {
    path: "/TabScroll",
    name: "TabScroll",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/TabScroll.vue"),
  },
  {
    path: "/AsideScrollCustom",
    name: "AsideScrollCustom",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/scroll/AsideScrollCustom.vue"),
  },
  {
    path: "/mcncFlex",
    name: "mcncFlex",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/flex/mcncFlex.vue"),
  },
  {
    path: "/wxSDK",
    name: "wxSDK",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/expend/wxSDK.vue"),
  },
  {
    path: "/ScrollBar",
    name: "ScrollBar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cubeui/ScrollBar.vue"),
  },
  {
    path: "/DragLine",
    name: "DragLine",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/echarts/DragLine.vue"),
  },
  {
    path: "/DragPointer",
    name: "DragPointer",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/echarts/DragPointer.vue"),
  },
  {
    path: "/autoScrollBar",
    name: "autoScrollBar",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/echarts/AutoScrollBar.vue"),
  },
  {
    path: "/outputManpower2",
    name: "outputManpower2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/echarts/outputManpower2.vue"),
  },
  {
    path: "/AutoLabel",
    name: "AutoLabel",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/echarts/AutoLabel.vue"),
  },
  {
    path: "/extraInfoBar",
    name: "extraInfoBar",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/echarts/ExtraInfoBar.vue"),
  },
  {
    path: "/testMulInterval",
    name: "testMulInterval",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/test/testMulInterval.vue"),
  },
  {
    path: "/cssVariants",
    name: "cssVariants",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/test/CssVariants.vue"),
  },
  {
    path: "/exchangeStop",
    name: "exchangeStop",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/test/ExchangeStop.vue"),
  },
  {
    path: "/audioPlay",
    name: "audioPlay",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/test/AudioPlay.vue"),
  },
  {
    path: "/elSteps",
    name: "elSteps",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/process.vue/ElSteps.vue"),
  },
  {
    path: "/hoverToMenu",
    name: "hoverToMenu",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/showMenus/HoverToMenu.vue"),
  },
  {
    path: "/file1",
    name: "file1",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/eventBus/file1.vue"),
  },
  {
    path: "/file2",
    name: "file2",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/eventBus/file2.vue"),
  },
  {
    path: "/mulPopover",
    name: "mulPopover",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/showMenus/MulPopover.vue"),
  },
  {
    path: "/baseTable",
    name: "baseTable",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/table/BaseTable.vue"),
  },
  {
    path: "/numRange",
    name: "numRange",
    component: () =>
      import(/* webpackChunkName: "template" */ "../components/common/NumRange.vue"),
  },
];
routes.push(...arr)
let router = new VueRouter({
  routes,
  mode: "history",
});

router = transitionExtend(router)
export default router;
