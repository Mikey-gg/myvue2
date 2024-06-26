import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    name: "Nav",
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
    path: "/roomSection",
    name: "roomSection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/RoomSection.vue"),
  },
  {
    path: "/vHtmlCompireJs",
    name: "vHtmlCompireJs",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/vHtmlCompireJs.vue"),
  },
  {
    path: "/requireContent",
    name: "requireContent",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/requireContent.vue"),
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
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
