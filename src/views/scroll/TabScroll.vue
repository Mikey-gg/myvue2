<template>
  <div>
    <van-tabs v-model="active" scrollspy sticky>
  <van-tab v-for="index in 40" :title="'选项 ' + index" :key="index">
    内容 {{ index }}
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  name: "TabScroll",
  data() {
    return {
      active: 2,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
