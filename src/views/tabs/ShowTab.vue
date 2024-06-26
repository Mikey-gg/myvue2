<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      用户管理
      <div>
        <button @click="timeBtn">按钮</button>
      </div>
      <div>
        <el-time-select
          placeholder="选择时间"
          v-model="timeValue"
          :picker-options="{
            start: start,
            step: '00:01',
            end: end,
          }"
        >
        </el-time-select>
      </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth"
      >定时任务补偿
      <el-table>
        <el-table-column
          :label="$t('L20713')"
          prop="description"
          class="inline-form"
          label-width="90px"
        ></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "showTab",
  data() {
    return {
      activeName: "second",
      timeValue: "",
      start: "12:00",
      end: "13:00",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    timeBtn() {
      console.log("this.timeValue", this.timeValue);
    },
  },
};
</script>
