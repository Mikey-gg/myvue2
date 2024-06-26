<!--
@author: chen.liuyong
@since : 2022/09/23
@description: 
-->
<template>
  <div>
    {{ $store.state.count }}
    123
    <el-button @click="addCount"> 增加主页的 count </el-button>
  </div>
</template>

<script>
export default {
  name: "about",
  created() {
    this.test();
    console.log("111: ", 111);
  },
  data() {
    return {};
  },
  methods: {
    addCount() {
      this.$store.commit("addCount");
    },
    test() {
      // const url = `http://localhost:3000/postTest`;
      const url = `http://localhost:3001/cly`;
      this.axios.post(url, {}).then((res) => {
        console.log("res: ", res);
      });
    },
  },
};
</script>

<style scoped></style>
