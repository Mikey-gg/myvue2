<!--
@author: chen.liuyong
@since : 2022/12/29
@description: MulLayout
-->
<template>
  <div class="mulLayout">
    <div class="wrapper">
      <div v-for="item in list" :key="item.$index" class="sub-wrapper">
        <div class="title">{{ item.name }}</div>
        <div class="content" v-for="i in item.children || []" :key="i.$index">
          <div class="sub-title">
            {{ i.name }}
          </div>
          <div
            class="sub-content"
            v-for="k in i.children || []"
            :key="k.$index"
          >
            {{ k.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mulLayout",
  created() {
    // this.list = this.getList().slice(0, 5);
    this.list = this.getPerson();
    // this.list = this.getDevice();
    // this.list = this.getOperating();
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getList() {
      return [
        {
          name: "first",
          children: [
            { name: "f1" },
            // { name: "f2" },
            // { name: "f3" },
            // { name: "f4" },
            // { name: "f5" },
            // { name: "f6" },
          ],
        },
        {
          name: "second",
          children: [
            { name: "s1" },
            // { name: "s2" },
            // { name: "s3" },
            // { name: "s4" },
          ],
        },
        {
          name: "third",
          children: [
            { name: "t1" },
            // { name: "t2" },
            // { name: "t3" },
            // { name: "t4" },
          ],
        },
        {
          name: "fourth",
          children: [
            { name: "f1" },
            // { name: "f2" },
            // { name: "f3" },
            // { name: "f4" },
            // { name: "f5" },
          ],
        },
        {
          name: "fifth",
          children: [
            { name: "f1" },
            { name: "f2" },
            { name: "f3" },
            { name: "f4" },
            { name: "f5" },
            { name: "f6" },
            { name: "f7" },
          ],
        },
      ];
    },
    getPerson() {
      return [
        {
          name: "人员信息配置",
          children: [
            { name: "应届生界别表" },
            { name: "人员业务类型维护表" },
            { name: "人员编制维护表" },
            { name: "人员年龄表" },
            { name: "人员标准线体表" },
            { name: "人员班次维护表" },
            { name: "人员工作地点维护表" },
            { name: "人员岗位不符表" },
            { name: "提报人配置表" },
            { name: "直接领导表" },
            { name: "品质人员挂靠表" },
          ],
        },
        {
          name: "岗位性质配置",
          children: [
            { name: "业务类型配置表" },
            { name: "编制配置表" },
            { name: "序列类别表" },
            { name: "实际岗位表" },
            { name: "工作地点配置表" },
          ],
        },
        {
          name: "员工考勤录入",
          children: [
            { name: "借调表" },
            { name: "请假表" },
            { name: "调动表" },
            { name: "离职表" },
          ],
        },
        {
          name: "考勤统计报表",
          children: [
            { name: "各部门人员出勤统计表" },
            { name: "分项目人员出勤统计表" },
            { name: "分业务各部门出勤统计表" },
            { name: "分业务每日在册出勤统计表" },
            { name: "各部门出勤天数统计表" },
            { name: "分可是各级别人数统计表" },
            { name: "各部门/科室离职率工" },
            { name: "分线体离职率" },
          ],
        },
        {
          name: "IE人力标配",
          children: [
            { name: "计划开线线体" },
            { name: "直接人力标准" },
            { name: "间接人力标准" },
            { name: "各部门人员配置满足情况" },
            { name: "区域人力分析" },
          ],
        },
      ];
    },
    getDevice() {
      return [
        {
          name: "智能电力能耗",
          children: [
            { name: "工厂能耗报表" },
            { name: "车间能耗报表" },
            { name: "车间能耗报表" },
            { name: "车间能耗报表" },
            { name: "车间能耗报表" },
            { name: "车间能耗报表" },
            { name: "线体能耗报表" },
            {
              name: "基础数据配置",
              children: [
                { name: "电表配置" },
                { name: "能耗标准配置" },
                { name: "排产配置" },
              ],
            },
          ],
        },
        {
          name: "设备信息管理",
          children: [
              {name: "业务类型配置表"},
              {name: "编制配置表"},
              {name: "序列类别表"},
              {name: "实际岗位表"},
              {name: "工作地点配置表"},
          ],
        },
        {
          name: "设备运行状态",
          children: [
            //   {name: "借调表"},
            //   {name: "请假表"},
            //   {name: "调动表"},
            //   {name: "离职表"},
          ],
        },
      ];
    },
    getOperating() {
      return [
        {
          name: "项目人均产出",
          children: [
            { name: "人均产出报表" },
            {
              name: "基础数据配置",
              children: [{ name: "产品价格配置" }, { name: "采集工站配置" }],
            },
          ],
        },
        {
          name: "组织架构",
          children: [
            //   {name: "业务类型配置表"},
          ],
        },
        {
          name: "交付",
          children: [
            //   {name: "离职表"},
          ],
        },
        {
          name: "质量",
          children: [
            //   {name: "离职表"},
          ],
        },
      ];
    },
  },
};
</script>

<style scoped>
.mulLayout {
  height: 100%;
  background-color: gray;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-height: 80vh;
  align-items: center;
}
.sub-wrapper {
  margin-bottom: 40px;
  background-color: gray;
}
.title {
  width: 200px;
  height: 30px;
  margin: 5px;
  background-color: yellow;
  font-size: 20px;
  font-weight: bold;
}
.content {
  width: 200px;
  margin: 5px;
  background-color: gray;
  margin-left: 20px;
}
.sub-content, .sub-title {
  width: 200px;
  height: 30px;
  margin: 5px;
  background-color: gray;
}
.sub-content {
    margin-left: 30px;
}
</style>
