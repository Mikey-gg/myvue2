<!--
@author: chen.liuyong
@since : 2022/11/02
@description: element 进度条
-->
<template>
  <div class="elSteps">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1">
        <template slot="title">
          <div style="border: 1px solid black; width: 150px;">
            <div>name: cc</div>
            <div>age: 18</div>
          </div>
        </template>
      </el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "mySteps",
  created() {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    str() {
      return "name: cc,\n age: 18";
    },
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>

<style scoped>
.elSteps {
  height: 100%;
}
</style>
