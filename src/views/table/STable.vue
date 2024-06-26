<template>
  <div class="container">
    <el-row class="p">
      <el-col :span="4"
        ><div class="item1"><img src="" alt="" /></div
      ></el-col>
      <el-col :span="20"><div class="item2">2121</div></el-col>
    </el-row>
    <el-row class="r">
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="20"><div class="item2">2121</div></el-col>
    </el-row>
    <el-row class="r">
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
    </el-row>
    <el-row class="r">
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
    </el-row>
    <el-row class="r">
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
    </el-row>
    <el-row class="r">
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
      <el-col :span="4"><div class="item1">1212</div></el-col>
      <el-col :span="8"><div class="item2">2121</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sTable",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.container {
  width: 500px;
  height: 500px;
  background-color: yellowgreen;
  text-align: center;
}
.p > div {
  height: 100px;
  background-color: skyblue;
}
.item1 {
  text-align: center;
  background-color: green;
}
.item2 {
  text-align: center;
  background-color: yellow;
}
.item1 img {
  width: 100%;
  height: auto;
  background-color: white;
}
</style>
