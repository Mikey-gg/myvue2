<!--
@author: xuweijie
@since : 2021-05-08 15:28:13
-->
<template>
  <div class="cusSpotCheckWhitelist">
    <el-form
      :inline="true"
      label-position="right"
      :model="form"
      class="form-bar"
    >
      <el-row type="flex">
        <el-form-item v-if="auth.add">
          <el-button icon="el-icon-plus" @click="add" type="primary">{{
            $t("L00005")
          }}</el-button>
          <el-upload
            class="import-btn"
            :action="uploadUrl"
            name="excelFile"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" type="primary" icon="el-icon-upload2">{{
              $t("L30023")
            }}</el-button>
            <el-link
              class="ml10"
              target="_blank"
              type="primary"
              v-if="auth.add"
              v-preventReClick="3000"
              @click="exportTemplete()"
              >{{ $t("L00018") }}</el-link
            >
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="SN" class="inline-form" label-width="80px">
          <el-input :clearable="true" v-model="form.sn"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('MesSpotCheckWhitelist_AbleShoporder')"
          class="inline-form"
          label-width="80px"
        >
          <el-input :clearable="true" v-model="form.ableShoporder"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('MesSpotCheckWhitelist_Mpn')"
          class="inline-form"
          label-width="80px"
        >
          <el-input :clearable="true" v-model="form.mpn"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            clearable
            type="datetime"
            v-model="form.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            clearable
            type="datetime"
            v-model="form.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('MesSpotCheckWhitelist_Type')" prop="type">
          <el-select
            v-model="form.type"
            clearable
            :placeholder="$t('pleaseSelect')"
          >
            <el-option
              v-for="item in typeList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-preventReClick="3000"
            @click="search"
            type="primary"
            icon="el-icon-search"
            >{{ $t("L00002") }}</el-button
          >
          <el-button @click="reset" icon="el-icon-refresh-right">{{
            $t("L00013")
          }}</el-button>
          <el-button
            v-if="auth.export"
            v-preventReClick="3000"
            type="primary"
            icon="el-icon-download"
            @click="fExport()"
          >
            {{ $t("L00008") }}
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- 表格 @selection-change="handleSelectionChange" row-style="height:20px" -->
    <el-table
      header-row-class-name="nowrap"
      stripe
      border
      height="300"
      :row-style="{ height: '40px' }"
      :cell-style="{ padding: '0px' }"
      :data="list"
      :loading="true"
      style="width: 100%"
    >
      <el-table-column
        v-if="auth.edit || auth.delete"
        align="center"
        fixed="left"
        :label="$t('L00019')"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            v-if="auth.edit"
            @click.native="edit(scope.row)"
            :title="$t('L40015')"
            type="text"
            size="medium"
            icon="el-icon-edit"
          >
          </el-button>
          <el-button
            v-if="auth.delete"
            @click.native="del(scope.row)"
            :title="$t('L40016')"
            type="text"
            size="medium"
            icon="el-icon-delete"
          >
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="type"
        :label="$t('MesSpotCheckWhitelist_Type')"
        :formatter="typeFormate"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="sn"
        :label="$t('MesSpotCheckWhitelist_Sn')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="matSn"
        label="物料SN"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="ableShoporder"
        :label="$t('MesSpotCheckWhitelist_AbleShoporder')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="mpn"
        :label="$t('MesSpotCheckWhitelist_Mpn')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="status"
        :formatter="statusFormat"
        :label="$t('MesSpotCheckWhitelist_Status')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="ableOther"
        label="可收录其他工单SN"
        :formatter="ableOtherFormat"
        width="100"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="ncItem"
        :label="$t('MesSpotCheckWhitelist_NcItem')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="ableCountry"
        :label="$t('MesSpotCheckWhitelist_AbleCountry')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="checkProcess"
        :label="$t('MesSpotCheckWhitelist_CheckProcess')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="judgePerson"
        :label="$t('MesSpotCheckWhitelist_JudgePerson')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="defectSize"
        :label="$t('MesSpotCheckWhitelist_DefectSize')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="teamInfo"
        :label="$t('MesSpotCheckWhitelist_TeamInfo')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="message"
        :label="$t('MesSpotCheckWhitelist_Message')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="createName"
        :label="$t('createName')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="createTime"
        :label="$t('createTime')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="updateName"
        :label="$t('updateName')"
        width="150"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="updateTime"
        :label="$t('updateTime')"
        width="150"
      >
      </el-table-column>
    </el-table>
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
    <div id="completeDiv">
      <iframe
        id="sfrm"
        height="500"
        width="100%"
        style="display: none"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "cusSpotCheckWhitelist",
  created() {
    this.getAuth(this.$route.path);
    this.uploadUrl = this.$http.baseUrl.concat(
      `${this.$http.project}/mes/api/mesSpotCheckWhitelist/importExcel?token=`,
      this.$http.token
    );
    this.downloadUrl =
      this.$http.baseUrl +
      `${this.$http.project}/mes/api/mesSpotCheckWhitelist/`;
    let cache = this.$root.getPageCache(this.$route.path);
    if (cache) {
      this.pageSize = cache.pageSize;
      this.currentPage = cache.currentPage;
      this.form = cache.form;
    }
    this.getPage();
  },
  watch: {
    "$root.screenSize": function () {
      this.$root.resizeTable();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$root.resizeTable();
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      form: {
        sn: "",
        type: "",
        ableShoporder: "",
        mpn: "",
        classify: "1",
        startTime: "",
        endTime: "",
      },
      uploadUrl: "",
      downloadUrl: "",
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      auth: {
        add: false || !this.$root.authCheck,
        edit: false || !this.$root.authCheck,
        delete: false || !this.$root.authCheck,
        export: false || !this.$root.authCheck,
      },
      typeList: [
        {
          label: "PAC",
          value: "0",
        },
        {
          label: `${this.$t("L41703")}`,
          value: "1",
        },
        {
          label: `${this.$t("L41704")}`,
          value: "2",
        },
        {
          label: "物料SN+工单",
          value: "5",
        },
      ],
    };
  },
  methods: {
    getAuth(val) {
      let pageAuth = this.$root.findMenuItem(val, this.$root.auth);
      if (pageAuth && pageAuth.subs && pageAuth.subs.length) {
        pageAuth.subs.forEach((el) => {
          let authTag = el.index.startsWith("/")
            ? el.index.substring(1)
            : el.index;
          authTag = authTag.split("/");
          authTag = authTag.length > 1 ? authTag[1] : authTag[0];
          this.auth[authTag] = true;
          if (authTag == "add") {
            this.getAuth(el.index.startsWith("/") ? el.index : "/" + el.index);
          }
        });
      }
    },
    search() {
      this.currentPage = 1;
      this.getPage();
    },
    getPage() {
      this.$http.showLoading = true;
      this.$http
        .getPage(
          "mesSpotCheckWhitelist",
          this.form,
          this.currentPage,
          this.pageSize
        )
        .then((response) => {
          this.list = response.DATA;
          this.total = response.total;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPage();
    },
    reset() {
      this.form.sn = "";
      this.form.type = "";
      this.form.ableShoporder = "";
      this.form.mpn = "";
      this.form.startTime = "";
      this.form.endTime = "";
      this.getPage();
    },
    fExport() {
      try {
        var param = JSON.stringify(this.form);
        var token = this.$http.token;
        var url = this.downloadUrl.concat(
          "export",
          "?token=",
          token,
          "&param=",
          param
        );
        document.all.sfrm.src = encodeURI(url);
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    exportTemplete() {
      var token = this.$http.token;
      var url = this.downloadUrl.concat("exportTemplete", "?token=", token);
      document.all.sfrm.src = encodeURI(url);
    },
    handleUploadSuccess(response, file, fileList) {
      if (response.RESULT === "PASS") {
        this.$message({
          message: file.name.concat(this.$t("L00023")),
          type: "success",
        });
        this.currentPage = 1;
        this.getPage();
      } else {
        this.$message.error(this.$t("L00030") + response.MESSAGE);
      }
      fileList.splice(0);
    },
    beforeUpload(file) {
      const isExcel = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(file.type);
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isExcel) {
        this.$message.error(this.$t("L00028"));
      }
      if (!isLt1M) {
        this.$message.error(this.$t("L00029"));
      }
      return isExcel && isLt1M;
    },
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    del(item) {
      this.$confirm(
        this.$t("deleteConfirm", { key: item.title }),
        this.$t("L00010"),
        {
          confirmButtonText: this.$t("L00004"),
          cancelButtonText: this.$t("L00007"),
          type: "warning",
        }
      ).then(() => {
        this.$http.removeById("mesSpotCheckWhitelist", item.id).then(() => {
          this.$message.success(this.$t("L40009"));
          this.currentPage = 1;
          this.getPage();
        });
      });
    },
    edit(item) {
      this.$root.addPageCache(this.$route.path, {
        form: this.form,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      if (item && item.id) {
        this.$router.push({ path: `/cusSpotCheckWhitelist/edit/${item.id}` });
      }
    },
    add() {
      this.$root.addPageCache(this.$route.path, {
        form: this.form,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      this.$router.push({ path: `/cusSpotCheckWhitelist/add/0` });
    },
    statusFormat(row) {
      if (row.status == "0") {
        return `${this.$t("L41702")}`;
      } else if (row.status == "1") {
        return `${this.$t("L41701")}`;
      }
    },
    typeFormate(row) {
      if (row.type == "0") {
        return "PAC";
      } else if (row.type == "1") {
        return `${this.$t("L41703")}`;
      } else if (row.type == "2") {
        return `${this.$t("L41704")}`;
      } else if (row.type == "3") {
        return `${this.$t("L41705")}`;
      } else if (row.type == "4") {
        return `${this.$t("L41706")}`;
      } else if (row.type == "5") {
        return "物料SN+工单";
      } else {
        return row.type;
      }
    },
    ableOtherFormat(row) {
      if (row.ableOther == "0") {
        return "是";
      } else if (row.ableOther == "1") {
        return "否";
      } else {
        return row.ableOther;
      }
    },
  },
};
</script>
