<template>
  <div class="container">
    <div class="aside">
      <div class="aside-item" v-for="item in menus" :key="item.$index">
        {{ item.className }}
      </div>
    </div>
    <div class="menus">
      <div class="item" v-for="item in menus" :key="item.$index">
        {{ item.list }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuFollowScroll",
  data() {
    return {
      test: [
        { name: "菜品1", content: "茄子" },
        { name: "菜品2", content: "饺子" },
      ],
      menus: [
        {
          className: "菜单类目一",
          list: [
            {
              name: "土豆丝",
            },
            {
              name: "土豆丝",
            },
            {
              name: "土豆丝",
            },
            {
              name: "土豆丝",
            },
            {
              name: "土豆丝",
            },
            {
              name: "土豆丝",
            },
          ],
        },
        {
          className: "菜单类目二",
          list: [
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
            {
              name: "土豆泥",
            },
          ],
        },
        {
          className: "菜单类目3",
          list: [
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
            {
              name: "空心菜",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.container {
  display: flex;
}
.item {
  height: 500px;
}
.menus {
  width: 60%;
}
.aside {
  width: 30%;
  position: sticky;
  top: 0;
  height: 100%;
  background-color: gray;
}
</style>
