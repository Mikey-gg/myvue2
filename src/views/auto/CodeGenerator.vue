<template>
  <div class="codeGenerator">
    <!-- <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table> -->
    <aside>
      <div class="aside1" @click="asideClick(1)">
        <div class="title">表单项</div>
        <div class="aside1-content" @click="formContentPart1">常用案例1</div>
        <div class="aside1-content">常用案例2</div>
        <div class="aside1-content">常用案例3</div>
        <div class="aside1-content">常用案例4</div>
      </div>
      <div class="aside2" @click="asideClick(2)">
        <div class="title">表格项</div>
        <div class="aside2-content" @click="tableContentPart1">常用案例1</div>
        <div class="aside2-content">常用案例2</div>
        <div class="aside2-content">常用案例3</div>
        <div class="aside2-content">常用案例4</div>
      </div>
      <div class="aside3" @click="asideClick(3)">
        <div class="title">定制化内容</div>
        <div class="aside2-content" @click="selfContentPart1">常用案例1</div>
        <div class="aside2-content">常用案例2</div>
        <div class="aside2-content">常用案例3</div>
        <div class="aside2-content">常用案例4</div>
      </div>
      <div class="bottom-generator">
        <button @click="templateGenerator">生成</button>
      </div>
    </aside>
    <main>
      <div class="main1" v-show="curAside === 1">
        <div class="title">表单项</div>
        <div class="main1-content">
          <form
            class="form"
            @submit.prevent
            v-for="(item, index) in selectForm"
            :key="item.$index"
            style="border: 1px solid black"
          >
            <div class="content-item" v-for="(val, key) in item" :key="key">
              <div class="name">{{ key | formName }}</div>
              <div class="value">
                <input
                  class="checkbox"
                  type="checkbox"
                  v-if="val === true || val === false"
                  v-model="item[key]"
                />
                <textarea
                  rows="10"
                  v-else-if="item.contentType == 'textarea'"
                  v-model="item[key]"
                ></textarea>
                <input
                  type="text"
                  v-else-if="item.contentType == 'text'"
                  v-model="item[key]"
                />
              </div>
            </div>
            <div class="center">
              <button @click="addFormItem(item, index)">新增</button
              >&nbsp;&nbsp;&nbsp;<button @click="delFormItem(index)">
                删除
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="main2" v-show="curAside === 2">
        <div class="title">表格项</div>
        <div class="top">
          <div>
            <span>getPage请求路径</span>
            <input type="text" v-model="otherConfigs.tableQueryPath" />
          </div>
        </div>
        <div class="main2-content">
          <form
            class="form"
            @submit.prevent
            v-for="(item, index) in selectTable"
            :key="item.$index"
            style="border: 1px solid black"
          >
            <div class="content-item" v-for="(val, key) in item" :key="key">
              <div class="name">{{ key | tableName }}</div>
              <div class="value">
                <input
                  class="checkbox"
                  type="checkbox"
                  v-if="val === true || val === false"
                  v-model="item[key]"
                />
                <textarea
                  rows="10"
                  v-else-if="item.contentType == 'textarea'"
                  v-model="item[key]"
                ></textarea>
                <input type="text" v-else v-model="item[key]" />
              </div>
            </div>
            <div class="center">
              <button @click="addTableItem(item, index)">新增</button
              >&nbsp;&nbsp;&nbsp;<button @click="delTableItem(index)">
                删除
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="main3" v-show="curAside === 3">
        <div class="title">定制化内容</div>
      </div>
    </main>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import generator from "./常见element生成";
import normalForm from "./normalForm";
import normalTable from "./normalTable";

function clone(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    let temp = typeof value === "object" ? clone(value) : value;
    newObj[key] = temp;
  }
  return newObj;
}

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄1",
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄2",
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄3",
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄4",
        },
      ],
      normalForm: normalForm,
      normalTable: normalTable,
      selectForm: [],
      selectTable: [],
      selectSelf: [],
      curAside: 1,
      otherConfigs: {
        tableQueryPath: "",
      },
    };
  },
  watch: {
    // selectForm(){
    //     this.dragFormItem()
    // }
  },
  mounted() {
    // this.dragRow();
    // this.templateGenerator();
    this.dragFormItem();
  },
  methods: {
    asideClick(index) {
      this.curAside = index;
    },
    addFormItem(item, index) {
      this.selectForm.splice(index, 0, clone(item));
    },
    delFormItem(index) {
      this.selectForm.splice(index, 1);
    },
    addTableItem(item, index) {
      this.selectTable.splice(index, 0, clone(item));
    },
    delTableItem(index) {
      this.selectTable.splice(index, 1);
    },
    formContentPart1() {
      this.selectForm = this.normalForm;
    },
    tableContentPart1() {
      this.selectTable = this.normalTable;
    },
    selfContentPart1() {
      // this.selectTable = this.normalTable
    },
    // 行拖拽
    dragRow() {
      // 查找要拖拽元素的父容器
      const tbody = document.querySelector(
        ".demo-table-wrapper .el-table__body-wrapper tbody"
      );

      const _this = this;
      Sortable.create(tbody, {
        draggable: ".demo-table-wrapper .el-table__row", //  指定父容器下可被拖拽的子元素

        onEnd({ newIndex, oldIndex }) {
          /**
           * onEnd 拖拽结束后的事件处理函数
           * newIndex：目标位置对应行的索引
           * oldIndex：被拖拽行的索引
           *
           * ====================（被拖拽记录行1）
           * before
           * ====================(拖拽至目标位置对应记录行)
           * after
           * ====================（被拖拽记录行2）
           * 如果从上往下拖拽，即newIndex > oldIndex，那么在目标位置对应记录行上移(目标位置对应记录行索引值减1)，在newIndex所指位置插入被拖拽行(被拖拽行索引设置为newIndex)，视觉效果就是在after位置(即目标位置对应行下方)插入被拖拽行
           * 如果从下往上拖拽，即newIndex < oldIndex，那么在目标位置对应记录行下移(目标位置对应记录行索引值加1)，在newIndex所指位置插入被拖拽行(被拖拽行索引设置为newIndex)，视觉效果就是在上述before位置(即目标位置对应行上方)插入被拖拽行
           * */

          console.log(newIndex, oldIndex);
          if (newIndex > oldIndex) {
            // 请求服务器做数据更新处理，然后根据处理结果对前端页面处理
          } else {
            // 请求服务器做数据更新处理 ，然后根据处理结果对前端页面处理
          }
        },
      });
    },
    templateGenerator() {
      // let selectForm = this.selectForm
      generator(this.selectForm, this.selectTable);
    },
    // 可拖动
    dragFormItem() {
      let container = document.getElementsByClassName("main1-content")[0];
      let _this = this;
      Sortable.create(container, {
        draggable: ".form",
        onEnd({ newIndex, oldIndex }) {
          let temp = _this.selectForm[newIndex];
          _this.selectForm[newIndex] = _this.selectForm[oldIndex];
          _this.selectForm[oldIndex] = temp;
        },
      });
    },
  },
  filters: {
    formName(name) {
      const map = {
        type: "控件类型",
        contentType: "输入类型",
        vModel: "绑定值",
        label: "显示值",
        i18n: "国际化",
        changeEvent: "监听改变方法",
        changeEventName: "改变方法名",
        changeEventQueryMethod: "请求方法名",
        changeEventQueryPath: "请求路径",
        changeEventQueryParams: "请求参数",
        required: "必填",
        multiple: "多选",
        filterable: "模糊查询",
        template: "自定义",
      };
      return map[name];
    },
    tableName(name) {
      const map = {
        prop: "属性",
        label: "显示值",
        i18n: "国际化",
        index: "序号",
        width: "宽度",
        formatter: "格式化",
        fixed: "位置",
        edit: "编辑",
        editPagePath: "编辑页面",
        del: "删除",
        delQueryPath: "删除调用接口",
        export: "导出",
        exportQueryPath: "导出请求路径",
        template: "自定义",
      };
      return map[name];
    },
  },
};
</script>

<style scoped lang="less">
aside {
  width: 15%;
  height: 100vh;
  background-color: gray;
  float: left;
  position: relative;
}
main {
  overflow-x: hidden;
  height: 100vh;
  background-color: white;
}
.title {
  height: 40px;
  line-height: 40px;
  background-color: green;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.main1-content,
.main2-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  form {
    margin-bottom: 10px;
  }
}
.content-item {
  display: flex;
  width: 350px;
  .name {
    width: 30%;
    direction: rtl;
  }
  .value {
    width: 60%;
    margin-left: 10px;
  }
}
.center {
  margin: auto;
  width: 110px;
}
.bottom-generator {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
