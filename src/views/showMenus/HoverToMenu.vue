<!--
@author: chen.liuyong
@since : 2023/01/03
@description: HoverToMenu
-->
<template>
  <div class="hoverToMenu">
    <div class="top-bar">
      <div v-for="(item, index) in firstRoutes" :key="item.$index" class="my-menu" :class="{ 'my-menu-hover': curMenuShow && index === curMenuIndex }" @mouseenter="switchRoute(item.path, index)">
        <a v-if="item.meta.link" :href="item.meta.link">{{ item.meta.title }}</a>
        <el-popover placement="bottom" popper-class="hover-to-menu-pop" title="Title" :width="200" trigger="hover" content="" transition="none" ref="popoverRef" v-else>
          <template #reference>
            <el-button class="m-2">{{ item.meta.title }}</el-button>
          </template>
          <div class="wrapper" @mouseleave="leave">
            <div v-for="item in activeRouteMenus" :key="item.$index" class="sub-wrapper">
              <div class="title" @click="goRoute(item.path)">
                <a v-if="item.meta.link" :href="item.meta.link">{{ item.meta.title }}</a>
                <span v-else @click="goRoute(item.path)">{{ item.meta.title }}</span>
              </div>
              <div class="content" v-for="i in item.children || []" :key="i.$index">
                <div class="sub-title">
                  <a v-if="i.meta.link" :href="i.meta.link">{{ i.meta.title }}</a>
                  <span v-else @click="goRoute(item.path + '/' + i.path)">{{ i.meta.title }}</span>
                </div>
                <div class="sub-content" v-for="k in i.children || []" :key="k.$index" @click="goRoute(item.path + '/' + i.path + '/' + k.path)">
                  <a v-if="k.meta.link" :href="k.meta.link">{{ k.meta.title }}</a>
                  <span v-else @click="goRoute(item.path + '/' + i.path + '/' + k.path)">{{ k.meta.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hoverToMenu",
  created() {
    this.init();
    this.curMenuShow = false;
  },
  mounted() {
    // window.addEventListener("resize", () => {
    //   this.visibleNumber = parseInt(document.body.getBoundingClientRect().width / 3 / 85);
    // });
  },
  data() {
    return {
      // visibleNumber: parseInt(document.body.getBoundingClientRect().width / 3 / 85),
      allRoutes: [],
      firstRoutes: [],
      activeRouteMenus: [],
      curMenuIndex: 0,
      curMenuPath: "",
      curMenuShow: false,
      showSlide: false,
    };
  },
  activated() {
    this.curMenuShow = false;
  },
  methods: {
    leave() {
      this.curMenuShow = false;
    },
    switchRoute(path, index) {
      this.curMenuIndex = index;
      this.curMenuShow = true;
      this.curMenuPath = path;
      this.activeRouteMenus = this.allRoutes.find((el) => el.path === path).children;
    },
    init() {
      this.firstRoutes = this.allRoutes = this.getRoutesData().data;
      // this.firstRoutes.unshift({
      //   name: "Index",
      //   path: "/index",
      //   hidden: false,
      //   component: () => import("@/views/index"),
      //   meta: {
      //     title: "首页",
      //     icon: "dashboard",
      //     link: null,
      //   },
      // });
    },
    goRoute(path) {
      this.$refs.popoverRef.forEach((item) => item.hide());
      this.$router.push(this.curMenuPath + "/" + path);
    },
    getRoutesData() {
      return {
        msg: "操作成功",
        code: 200,
        data: [
          {
            name: "1",
            path: "/1",
            hidden: false,
            component: "Layout",
            meta: {
              title: "大屏BI",
              icon: "monitor",
              noCache: false,
              link: null,
            },
          },
          {
            name: "Base",
            path: "/base",
            hidden: false,
            redirect: "noRedirect",
            component: "Layout",
            alwaysShow: true,
            meta: {
              title: "生产管理",
              icon: "druid",
              noCache: false,
              link: null,
            },
            children: [
              {
                name: "BasicProductionInfo",
                path: "basicProductionInfo",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "生产基础信息",
                  icon: "education",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "3",
                    path: "3",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "产品项目料号关系",
                      icon: "tab",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "OutputReport",
                path: "outputReport",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "产出报表",
                  icon: "example",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "2",
                    path: "2",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "线体产出分时报表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "1",
                    path: "1",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "线体产出汇总报表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "OperationManagement",
            path: "/operationManagement",
            hidden: false,
            redirect: "noRedirect",
            component: "Layout",
            alwaysShow: true,
            meta: {
              title: "经营管理",
              icon: "log",
              noCache: false,
              link: null,
            },
            children: [
              {
                name: "Produce",
                path: "produce",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "项目人均产出",
                  icon: "build",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "ReportOutputManpowerDayT",
                    path: "reportOutputManpowerDayT",
                    hidden: false,
                    component: "operationManagement/produce/reportOutputManpowerDayT/index",
                    meta: {
                      title: "产出人力报表",
                      icon: "chart",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ReportOutputManpowerDay",
                    path: "reportOutputManpowerDay",
                    hidden: false,
                    component: "operationManagement/produce/reportOutputManpowerDay/index",
                    meta: {
                      title: "产出实时报表",
                      icon: "server",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "SectionInOutputRule",
                    path: "sectionInOutputRule",
                    hidden: false,
                    component: "operationManagement/produce/sectionInOutputRule/index",
                    meta: {
                      title: "配置工段投入产出规则",
                      icon: "documentation",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "CustomerModelMaterialNo",
                    path: "customerModelMaterialNo",
                    hidden: false,
                    component: "operationManagement/produce/customerModelMaterialNo/index",
                    meta: {
                      title: "客户机型料号关系",
                      icon: "phone",
                      noCache: true,
                      link: null,
                    },
                  },
                  {
                    name: "ConfigProductPrice",
                    path: "configProductPrice",
                    hidden: false,
                    component: "operationManagement/produce/configProductPrice/index",
                    meta: {
                      title: "配置产品价格",
                      icon: "money",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ReportOutputManpowerDayBase",
                    path: "reportOutputManpowerDayBase",
                    hidden: false,
                    component: "operationManagement/produce/reportOutputManpowerDayBase/index",
                    meta: {
                      title: "产出人力-基础数据",
                      icon: "build",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ReportOutputManpower",
                    path: "reportOutputManpower",
                    hidden: false,
                    component: "operationManagement/produce/reportOutputManpower/index",
                    meta: {
                      title: "产出实时-基础数据",
                      icon: "build",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Staff",
            path: "/staff",
            hidden: false,
            redirect: "noRedirect",
            component: "Layout",
            alwaysShow: true,
            meta: {
              title: "人员管理",
              icon: "peoples",
              noCache: false,
              link: null,
            },
            children: [
              {
                name: "PostNatureConfig",
                path: "postNatureConfig",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "岗位性质配置",
                  icon: "tab",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "BusinessTypeConfigForm",
                    path: "businessTypeConfigForm",
                    hidden: false,
                    component: "staff/postNatureConfig/businessTypeConfigForm/index",
                    meta: {
                      title: "业务类型配置表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "OrganizationConfigForm",
                    path: "organizationConfigForm",
                    hidden: false,
                    component: "staff/postNatureConfig/organizationConfigForm/index",
                    meta: {
                      title: "编制配置表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "SequenceCategoryForm",
                    path: "sequenceCategoryForm",
                    hidden: false,
                    component: "staff/postNatureConfig/sequenceCategoryForm/index",
                    meta: {
                      title: "序列类别表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "RealityStationForm",
                    path: "realityStationForm",
                    hidden: false,
                    component: "staff/postNatureConfig/realityStationForm/index",
                    meta: {
                      title: "实际岗位表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "WorkPlaceConfigForm",
                    path: "workPlaceConfigForm",
                    hidden: false,
                    component: "staff/postNatureConfig/workPlaceConfigForm/index",
                    meta: {
                      title: "工作地点配置表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "StaffInfoEnter",
                path: "staffInfoEnter",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "人员信息录入",
                  icon: "input",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "BusinessTypeMaintainForm",
                    path: "businessTypeMaintainForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/businessTypeMaintainForm/index",
                    meta: {
                      title: "业务类型维护表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "OrganizationMaintainForm",
                    path: "organizationMaintainForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/organizationMaintainForm/index",
                    meta: {
                      title: "编制维护表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "StationInconformityForm",
                    path: "stationInconformityForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/stationInconformityForm/index",
                    meta: {
                      title: "岗位不符表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "WorkPlaceMaintainForm",
                    path: "workPlaceMaintainForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/workPlaceMaintainForm/index",
                    meta: {
                      title: "工作地点维护表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "StandardLineForm",
                    path: "standardLineForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/standardLineForm/index",
                    meta: {
                      title: "标准线体表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "SecondmentForm",
                    path: "secondmentForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/secondmentForm/index",
                    meta: {
                      title: "借调表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "LeaveForm",
                    path: "leaveForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/leaveForm/index",
                    meta: {
                      title: "请假表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "StaffClassMaintainForm",
                    path: "staffClassMaintainForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/staffClassMaintainForm/index",
                    meta: {
                      title: "人员班次维护表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "RemarksTwoForm",
                    path: "remarksTwoForm",
                    hidden: false,
                    component: "staff/staffInfoEnter/remarksTwoForm/index",
                    meta: {
                      title: "品质人员挂靠表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "Attendance",
                path: "attendance",
                hidden: true,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "考勤统计报表",
                  icon: "time",
                  noCache: true,
                  link: null,
                },
                children: [
                  {
                    name: "VtMonthStsContinueRest",
                    path: "vtMonthStsContinueRest",
                    hidden: false,
                    component: "manpower/vtMonthStsContinueRest/index",
                    meta: {
                      title: "科室各级别人数统计",
                      icon: "slider",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "StaffInfoConfig",
                path: "staffInfoConfig",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "人员信息配置",
                  icon: "radio",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "FreshmanForm",
                    path: "freshmanForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/freshmanForm/index",
                    meta: {
                      title: "应届生届别表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "PutPeopleForm",
                    path: "putPeopleForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/putPeopleForm/index",
                    meta: {
                      title: "提报人配置表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "AgeForm",
                    path: "ageForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/ageForm/index",
                    meta: {
                      title: "人员年龄表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "DirectLeadershipForm",
                    path: "directLeadershipForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/directLeadershipForm/index",
                    meta: {
                      title: "直接领导表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ResignationForm",
                    path: "resignationForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/resignationForm/index",
                    meta: {
                      title: "离职表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "TransferForm",
                    path: "transferForm",
                    hidden: false,
                    component: "staff/staffInfoConfig/transferForm/index",
                    meta: {
                      title: "调动表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "StaffStatisticsReport",
                path: "staffStatisticsReport",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "人力统计报表",
                  icon: "edit",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "Report",
                    path: "report",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "人员出勤总表",
                      icon: "education",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtDayStsDeptAttendence",
                    path: "vtDayStsDeptAttendence",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtDayStsDeptAttendence/index",
                    meta: {
                      title: "人员出勤统计表",
                      icon: "date",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtDayStsProjectAttend",
                    path: "vtDayStsProjectAttend",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtDayStsProjectAttend/index",
                    meta: {
                      title: "分项目出勤统计表",
                      icon: "excel",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtDayStsBusiAttend",
                    path: "vtDayStsBusiAttend",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtDayStsBusiAttend/index",
                    meta: {
                      title: "分业务出勤统计表",
                      icon: "textarea",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtMonthStsBusiAttend",
                    path: "vtMonthStsBusiAttend",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtMonthStsBusiAttend/index",
                    meta: {
                      title: "分业务每日在册出勤统计表",
                      icon: "date",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtMonthStsEmployAttend",
                    path: "vtMonthStsEmployAttend",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtMonthStsEmployAttend/index",
                    meta: {
                      title: "出勤天数统计表",
                      icon: "peoples",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Report",
                    path: "report",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "出勤天数总表",
                      icon: "date-range",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtMonthStsDeptDimission",
                    path: "vtMonthStsDeptDimission",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtMonthStsDeptDimission/index",
                    meta: {
                      title: "离职率统计表",
                      icon: "people",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "VtMonthStsLineDimission",
                    path: "vtMonthStsLineDimission",
                    hidden: false,
                    component: "staff/staffStatisticsReport/vtMonthStsLineDimission/index",
                    meta: {
                      title: "分线体离职率统计表",
                      icon: "slider",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "IeStandardConfig",
                path: "ieStandardConfig",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "IE人力标配",
                  icon: "education",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "PlanStartLine",
                    path: "planStartLine",
                    hidden: false,
                    component: "staff/ieStandardConfig/planStartLine/index",
                    meta: {
                      title: "计划开线线体",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "DirectManpowerStandard",
                    path: "directManpowerStandard",
                    hidden: false,
                    component: "staff/ieStandardConfig/directManpowerStandard/index",
                    meta: {
                      title: "直接人力标准",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "IndirectManpowerStandard",
                    path: "indirectManpowerStandard",
                    hidden: false,
                    component: "staff/ieStandardConfig/indirectManpowerStandard/index",
                    meta: {
                      title: "间接人力标准",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "3",
                    path: "3",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "区域人力分析",
                      icon: "select",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "DirectDeptConfigForm",
                    path: "directDeptConfigForm",
                    hidden: false,
                    component: "base/people/directDeptConfigForm/index",
                    meta: {
                      title: "直接人力科室配置表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "2",
                    path: "2",
                    hidden: false,
                    component: "ParentView",
                    meta: {
                      title: "各部门人员配置统计",
                      icon: "input",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "StaffAttendanceEntry",
                path: "staffAttendanceEntry",
                hidden: true,
                component: "ParentView",
                meta: {
                  title: "员工考勤录入",
                  icon: "documentation",
                  noCache: false,
                  link: null,
                },
              },
              {
                name: "Qualify",
                path: "qualify",
                hidden: true,
                component: "staff/qualify/index",
                meta: {
                  title: "人员资质",
                  icon: "validCode",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "Manpower",
                path: "manpower",
                hidden: true,
                component: "staff/manpower/index",
                meta: {
                  title: "项目人力",
                  icon: "user",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "Uppd",
                path: "uppd",
                hidden: true,
                component: "staff/uppd/index",
                meta: {
                  title: "UPPD计算",
                  icon: "table",
                  noCache: true,
                  link: null,
                },
              },
            ],
          },
          {
            name: "Device",
            path: "/device",
            hidden: false,
            redirect: "noRedirect",
            component: "Layout",
            alwaysShow: true,
            meta: {
              title: "设备管理",
              icon: "redis-list",
              noCache: false,
              link: null,
            },
            children: [
              {
                name: "State",
                path: "state",
                hidden: true,
                component: "device/state/index",
                meta: {
                  title: "设备状态",
                  icon: "redis-list",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "Oee",
                path: "oee",
                hidden: true,
                component: "device/oee/index",
                meta: {
                  title: "OEE",
                  icon: "tool",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "Param",
                path: "param",
                hidden: true,
                component: "device/param/index",
                meta: {
                  title: "设备参数",
                  icon: "dict",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "EnergyStatis",
                path: "energyStatis",
                hidden: true,
                component: "device/energyStatis/index",
                meta: {
                  title: "能耗统计",
                  icon: "server",
                  noCache: true,
                  link: null,
                },
              },
              {
                name: "LineElectricConsumption",
                path: "lineElectricConsumption",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "线体电力能耗",
                  icon: "build",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "LineParam",
                    path: "LineParam",
                    hidden: false,
                    component: "device/lineElectricConsumption/LineParam/index",
                    meta: {
                      title: "线体能耗标准配置",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Report",
                    path: "report",
                    hidden: false,
                    component: "device/lineElectricConsumption/report/index",
                    meta: {
                      title: "线体能耗报表",
                      icon: "build",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "DataConfig",
                    path: "dataConfig",
                    hidden: true,
                    component: "ParentView",
                    meta: {
                      title: "基础数据配置",
                      icon: "edit",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ElectricParam",
                    path: "electricParam",
                    hidden: false,
                    component: "device/lineElectricConsumption/electricParam/index",
                    meta: {
                      title: "电表原始数据表",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "ElectricityCorrespond",
                    path: "ElectricityCorrespond",
                    hidden: false,
                    component: "device/lineElectricConsumption/ElectricityCorrespond/index",
                    meta: {
                      title: "线体电表配置",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "DailyProductionPlan",
                    path: "DailyProductionPlan",
                    hidden: false,
                    component: "device/lineElectricConsumption/DailyProductionPlan/index",
                    meta: {
                      title: "线体排产配置",
                      icon: "table",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "1",
            path: "/1",
            hidden: false,
            component: "Layout",
            meta: {
              title: "仓储管理",
              icon: "code",
              noCache: false,
              link: null,
            },
          },
          {
            name: "SystemConfig",
            path: "/systemConfig",
            hidden: false,
            redirect: "noRedirect",
            component: "Layout",
            alwaysShow: true,
            meta: {
              title: "系统配置",
              icon: "switch",
              noCache: false,
              link: null,
            },
            children: [
              {
                name: "System",
                path: "system",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "系统管理",
                  icon: "system",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "User",
                    path: "user",
                    hidden: false,
                    component: "system/user/index",
                    meta: {
                      title: "用户管理",
                      icon: "user",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Role",
                    path: "role",
                    hidden: false,
                    component: "system/role/index",
                    meta: {
                      title: "角色管理",
                      icon: "peoples",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Menu",
                    path: "menu",
                    hidden: false,
                    component: "system/menu/index",
                    meta: {
                      title: "菜单管理",
                      icon: "tree-table",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Dept",
                    path: "dept",
                    hidden: false,
                    component: "system/dept/index",
                    meta: {
                      title: "部门管理",
                      icon: "tree",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Post",
                    path: "post",
                    hidden: false,
                    component: "system/post/index",
                    meta: {
                      title: "岗位管理",
                      icon: "post",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Dict",
                    path: "dict",
                    hidden: false,
                    component: "system/dict/index",
                    meta: {
                      title: "字典管理",
                      icon: "dict",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Config",
                    path: "config",
                    hidden: false,
                    component: "system/config/index",
                    meta: {
                      title: "参数设置",
                      icon: "edit",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Notice",
                    path: "notice",
                    hidden: false,
                    component: "system/notice/index",
                    meta: {
                      title: "通知公告",
                      icon: "message",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Log",
                    path: "log",
                    hidden: false,
                    redirect: "noRedirect",
                    component: "ParentView",
                    alwaysShow: true,
                    meta: {
                      title: "日志管理",
                      icon: "log",
                      noCache: false,
                      link: null,
                    },
                    children: [
                      {
                        name: "Operlog",
                        path: "operlog",
                        hidden: false,
                        component: "monitor/operlog/index",
                        meta: {
                          title: "操作日志",
                          icon: "form",
                          noCache: false,
                          link: null,
                        },
                      },
                      {
                        name: "Logininfor",
                        path: "logininfor",
                        hidden: false,
                        component: "monitor/logininfor/index",
                        meta: {
                          title: "登录日志",
                          icon: "logininfor",
                          noCache: false,
                          link: null,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: "Tool",
                path: "tool",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "系统工具",
                  icon: "tool",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "Build",
                    path: "build",
                    hidden: false,
                    component: "tool/build/index",
                    meta: {
                      title: "表单构建",
                      icon: "build",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Gen",
                    path: "gen",
                    hidden: false,
                    component: "tool/gen/index",
                    meta: {
                      title: "代码生成",
                      icon: "code",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Swagger",
                    path: "swagger",
                    hidden: false,
                    component: "tool/swagger/index",
                    meta: {
                      title: "系统接口",
                      icon: "swagger",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
              {
                name: "Monitor",
                path: "monitor",
                hidden: false,
                redirect: "noRedirect",
                component: "ParentView",
                alwaysShow: true,
                meta: {
                  title: "系统监控",
                  icon: "monitor",
                  noCache: false,
                  link: null,
                },
                children: [
                  {
                    name: "Online",
                    path: "online",
                    hidden: false,
                    component: "monitor/online/index",
                    meta: {
                      title: "在线用户",
                      icon: "online",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Job",
                    path: "job",
                    hidden: false,
                    component: "monitor/job/index",
                    meta: {
                      title: "定时任务",
                      icon: "job",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Druid",
                    path: "druid",
                    hidden: false,
                    component: "monitor/druid/index",
                    meta: {
                      title: "Druid数据监控",
                      icon: "druid",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Server",
                    path: "server",
                    hidden: false,
                    component: "monitor/server/index",
                    meta: {
                      title: "服务监控",
                      icon: "server",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "Cache",
                    path: "cache",
                    hidden: false,
                    component: "monitor/cache/index",
                    meta: {
                      title: "缓存监控",
                      icon: "redis",
                      noCache: false,
                      link: null,
                    },
                  },
                  {
                    name: "CacheList",
                    path: "cacheList",
                    hidden: false,
                    component: "monitor/cache/list",
                    meta: {
                      title: "缓存列表",
                      icon: "redis-list",
                      noCache: false,
                      link: null,
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.hoverToMenu {
  height: 100%;
}
.top-bar {
  display: flex;
}
.my-menu {
  padding: 0 5px;
  overflow: hidden;
}
.my-menu:hover {
  border-bottom: 3px solid black;
  box-sizing: border-box;
}
.my-menu-hover {
  border-bottom: 3px solid black;
  box-sizing: border-box;
}
.wrapper {
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 20vh;
  max-height: 80vh;
  align-items: center;
  width: 100%;
  background-color: white;
  display: flex;
  padding-top: 20px;
}

.top-bar:hover + .wrapper {
  display: flex;
}
.wrapper:hover {
  display: flex;
}
.sub-wrapper {
  margin-bottom: 40px;
}
.title {
  height: 30px;
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
}
.content {
  /* width: 200px; */
  margin: 5px;
  margin-left: 20px;
}
.sub-content,
.sub-title {
  /* width: 200px; */
  /* height: 30px; */
  margin: 5px;
}
.sub-content {
  margin-left: 30px;
}
.title:hover,
.sub-title:hover,
.slide-menu:hover,
.sub-content:hover {
  background-color: rgb(247, 244, 244);
  cursor: pointer;
}
.slide-menu-list {
  position: fixed;
  left: 0;
  width: 100%;
}
</style>
<style>
.hover-to-menu-pop {
  left: 0 !important;
  width: auto !important;
  right: 10px !important;
}
.hover-to-menu-pop .el-popover__title {
  display: none;
}
</style>
