<!--
@author: xuweijie
@since : 2021-05-08 15:28:13
-->
<template>
  <div class="cusSpotCheckWhitelistPallet">
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item :label="$t('MesSpotCheckWhitelist_Type')" prop="type">
        <el-select
          v-model="form.type"
          clearable
          filterable
          :placeholder="$t('pleaseSelect')"
          style="width: 500px"
          @change="changeType"
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

      <el-form-item
        v-if="form.type != '5'"
        :label="$t('MesSpotCheckWhitelist_Sn')"
        prop="sn"
      >
        <el-input v-model="form.sn" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item v-if="form.type == '5'" label="物料SN" prop="matSn">
        <el-input v-model="form.matSn" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item
        v-if="form.type == '1' || form.type == '5'"
        :label="$t('MesSpotCheckWhitelist_AbleShoporder')"
        prop="ableShoporder"
      >
        <el-input v-model="form.ableShoporder" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '2'"
        :label="$t('MesSpotCheckWhitelist_Mpn')"
        prop="mpn"
      >
        <el-input v-model="form.mpn" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item
        v-if="form.type != '0'"
        label="可收录其他工单SN"
        prop="ableOther"
      >
        <el-select
          v-model="form.ableOther"
          clearable
          filterable
          :placeholder="$t('pleaseSelect')"
          style="width: 500px"
        >
          <el-option
            v-for="item in ableOtherList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_NcItem')"
        prop="ncItem"
      >
        <el-input v-model="form.ncItem" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_AbleCountry')"
        prop="ableCountry"
      >
        <el-input v-model="form.ableCountry" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_DefectSize')"
        prop="defectSize"
      >
        <el-input v-model="form.defectSize" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_CheckProcess')"
        prop="checkProcesses"
      >
        <el-select
          v-model="form.checkProcesses"
          collapse-tags
          clearable
          filterable
          :filter-method="processListFilterMethod"
          multiple
          :placeholder="$t('pleaseSelect')"
          style="width: 500px"
        >
          <el-option
            v-for="item in processListFilter"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_JudgePerson')"
        prop="judgePerson"
      >
        <el-input v-model="form.judgePerson" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_TeamInfo')"
        prop="teamInfo"
      >
        <el-input v-model="form.teamInfo" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item
        v-if="form.type == '0'"
        :label="$t('MesSpotCheckWhitelist_Message')"
        prop="message"
      >
        <el-input v-model="form.message" style="width: 500px"></el-input>
      </el-form-item>

      <el-form-item :label="$t('MesSpotCheckWhitelist_Status')" prop="status">
        <el-select
          v-model="form.status"
          clearable
          filterable
          :placeholder="$t('pleaseSelect')"
          style="width: 500px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="$route.params.item == 'add' || authDo"
          type="primary"
          @click="checkform"
          >{{ $t("L00006") }}</el-button
        >
        <el-button @click="goback">{{ $t("L00007") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "cusSpotCheckWhitelistPallet",
  created() {
    this.actionType = this.$route.params.item;
    if (this.actionType != "add") {
      this.getAuth();
      this.load(this.$route.params.id);
    } else {
      this.form.type = "1";
      this.form.status = "1";
      this.form.ableOther = "0";
    }
    this.getProcessList();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {},
  data() {
    return {
      form: {
        sn: "",
        status: "",
        type: "",
        ableShoporder: "",
        mpn: "",
        ableOther: "",
        ncItem: "",
        ableCountry: "",
        defectSize: "",
        checkProcesses: [],
        judgePerson: "",
        teamInfo: "",
        message: "",
        matSn: "",
      },
      actionType: "",
      rules: {
        sn: [{ required: true, message: this.$t("L30046"), trigger: "blur" }],
        matSn: [
          { required: true, message: this.$t("L30046"), trigger: "blur" },
        ],
        status: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
        ableShoporder: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
        type: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
        mpn: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
        ableOther: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
        ncItem: [
          { required: true, message: this.$t("L30046"), trigger: "blur" },
        ],
        ableCountry: [
          { required: true, message: this.$t("L30046"), trigger: "blur" },
        ],
        checkProcesses: [
          { required: true, message: this.$t("L30046"), trigger: "change" },
        ],
      },
      editObj: {},
      authDo: false || !this.$root.authCheck,
      processList: [],
      processListFilter: [],
      statusList: [
        {
          label: `${this.$t("L41701")}`,
          value: "1",
        },
        {
          label: `${this.$t("L41702")}`,
          value: "0",
        },
      ],
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
      ableOtherList: [
        {
          label: "是",
          value: "0",
        },
        {
          label: "否",
          value: "1",
        },
      ],
    };
  },
  methods: {
    getAuth() {
      let pageAuth = this.$root.findMenuItem(
        this.$root.getMatchedPath(this.$route),
        this.$root.auth
      );
      if (pageAuth && pageAuth.subs && pageAuth.subs.length) {
        this.authDo = true;
      }
    },
    load(id) {
      this.$http.getById("mesSpotCheckWhitelist", id).then((response) => {
        if (response.RESULT == "PASS") {
          this.editObj = response.DATA;
          this.form.sn = response.DATA.sn;
          this.form.status = response.DATA.status;
          this.form.ncItem = response.DATA.ncItem;
          this.form.ableCountry = response.DATA.ableCountry;
          this.form.checkProcess = response.DATA.checkProcess;
          this.form.type = response.DATA.type;
          this.form.defectSize = response.DATA.defectSize;
          this.form.judgePerson = response.DATA.judgePerson;
          this.form.teamInfo = response.DATA.teamInfo;
          this.form.message = response.DATA.message;
          this.form.ableShoporder = response.DATA.ableShoporder;
          this.form.ableOther = response.DATA.ableOther;
          this.form.mpn = response.DATA.mpn;
          this.form.matSn = response.DATA.matSn;
          this.form.checkProcesses = response.DATA.checkProcess.split(";");
        } else {
          alert(response.DATA);
        }
      });
    },
    checkform() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.save();
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    save() {
      this.editObj.sn = this.form.sn;
      this.editObj.ncItem = this.form.ncItem;
      this.editObj.ableCountry = this.form.ableCountry;
      this.editObj.checkProcesses = this.form.checkProcesses;
      this.editObj.type = this.form.type;
      this.editObj.judgePerson = this.form.judgePerson;
      this.editObj.defectSize = this.form.defectSize;
      this.editObj.teamInfo = this.form.teamInfo;
      this.editObj.message = this.form.message;
      this.editObj.ableShoporder = this.form.ableShoporder;
      this.editObj.mpn = this.form.mpn;
      this.editObj.classify = "1"; //当前页面默认为'1' BYD为'B'
      this.editObj.status = this.form.status;
      if (this.form.type == "0") {
        this.editObj.ableOther = "";
      } else {
        this.editObj.ableOther = this.form.ableOther;
      }
      this.editObj.matSn = this.form.matSn;
      if (this.actionType == "add") {
        this.$http
          .save("mesSpotCheckWhitelist", this.editObj)
          .then((response) => {
            if (response.RESULT == "PASS") {
              this.$message.success(this.$t("L40005"));
              this.goback();
            } else alert(response.DATA);
          });
      } else {
        this.$http
          .updateById("mesSpotCheckWhitelist", this.editObj)
          .then((response) => {
            if (response.RESULT == "PASS") {
              this.$message.success(this.$t("L40006"));
              this.goback();
            } else alert(response.DATA);
          });
      }
    },
    goback() {
      this.$router.push({ path: `/cusSpotCheckWhitelists` });
    },
    changeType() {
      this.form.sn = "";
      this.form.ncItem = "";
      this.form.ableCountry = "";
      this.form.checkProcess = "";
      this.form.ableShoporder = "";
      this.form.ableMatNo = "";
      this.form.defectSize = "";
      this.form.judgePerson = "";
      this.form.teamInfo = "";
      this.form.message = "";
      this.form.classify = "";
      this.form.mpn = "";
      this.form.originalShoporder = "";
      this.form.mpn = "";
      this.form.checkProcesses = [];
    },
    getProcessList() {
      this.$http.getList("mesProcess", {}).then((res) => {
        this.processList = res.DATA;
        this.processListFilter = this.processList.slice(0, 30);
      });
    },
    processListFilterMethod(qs) {
      this.processListFilter = qs
        ? this.processList
            .filter((el) => {
              return el.name.indexOf(qs) > -1;
            })
            .slice(0, 30)
        : this.processList.slice(0, 30);
    },
  },
};
</script>
