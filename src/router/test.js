const routes = [
  {
    path: "/roomSection",
    name: "roomSection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/test/RoomSection.vue"),
  },
  {
    path: "/mulLayout",
    name: "mulLayout",
    component: () =>
      import(/* webpackChunkName: "template" */ "../views/test/MulLayout.vue"),
  },
  {
    path: "/vHtmlCompireJs",
    name: "vHtmlCompireJs",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/test/vHtmlCompireJs.vue"
      ),
  },
  {
    path: "/requireContent",
    name: "requireContent",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/test/requireContent.vue"
      ),
  },
];

export default routes;