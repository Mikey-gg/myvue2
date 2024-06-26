// 公共配置区
// 请求使用方法
const queryBase = "this.$http.axios";

function generator(formConfigArr, tableConfigArr) {
  let htmlStr = "";
  let jsStr = "";

  let jsMethodsStr = "";
  let dataStr = "";
  let jsCreatedStr = "";
  let jsComputedStr = "";
  let jsMountedStr = "";

  // 针对 el-form 表单
  let htmlFormStr = "";
  let dataFormStr = "";
  let dataRulesStr = "";

  // 针对el-table 表格
  let htmlTableStr = "";
  let dataTableStr = "";

  // el-form 表单过程中 对 js html data的生成
  formConfigArr.forEach((el) => {
    // 如果是select生成对应的代码
    if (el.type === "select" || el.type === "input") {
      // 多选
      let multiple = "";
      if (el.multiple) {
        multiple = " multiple";
      }
      // 清除
      let filterable = "";
      if (el.filterable) {
        filterable = " filterable ";
      }
      // 监听改变事件
      let changeEventName = "";
      if (el.changeEvent) {
        changeEventName = ` @change=${el.changeEventName} `;
      }
      // 生成 html form-item 模板
      let formItem = "";
      if (el.type === "select") {
        formItem = `
                        <el-form-item label="${el.label}" prop="${el.vModel}">
                            <el-select v-model="form.${el.vModel}"${changeEventName}${filterable}:placeholder="$t('L30042')"${multiple} clearable>
                                <el-option
                                    v-for="item in ${el.vModel}List"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    `;
      }
      if (el.type === "input") {
        formItem = `
                        <el-form-item label="${el.label}" prop="${el.vModel}">
                            <el-input v-model="form.${el.vModel}"${changeEventName}${filterable}:placeholder="$t('pleaseInput')"${multiple} type="${el.contentType}" clearable></el-input>
                        </el-form-item>
                    `;
      }

      // js监听 change 方法
      if (el.changeEvent) {
        let queryPath = "";
        let queryParmas = "";
        // post 方法采用post的请求方式
        if (el.changeEventQueryMethod === "post") {
          // 构建请求参数
          el.changeEventQueryParams.forEach((el) => {
            queryParmas += el + ": " + "this.form." + el + ",";
          });
          queryParmas = "{" + queryParmas + "}";
          queryPath = `${queryBase}.${el.changeEventQueryMethod}(${el.changeEventQueryPath}, params)`;
        }
        // get 方法采用get的请求方式
        if (el.changeEventQueryMethod === "get") {
          queryPath = `${queryBase}.${el.changeEventQueryMethod}(${el.changeEventQueryPath})`;
        }
        let methodItem = `
                            ${el.changeEventName}(){
                                let params = ${queryParmas};
                                ${queryPath}.then(res => {
                                    console.log("res ${el.changeEventQueryPath}", res)
                                    if (res.RESULT === 'PASS') {

                                    }
                                })
                            },
                        `;
        jsMethodsStr += methodItem;
      }
      // 将多个子 form-item 拼接
      htmlFormStr += formItem;
      // 将多个子 data 拼接
      if (el.type === "select") {
        //
      }
      dataStr += el.vModel + "List: [],";
      // 将多个子 form data 拼接
      dataFormStr += el.vModel + ": '',";
      // 将多个子 rules data拼接
      let message = "`${this.$t('L45003')}`";
      let required = el.required ? "true" : "false";
      dataRulesStr +=
        el.vModel +
        `: [{required: ${required}, message: ${message}, trigger: 'blur'}],`;
    }
  });
  /* ------------------------------------------------------------------------------------- */
  // el-table 表格过程中 对 js html data的生成
  tableConfigArr.forEach((el) => {
    let tableIem = "";
    let label = `label="${el.label}"`;
    let width = "";
    let fixed = "";
    let formatter = "";
    let del = "";
    let edit = "";

    let methodItem = "";

    if (el.i18n) {
      label = ":" + label;
    }
    if (el.width) {
      width = ` width="${el.width}"`;
    }
    if (el.formatter) {
      formatter = ` :formatter="${el.propFormatter}"`;
      methodItem = `${el.propFormatter}(row) {
        if (row) {
          return "";
        }
        else if (row) {
          return "";
        }
        else {
          return "";
        }
      },`;
    }
    if (el.del) {
      del = `
      <el-button v-if="auth.delete" @click.native="del(scope.row)" :title="$t('L40016')" type="text" size="medium" icon="el-icon-delete">
      </el-button>
      `;
      let delQueryPath = "`${el.delQueryPath}`";
      methodItem += `
      del(item) {
        this.$confirm(this.$t("deleteConfirm",{key:item.title}),this.$t("L00010"), {
          confirmButtonText: this.$t("L00004"),
          cancelButtonText: this.$t("L00007"),
          type: "warning",
        }).then(() => {
          this.$http.removeById(${delQueryPath}, item.id).then(() => {
          this.$message.success(this.$t('L40009'));
            this.currentPage = 1;
            this.getPage();
          })
        })
      },
      `;
    }
    if (el.edit) {
      edit = `
      <el-button v-if="auth.edit" @click.native="edit(scope.row)" :title="$t('L40015')" type="text" size="medium" icon="el-icon-edit">
      </el-button>`;
      let editPagePath = "`${el.editPagePath}`";
      methodItem += `
      edit(item) {
        this.$root.addPageCache(this.$route.path,{
          form: this.form,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
  
        if(item&&item.id){
          this.$router.push({'path': ${editPagePath}})
        }
      },
      `;
    }
    if (el.fixed) {
      fixed = ` fixed="${el.fixed}"`;
    }
    if (el.index) {
      tableIem = `
      <el-table-column type="index" align="center"${fixed} ${label}${formatter}${width}>
      </el-table-column>`;
      methodItem += `
      indexMethod(index) {
        return index+(this.currentPage-1)*this.pageSize+1
      },
    `;
    } else if (el.template) {
      tableIem = `
      <el-table-column prop="${el.prop}" ${label} align="center"${fixed}${formatter}${width}>
        <template slot-scope="scope">
          {{ scope.row }}
        </template>
      </el-table-column>`;
    } else if (el.del || el.edit) {
      tableIem = `
      <el-table-column v-if="auth.edit||auth.delete" align="center" fixed="left" :label="$t('L00019')" ${width}>
        ${edit}
        ${del}
      </el-table-column>`;
    } else {
      tableIem = `
      <el-table-column prop="${el.prop}" ${label} align="center"${fixed}${formatter}${width}>
      </el-table-column>`;
    }
    // 将多个子 table-item 拼接
    htmlTableStr += tableIem;

    // 将多个子 methods 拼接
    jsMethodsStr += methodItem;
  });

  // 表格以及导航条附带相关的方法
  jsMethodsStr += `
    getAuth(val){
      let pageAuth = this.$root.findMenuItem(val,this.$root.auth);
      if(pageAuth&&pageAuth.subs&&pageAuth.subs.length){
        pageAuth.subs.forEach(el=>{
          let authTag = el.index.startsWith('/')?el.index.substring(1):el.index;
          authTag = authTag.split('/');
          authTag = authTag.length>1?authTag[1]:authTag[0];
          this.auth[authTag] = true;
          if (authTag=='add') {
            this.getAuth(el.index.startsWith('/')?el.index:'/'+el.index);
          }
        })
      }
    },
    search() {
      this.currentPage = 1;
      this.getPage();
    },
    getPage() {
      this.$http.showLoading = true;
      this.$http.getPage('mesSpotCheckWhitelist', this.form, this.currentPage, this.pageSize).then(response=>{
        this.list = response.DATA;
        this.total = response.total;
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPage();
    },
    `;

  // 最终要输出了
  // 给 form 表单加上最外层的标签
  htmlFormStr =
    `<el-form ref="form" :model="form" :rules="rules" :inline="true">` +
    htmlFormStr +
    "</el-form>";

  // 给 table 表格加上最外层的标签
  htmlTableStr =
    `
    <el-table header-row-class-name="nowrap" stripe border height="300" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}"
    :data="list" :loading="true" style="width: 100%">` +
    htmlTableStr +
    `
    </el-table>
    `;
  // 表格附带下面的导航条
  htmlTableStr += `
  <el-pagination
    style="text-align: center"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
  `;

  // 给 form表单数据加最外层的对象
  dataFormStr = "form: {" + dataFormStr + "},";

  // 给 table表格添加对应的data数据
  dataTableStr = `
  pageSize: 10,
  currentPage: 1,
  list: [],
  total: 0,
  auth: {
    add: false || this.$root.authCheck,
    edit: false || this.$root.authCheck,
    delete: false || this.$root.authCheck,
    export: false || this.$root.authCheck,
  }
  `;

  // 整合所有的html
  htmlStr =
    `
  <template>
      <div class="文件名">
      ` +
    htmlFormStr +
    htmlTableStr +
    `
      </div>
  </template>
      `;
  // 整合所有的数据
  dataRulesStr = "rules: {" + dataRulesStr + "},";
  dataStr = dataFormStr + dataStr + dataRulesStr + dataTableStr;

  // 打印出需要的模板内容
  // html
  console.log(htmlStr);
  console.log("");
  console.log("");

  // js
  console.log(jsMethodsStr);
  console.log("");
  console.log("");

  // data内容
  console.log(dataStr);
  console.log("");
  console.log("");
}

// generator(config1)
export default generator;
