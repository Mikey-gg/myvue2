<!--
@author: chen.liuyong
@since : 2022/08/20
@description: generate the flex layout about the cnc layout map
-->
<template>
  <div class="page-name">
    <!-- <body style="background-color: #4b89a2"> -->
      <div id="main-name" class="mainC">
        <el-backtop target=".mainC">3121</el-backtop>
        <div id="logo"></div>
        <h1
          style="
            text-align: center;
            font-size: 40.001px;
            margin: 0;
            margin-right: 79.999px;
          "
        >
          中山工厂一车间{{ cabinetNo.substr(cabinetNo.length - 2) }}柜
        </h1>
        <div>
          <div
            style="
              clear: left;
              text-align: left;
              float: left;
              display: inline-block;
            "
          >
            <h3>开机状态</h3>
            <div>
              总机台数{{ machineStatus.sum }}&nbsp;&nbsp;开机率{{
                machineStatus.rate
              }}
            </div>
          </div>
          <div
            style="
              text-align: center;
              float: right;
              display: inline-block;
              margin-top: 30px;
            "
          >
            <div style="display: inline-block">
              <el-tag type="success" effect="dark">{{
                machineStatus.running
              }}</el-tag>
              <div>运行</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="info" effect="dark">{{
                machineStatus.outline
              }}</el-tag>
              <div>失联</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="danger" effect="dark">{{
                machineStatus.locking
              }}</el-tag>
              <div>锁机</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="warning" effect="dark">{{
                machineStatus.holding
              }}</el-tag>
              <div>待机</div>
            </div>
          </div>
        </div>
        <div style="clear: both; padding-top: 10.001px; text-align: center">
          <div
            v-for="idx in max.x"
            :key="idx.$index"
            style="margin: 4.999px 0px; height: 40.001px"
          >
            <div
              v-for="jdx in max.y"
              style="display: inline-block"
              :key="jdx.$index"
              :style="{ width: 99.9 / max.y + '%' }"
            >
              <div :key="item.$index" v-for="item in machineStatus.list">
                <div
                  style="display: inline-block"
                  v-if="item.x == idx - 1 && item.y == jdx - 1"
                >
                  <div style="width: 100%" :class="item.state">&nbsp;</div>
                  <div style="font-size: 13.999px">{{ item.location }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            height: 4.999px;
            background-color: #4b89a2;
            margin-top: 19.999px;
          "
        >
          &nbsp;
        </div>
        <div>
          <div style="text-align: left; float: left; display: inline-block">
            <h3>刀具状态</h3>
            <div style="color: #8c939d">
              例如：T2: 130中，T2代表刀号，130代表刀具剩余寿命
            </div>
            <div style="color: #8c939d">若有多把刀，则显示剩余寿命最小的刀</div>
          </div>
          <div
            style="
              text-align: center;
              float: right;
              display: inline-block;
              margin-top: 30px;
            "
          >
            <div
              style="display: inline-block; vertical-align: top; width: 70.001px"
            >
              色标显示已用寿命
            </div>
            <div style="display: inline-block">
              <el-tag type="success" effect="dark">{{
                propLift.enough
              }}</el-tag>
              <div>&lt;98%</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="warning" effect="dark">{{ propLift.less }}</el-tag>
              <div>98%~100%</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="danger" effect="dark">{{
                propLift.insufficient
              }}</el-tag>
              <div>=100%</div>
            </div>
            <div style="display: inline-block">
              <el-tag type="info" effect="dark">{{ propLift.notProp }}</el-tag>
              <div>无刀</div>
            </div>
          </div>
        </div>
        <div style="clear: both; padding-top: 10.001px; text-align: center">
          <div
            v-for="idx in max.x"
            :key="idx.$index"
            style="margin: 10.001px 0px; height: 40.001px"
          >
            <div
              v-for="jdx in max.y"
              :key="jdx.$index"
              style="display: inline-block"
              :style="{ width: 99.9 / max.y + '%' }"
            >
              <div :key="item.$index" v-for="item in propLift.list">
                <div
                  style="display: inline-block; width: 80%"
                  v-if="item.x == idx - 1 && item.y == jdx - 1"
                >
                  <div style="width: 100%" :class="item.state">
                    {{
                      item.propNo
                        ? item.propNo + ":" + item.surplusLife
                        : "&nbsp;"
                    }}
                  </div>
                  <div style="font-size: 13.999px">{{ item.location }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            width: 100%;
            height: 4.999px;
            background-color: #4b89a2;
            margin-top: 10.001px;
          "
        >
          &nbsp;
        </div>
        <div>
          <div
            style="
              width: 70%;
              display: inline-block;
              float: left;
              border-right: 4.999px solid;
              border-color: #4b89a2;
            "
          >
            <div style="text-align: left; float: left; display: inline-block">
              <h3 style="display: inline-block">柜体状态</h3>
              <el-button type="primary" size="small">切换副柜</el-button>
              <el-button type="primary" size="small"
                >{{ cabinetNo.substr(cabinetNo.length - 2) }} 主柜</el-button
              >
            </div>
            <div
              style="
                text-align: center;
                float: right;
                display: inline-block;
                margin-top: 16.999px;
              "
            >
              <div style="display: inline-block">
                <el-tag type="success" effect="dark">{{
                  cabinetStatus.newTools
                }}</el-tag>
                <div>新刀</div>
              </div>
              <div style="display: inline-block">
                <el-tag type="warning" effect="dark">{{
                  cabinetStatus.oldTools
                }}</el-tag>
                <div>旧刀</div>
              </div>
              <div style="display: inline-block">
                <el-tag type="danger" effect="dark">{{
                  cabinetStatus.errorTools
                }}</el-tag>
                <div>异常刀</div>
              </div>
              <div style="display: inline-block">
                <el-tag effect="dark" :style="{ backgroundColor: 'white' }">{{
                  cabinetStatus.emptyCabinet
                }}</el-tag>
                <div>空格</div>
              </div>
            </div>
            <div
              style="
                clear: both;
                text-align: center;
                border: 1.001px solid black;
                width: 90%;
                line-height: 25.001px;
              "
            >
              <div
                v-for="idx in cabinetStatus.max.x"
                style="display: inline-block"
                :key="idx.$index"
                :style="{ width: 100 / cabinetStatus.max.x + '%' }"
              >
                <div
                  v-for="jdx in cabinetStatus.max.y"
                  style="width: 100%"
                  :key="jdx.$index"
                >
                  <div
                    style="width: 100%"
                    :class="getCabinetStatusClass(idx, jdx)"
                  >
                    {{ getCabinetStatusHtml(idx, jdx) }}&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 25%; display: inline-block; float: right">
            <h3>库存预警</h3>
            <div style="text-align: left; margin-top: 10.001px">
              <div style="display: inline-block">
                <el-tag
                  type="success"
                  size="mini"
                  effect="dark"
                  :style="{ width: '49.999px' }"
                  >&nbsp;</el-tag
                >
                <div>库存>=30%</div>
              </div>
              <div style="display: inline-block">
                <el-tag
                  type="warning"
                  size="mini"
                  effect="dark"
                  :style="{ width: '49.999px' }"
                  >&nbsp;</el-tag
                >
                <div>库存 &lt; 30%</div>
              </div>
            </div>
            <div style="clear: both">
              <div
                style="margin-top: 10.001px"
                v-for="item in cabinetStatus.toolsStockList"
                :key="item.$index"
              >
                <el-tag :type="item.state" effect="dark">&nbsp;</el-tag>
                <span>{{ item.propNo }}: {{ item.newCount }}</span>
              </div>
            </div>
            <div style="float: bottom; margin-top: 15px">
              <el-switch
                v-model="autoRefresh"
                active-color="#13ce66"
                active-text="自动刷新"
                inactive-color="#ff4949"
              >
              </el-switch>
            </div>
          </div>
        </div>
      </div>
    <!-- </body> -->
  </div>
</template>

<script>
export default {
  name: "cncFlex",
  created() {
    this.getData();
  },
  data() {
    return {
      searching: false,
      cabinetNo: "${cabinetCode}",
      autoRefresh: false,
      max: {},
      machineStatus: {},
      propLift: {},
      cabinetStatus: {},
    };
  },
  methods: {
    getData: function () {
      var _this = this;
      _this.searching = true;

      try {
        this.axios
          .get(
            "/cnc/BydMachine.do?command=board4CabinetStock&withNoPwd=1&cabinetCode=ZS10202202"
          )
          .then((rsData) => {
            rsData = rsData = {
              machineStatus: {
                sum: 120,
                running: 2,
                holding: 94,
                outline: 0,
                locking: 24,
                rate: "1.67%",
                list: [
                  { location: "B-CNC3-51", state: "holding", x: 0, y: 0 },
                  { location: "B-CNC3-52", state: "holding", x: 0, y: 1 },
                  { location: "B-CNC3-53", state: "holding", x: 0, y: 2 },
                  { location: "B-CNC3-54", state: "holding", x: 0, y: 3 },
                  { location: "B-CNC3-55", state: "holding", x: 0, y: 4 },
                  { location: "B-CNC3-56", state: "holding", x: 0, y: 5 },
                  { location: "B-CNC3-57", state: "holding", x: 0, y: 6 },
                  { location: "B-CNC3-58", state: "locking", x: 0, y: 7 },
                  { location: "B-CNC3-59", state: "holding", x: 0, y: 8 },
                  { location: "B-CNC3-60", state: "holding", x: 0, y: 9 },
                  { location: "B-CNC3-41", state: "holding", x: 1, y: 0 },
                  { location: "B-CNC3-42", state: "holding", x: 1, y: 1 },
                  { location: "B-CNC3-43", state: "locking", x: 1, y: 2 },
                  { location: "B-CNC3-44", state: "holding", x: 1, y: 3 },
                  { location: "B-CNC3-45", state: "holding", x: 1, y: 4 },
                  { location: "B-CNC3-46", state: "holding", x: 1, y: 5 },
                  { location: "B-CNC3-47", state: "locking", x: 1, y: 6 },
                  { location: "B-CNC3-48", state: "locking", x: 1, y: 7 },
                  { location: "B-CNC3-49", state: "holding", x: 1, y: 8 },
                  { location: "B-CNC3-50", state: "holding", x: 1, y: 9 },
                  { location: "B-CNC3-31", state: "holding", x: 2, y: 0 },
                  { location: "B-CNC3-32", state: "holding", x: 2, y: 1 },
                  { location: "B-CNC3-33", state: "holding", x: 2, y: 2 },
                  { location: "B-CNC3-34", state: "locking", x: 2, y: 3 },
                  { location: "B-CNC3-35", state: "locking", x: 2, y: 4 },
                  { location: "B-CNC3-36", state: "holding", x: 2, y: 5 },
                  { location: "B-CNC3-37", state: "holding", x: 2, y: 6 },
                  { location: "B-CNC3-38", state: "locking", x: 2, y: 7 },
                  { location: "B-CNC3-39", state: "holding", x: 2, y: 8 },
                  { location: "B-CNC3-40", state: "holding", x: 2, y: 9 },
                  { location: "B-CNC3-21", state: "holding", x: 3, y: 0 },
                  { location: "B-CNC3-22", state: "holding", x: 3, y: 1 },
                  { location: "B-CNC3-23", state: "holding", x: 3, y: 2 },
                  { location: "B-CNC3-24", state: "holding", x: 3, y: 3 },
                  { location: "B-CNC3-25", state: "holding", x: 3, y: 4 },
                  { location: "B-CNC3-26", state: "holding", x: 3, y: 5 },
                  { location: "B-CNC3-27", state: "holding", x: 3, y: 6 },
                  { location: "B-CNC3-28", state: "holding", x: 3, y: 7 },
                  { location: "B-CNC3-29", state: "holding", x: 3, y: 8 },
                  { location: "B-CNC3-30", state: "locking", x: 3, y: 9 },
                  { location: "B-CNC3-11", state: "holding", x: 4, y: 0 },
                  { location: "B-CNC3-12", state: "holding", x: 4, y: 1 },
                  { location: "B-CNC3-13", state: "locking", x: 4, y: 2 },
                  { location: "B-CNC3-14", state: "locking", x: 4, y: 3 },
                  { location: "B-CNC3-15", state: "holding", x: 4, y: 4 },
                  { location: "B-CNC3-16", state: "holding", x: 4, y: 5 },
                  { location: "B-CNC3-17", state: "locking", x: 4, y: 6 },
                  { location: "B-CNC3-18", state: "holding", x: 4, y: 7 },
                  { location: "B-CNC3-19", state: "holding", x: 4, y: 8 },
                  { location: "B-CNC3-20", state: "locking", x: 4, y: 9 },
                  { location: "B-CNC3-01", state: "locking", x: 5, y: 0 },
                  { location: "B-CNC3-02", state: "locking", x: 5, y: 1 },
                  { location: "B-CNC3-03", state: "holding", x: 5, y: 2 },
                  { location: "B-CNC3-04", state: "holding", x: 5, y: 3 },
                  { location: "B-CNC3-05", state: "holding", x: 5, y: 4 },
                  { location: "B-CNC3-06", state: "holding", x: 5, y: 5 },
                  { location: "B-CNC3-07", state: "holding", x: 5, y: 6 },
                  { location: "B-CNC3-08", state: "locking", x: 5, y: 7 },
                  { location: "B-CNC3-09", state: "holding", x: 5, y: 8 },
                  { location: "B-CNC3-10", state: "holding", x: 5, y: 9 },
                  { location: "A-CNC3-51", state: "holding", x: 7, y: 0 },
                  { location: "A-CNC3-52", state: "holding", x: 7, y: 1 },
                  { location: "A-CNC3-53", state: "holding", x: 7, y: 2 },
                  { location: "A-CNC3-54", state: "holding", x: 7, y: 3 },
                  { location: "A-CNC3-55", state: "holding", x: 7, y: 4 },
                  { location: "A-CNC3-56", state: "holding", x: 7, y: 5 },
                  { location: "A-CNC3-57", state: "holding", x: 7, y: 6 },
                  { location: "A-CNC3-58", state: "holding", x: 7, y: 7 },
                  { location: "A-CNC3-59", state: "holding", x: 7, y: 8 },
                  { location: "A-CNC3-60", state: "holding", x: 7, y: 9 },
                  { location: "A-CNC3-41", state: "holding", x: 8, y: 0 },
                  { location: "A-CNC3-42", state: "holding", x: 8, y: 1 },
                  { location: "A-CNC3-43", state: "holding", x: 8, y: 2 },
                  { location: "A-CNC3-44", state: "locking", x: 8, y: 3 },
                  { location: "A-CNC3-45", state: "holding", x: 8, y: 4 },
                  { location: "A-CNC3-46", state: "holding", x: 8, y: 5 },
                  { location: "A-CNC3-47", state: "holding", x: 8, y: 6 },
                  { location: "A-CNC3-48", state: "holding", x: 8, y: 7 },
                  { location: "A-CNC3-49", state: "holding", x: 8, y: 8 },
                  { location: "A-CNC3-50", state: "holding", x: 8, y: 9 },
                  { location: "A-CNC3-31", state: "holding", x: 9, y: 0 },
                  { location: "A-CNC3-32", state: "holding", x: 9, y: 1 },
                  { location: "A-CNC3-33", state: "holding", x: 9, y: 2 },
                  { location: "A-CNC3-34", state: "holding", x: 9, y: 3 },
                  { location: "A-CNC3-35", state: "holding", x: 9, y: 4 },
                  { location: "A-CNC3-36", state: "holding", x: 9, y: 5 },
                  { location: "A-CNC3-37", state: "holding", x: 9, y: 6 },
                  { location: "A-CNC3-38", state: "holding", x: 9, y: 7 },
                  { location: "A-CNC3-39", state: "holding", x: 9, y: 8 },
                  { location: "A-CNC3-40", state: "holding", x: 9, y: 9 },
                  { location: "A-CNC3-21", state: "running", x: 10, y: 0 },
                  { location: "A-CNC3-22", state: "holding", x: 10, y: 1 },
                  { location: "A-CNC3-23", state: "holding", x: 10, y: 2 },
                  { location: "A-CNC3-24", state: "holding", x: 10, y: 3 },
                  { location: "A-CNC3-25", state: "holding", x: 10, y: 4 },
                  { location: "A-CNC3-26", state: "holding", x: 10, y: 5 },
                  { location: "A-CNC3-27", state: "holding", x: 10, y: 6 },
                  { location: "A-CNC3-28", state: "holding", x: 10, y: 7 },
                  { location: "A-CNC3-29", state: "holding", x: 10, y: 8 },
                  { location: "A-CNC3-30", state: "holding", x: 10, y: 9 },
                  { location: "A-CNC3-11", state: "holding", x: 11, y: 0 },
                  { location: "A-CNC3-12", state: "holding", x: 11, y: 1 },
                  { location: "A-CNC3-13", state: "holding", x: 11, y: 2 },
                  { location: "A-CNC3-14", state: "holding", x: 11, y: 3 },
                  { location: "A-CNC3-15", state: "locking", x: 11, y: 4 },
                  { location: "A-CNC3-16", state: "locking", x: 11, y: 5 },
                  { location: "A-CNC3-17", state: "locking", x: 11, y: 6 },
                  { location: "A-CNC3-18", state: "locking", x: 11, y: 7 },
                  { location: "A-CNC3-19", state: "locking", x: 11, y: 8 },
                  { location: "A-CNC3-20", state: "holding", x: 11, y: 9 },
                  { location: "A-CNC3-01", state: "holding", x: 12, y: 0 },
                  { location: "A-CNC3-02", state: "holding", x: 12, y: 1 },
                  { location: "A-CNC3-03", state: "holding", x: 12, y: 2 },
                  { location: "A-CNC3-04", state: "holding", x: 12, y: 3 },
                  { location: "A-CNC3-05", state: "locking", x: 12, y: 4 },
                  { location: "A-CNC3-06", state: "holding", x: 12, y: 5 },
                  { location: "A-CNC3-07", state: "locking", x: 12, y: 6 },
                  { location: "A-CNC3-08", state: "holding", x: 12, y: 7 },
                  { location: "A-CNC3-09", state: "locking", x: 12, y: 8 },
                  { location: "A-CNC3-10", state: "running", x: 12, y: 9 },
                ],
              },
              max: { x: 13, y: 10 },
              propLift: {
                enough: 117,
                less: 3,
                insufficient: 0,
                notProp: 0,
                list: [
                  {
                    location: "B-CNC3-51",
                    propNo: "T07",
                    surplusLife: 300,
                    state: "enough",
                    x: 0,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-52",
                    propNo: "T02",
                    surplusLife: 95,
                    state: "enough",
                    x: 0,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-53",
                    propNo: "T08",
                    surplusLife: 599,
                    state: "enough",
                    x: 0,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-54",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 0,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-55",
                    propNo: "T02",
                    surplusLife: 99,
                    state: "enough",
                    x: 0,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-56",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 0,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-57",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 0,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-58",
                    propNo: "T02",
                    surplusLife: 76,
                    state: "enough",
                    x: 0,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-59",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 0,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-60",
                    propNo: "T02",
                    surplusLife: 71,
                    state: "enough",
                    x: 0,
                    y: 9,
                  },
                  {
                    location: "B-CNC3-41",
                    propNo: "T07",
                    surplusLife: 300,
                    state: "enough",
                    x: 1,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-42",
                    propNo: "T07",
                    surplusLife: 300,
                    state: "enough",
                    x: 1,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-43",
                    propNo: "T07",
                    surplusLife: 246,
                    state: "enough",
                    x: 1,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-44",
                    propNo: "T02",
                    surplusLife: 74,
                    state: "enough",
                    x: 1,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-45",
                    propNo: "T02",
                    surplusLife: 99,
                    state: "enough",
                    x: 1,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-46",
                    propNo: "T02",
                    surplusLife: 69,
                    state: "enough",
                    x: 1,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-47",
                    propNo: "T02",
                    surplusLife: 67,
                    state: "enough",
                    x: 1,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-48",
                    propNo: "T02",
                    surplusLife: 87,
                    state: "enough",
                    x: 1,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-49",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 1,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-50",
                    propNo: "T02",
                    surplusLife: 94,
                    state: "enough",
                    x: 1,
                    y: 9,
                  },
                  {
                    location: "B-CNC3-31",
                    propNo: "T06",
                    surplusLife: 68,
                    state: "enough",
                    x: 2,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-32",
                    propNo: "T08",
                    surplusLife: 599,
                    state: "enough",
                    x: 2,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-33",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 2,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-34",
                    propNo: "T07",
                    surplusLife: 80,
                    state: "enough",
                    x: 2,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-35",
                    propNo: "T02",
                    surplusLife: 71,
                    state: "enough",
                    x: 2,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-36",
                    propNo: "T02",
                    surplusLife: 25,
                    state: "enough",
                    x: 2,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-37",
                    propNo: "T02",
                    surplusLife: 9,
                    state: "enough",
                    x: 2,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-38",
                    propNo: "T08",
                    surplusLife: 584,
                    state: "enough",
                    x: 2,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-39",
                    propNo: "T02",
                    surplusLife: 97,
                    state: "enough",
                    x: 2,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-40",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 2,
                    y: 9,
                  },
                  {
                    location: "B-CNC3-21",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 3,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-22",
                    propNo: "T07",
                    surplusLife: 300,
                    state: "enough",
                    x: 3,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-23",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 3,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-24",
                    propNo: "T02",
                    surplusLife: 87,
                    state: "enough",
                    x: 3,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-25",
                    propNo: "T02",
                    surplusLife: 6,
                    state: "enough",
                    x: 3,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-26",
                    propNo: "T02",
                    surplusLife: 28,
                    state: "enough",
                    x: 3,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-27",
                    propNo: "T07",
                    surplusLife: 291,
                    state: "enough",
                    x: 3,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-28",
                    propNo: "T02",
                    surplusLife: 39,
                    state: "enough",
                    x: 3,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-29",
                    propNo: "T02",
                    surplusLife: 64,
                    state: "enough",
                    x: 3,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-30",
                    propNo: "T02",
                    surplusLife: 100,
                    state: "enough",
                    x: 3,
                    y: 9,
                  },
                  {
                    location: "B-CNC3-11",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 4,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-12",
                    propNo: "T02",
                    surplusLife: 95,
                    state: "enough",
                    x: 4,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-13",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 4,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-14",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 4,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-15",
                    propNo: "T02",
                    surplusLife: 56,
                    state: "enough",
                    x: 4,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-16",
                    propNo: "T02",
                    surplusLife: 32,
                    state: "enough",
                    x: 4,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-17",
                    propNo: "T08",
                    surplusLife: 565,
                    state: "enough",
                    x: 4,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-18",
                    propNo: "T02",
                    surplusLife: 19,
                    state: "enough",
                    x: 4,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-19",
                    propNo: "T02",
                    surplusLife: 69,
                    state: "enough",
                    x: 4,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-20",
                    propNo: "T02",
                    surplusLife: 61,
                    state: "enough",
                    x: 4,
                    y: 9,
                  },
                  {
                    location: "B-CNC3-01",
                    propNo: "T02",
                    surplusLife: 46,
                    state: "enough",
                    x: 5,
                    y: 0,
                  },
                  {
                    location: "B-CNC3-02",
                    propNo: "T02",
                    surplusLife: 53,
                    state: "enough",
                    x: 5,
                    y: 1,
                  },
                  {
                    location: "B-CNC3-03",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 5,
                    y: 2,
                  },
                  {
                    location: "B-CNC3-04",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 5,
                    y: 3,
                  },
                  {
                    location: "B-CNC3-05",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 5,
                    y: 4,
                  },
                  {
                    location: "B-CNC3-06",
                    propNo: "T02",
                    surplusLife: 44,
                    state: "enough",
                    x: 5,
                    y: 5,
                  },
                  {
                    location: "B-CNC3-07",
                    propNo: "T07",
                    surplusLife: 299,
                    state: "enough",
                    x: 5,
                    y: 6,
                  },
                  {
                    location: "B-CNC3-08",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 5,
                    y: 7,
                  },
                  {
                    location: "B-CNC3-09",
                    propNo: "T07",
                    surplusLife: 234,
                    state: "enough",
                    x: 5,
                    y: 8,
                  },
                  {
                    location: "B-CNC3-10",
                    propNo: "T02",
                    surplusLife: 65,
                    state: "enough",
                    x: 5,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-51",
                    propNo: "T02",
                    surplusLife: 5,
                    state: "enough",
                    x: 7,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-52",
                    propNo: "T02",
                    surplusLife: 97,
                    state: "enough",
                    x: 7,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-53",
                    propNo: "T08",
                    surplusLife: 3,
                    state: "less",
                    x: 7,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-54",
                    propNo: "T02",
                    surplusLife: 33,
                    state: "enough",
                    x: 7,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-55",
                    propNo: "T02",
                    surplusLife: 100,
                    state: "enough",
                    x: 7,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-56",
                    propNo: "T02",
                    surplusLife: 27,
                    state: "enough",
                    x: 7,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-57",
                    propNo: "T02",
                    surplusLife: 29,
                    state: "enough",
                    x: 7,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-58",
                    propNo: "T02",
                    surplusLife: 12,
                    state: "enough",
                    x: 7,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-59",
                    propNo: "T02",
                    surplusLife: 16,
                    state: "enough",
                    x: 7,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-60",
                    propNo: "T02",
                    surplusLife: 85,
                    state: "enough",
                    x: 7,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-41",
                    propNo: "T02",
                    surplusLife: 29,
                    state: "enough",
                    x: 8,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-42",
                    propNo: "T02",
                    surplusLife: 70,
                    state: "enough",
                    x: 8,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-43",
                    propNo: "T02",
                    surplusLife: 18,
                    state: "enough",
                    x: 8,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-44",
                    propNo: "T02",
                    surplusLife: 77,
                    state: "enough",
                    x: 8,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-45",
                    propNo: "T02",
                    surplusLife: 46,
                    state: "enough",
                    x: 8,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-46",
                    propNo: "T02",
                    surplusLife: 15,
                    state: "enough",
                    x: 8,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-47",
                    propNo: "T02",
                    surplusLife: 55,
                    state: "enough",
                    x: 8,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-48",
                    propNo: "T02",
                    surplusLife: 96,
                    state: "enough",
                    x: 8,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-49",
                    propNo: "T02",
                    surplusLife: 28,
                    state: "enough",
                    x: 8,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-50",
                    propNo: "T02",
                    surplusLife: 95,
                    state: "enough",
                    x: 8,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-31",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 9,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-32",
                    propNo: "T02",
                    surplusLife: 2,
                    state: "less",
                    x: 9,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-33",
                    propNo: "T02",
                    surplusLife: 89,
                    state: "enough",
                    x: 9,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-34",
                    propNo: "T02",
                    surplusLife: 73,
                    state: "enough",
                    x: 9,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-35",
                    propNo: "T06",
                    surplusLife: 200,
                    state: "enough",
                    x: 9,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-36",
                    propNo: "T02",
                    surplusLife: 60,
                    state: "enough",
                    x: 9,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-37",
                    propNo: "T02",
                    surplusLife: 6,
                    state: "enough",
                    x: 9,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-38",
                    propNo: "T02",
                    surplusLife: 44,
                    state: "enough",
                    x: 9,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-39",
                    propNo: "T02",
                    surplusLife: 98,
                    state: "enough",
                    x: 9,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-40",
                    propNo: "T02",
                    surplusLife: 32,
                    state: "enough",
                    x: 9,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-21",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 10,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-22",
                    propNo: "T02",
                    surplusLife: 95,
                    state: "enough",
                    x: 10,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-23",
                    propNo: "T02",
                    surplusLife: 23,
                    state: "enough",
                    x: 10,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-24",
                    propNo: "T02",
                    surplusLife: 94,
                    state: "enough",
                    x: 10,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-25",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 10,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-26",
                    propNo: "T02",
                    surplusLife: 24,
                    state: "enough",
                    x: 10,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-27",
                    propNo: "T02",
                    surplusLife: 1,
                    state: "less",
                    x: 10,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-28",
                    propNo: "T02",
                    surplusLife: 38,
                    state: "enough",
                    x: 10,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-29",
                    propNo: "T02",
                    surplusLife: 75,
                    state: "enough",
                    x: 10,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-30",
                    propNo: "T02",
                    surplusLife: 71,
                    state: "enough",
                    x: 10,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-11",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 11,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-12",
                    propNo: "T02",
                    surplusLife: 71,
                    state: "enough",
                    x: 11,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-13",
                    propNo: "T02",
                    surplusLife: 25,
                    state: "enough",
                    x: 11,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-14",
                    propNo: "T02",
                    surplusLife: 22,
                    state: "enough",
                    x: 11,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-15",
                    propNo: "T02",
                    surplusLife: 23,
                    state: "enough",
                    x: 11,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-16",
                    propNo: "T02",
                    surplusLife: 86,
                    state: "enough",
                    x: 11,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-17",
                    propNo: "T08",
                    surplusLife: 36,
                    state: "enough",
                    x: 11,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-18",
                    propNo: "T02",
                    surplusLife: 5,
                    state: "enough",
                    x: 11,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-19",
                    propNo: "T02",
                    surplusLife: 35,
                    state: "enough",
                    x: 11,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-20",
                    propNo: "T02",
                    surplusLife: 84,
                    state: "enough",
                    x: 11,
                    y: 9,
                  },
                  {
                    location: "A-CNC3-01",
                    propNo: "T08",
                    surplusLife: 600,
                    state: "enough",
                    x: 12,
                    y: 0,
                  },
                  {
                    location: "A-CNC3-02",
                    propNo: "T02",
                    surplusLife: 48,
                    state: "enough",
                    x: 12,
                    y: 1,
                  },
                  {
                    location: "A-CNC3-03",
                    propNo: "T02",
                    surplusLife: 10,
                    state: "enough",
                    x: 12,
                    y: 2,
                  },
                  {
                    location: "A-CNC3-04",
                    propNo: "T02",
                    surplusLife: 16,
                    state: "enough",
                    x: 12,
                    y: 3,
                  },
                  {
                    location: "A-CNC3-05",
                    propNo: "T02",
                    surplusLife: 17,
                    state: "enough",
                    x: 12,
                    y: 4,
                  },
                  {
                    location: "A-CNC3-06",
                    propNo: "T02",
                    surplusLife: 77,
                    state: "enough",
                    x: 12,
                    y: 5,
                  },
                  {
                    location: "A-CNC3-07",
                    propNo: "T02",
                    surplusLife: 36,
                    state: "enough",
                    x: 12,
                    y: 6,
                  },
                  {
                    location: "A-CNC3-08",
                    propNo: "T02",
                    surplusLife: 83,
                    state: "enough",
                    x: 12,
                    y: 7,
                  },
                  {
                    location: "A-CNC3-09",
                    propNo: "T02",
                    surplusLife: 100,
                    state: "enough",
                    x: 12,
                    y: 8,
                  },
                  {
                    location: "A-CNC3-10",
                    propNo: "T02",
                    surplusLife: 93,
                    state: "enough",
                    x: 12,
                    y: 9,
                  },
                ],
              },
              cabinetStatus: {
                newTools: 16,
                oldTools: 6,
                errorTools: 0,
                emptyCabinet: 15,
                filterList: [1, 2, 3, 4, 10, 11, 12, 13],
                max: { x: 5, y: 9 },
                list: [
                  { boxNumber: 5, propNo: "T07", type: "3", state: "oldTools" },
                  { boxNumber: 6, propNo: "T07", type: "3", state: "oldTools" },
                  { boxNumber: 7, propNo: "T07", type: "3", state: "oldTools" },
                  {
                    boxNumber: 14,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 15,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 16,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 17,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 18,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 19,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 20,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 21,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 22,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 23,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 24,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 25,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 26,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 27,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 28,
                    propNo: "T07",
                    type: "3",
                    state: "oldTools",
                  },
                  {
                    boxNumber: 29,
                    propNo: "T07",
                    type: "3",
                    state: "oldTools",
                  },
                  {
                    boxNumber: 30,
                    propNo: "T07",
                    type: "3",
                    state: "oldTools",
                  },
                  {
                    boxNumber: 33,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 35,
                    propNo: "T07",
                    type: "0",
                    state: "newTools",
                  },
                  {
                    boxNumber: 38,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 39,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 40,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 41,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 42,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 43,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 44,
                    propNo: "T07",
                    type: "4",
                    state: "emptyCabinet",
                  },
                  {
                    boxNumber: 45,
                    propNo: "T08",
                    type: "4",
                    state: "emptyCabinet",
                  },
                ],
                toolsStockList: [
                  { propNo: "T07", sum: 29, newCount: 16, state: "success" },
                  { propNo: "T08", sum: 1, newCount: 0, state: "warning" },
                ],
              },
            };

            _this.max = rsData.max ? rsData.max : {};
            _this.machineStatus = rsData.machineStatus
              ? rsData.machineStatus
              : {};
            _this.propLift = rsData.propLift ? rsData.propLift : {};
            _this.cabinetStatus = rsData.cabinetStatus
              ? rsData.cabinetStatus
              : {};
          });
      } catch (e) {
        console.log(e);
      } finally {
        _this.searching = false;
      }
    },
    getCabinetStatusClass: function (idx, jdx) {
      var index = (idx - 1) * this.cabinetStatus.max.y + jdx;
      if (this.cabinetStatus.filterList.indexOf(index) > -1) {
        return "pad";
      }
      return this.cabinetStatus.list.filter((cs) => cs.boxNumber == index)
        .length > 0
        ? this.cabinetStatus.list.filter((cs) => cs.boxNumber == index)[0].state
        : "emptyCabinet";
    },
    getCabinetStatusHtml: function (idx, jdx) {
      var index = (idx - 1) * this.cabinetStatus.max.y + jdx;
      if (this.cabinetStatus.filterList.indexOf(index) > -1) {
        return "";
      }
      return this.cabinetStatus.list.filter((cs) => cs.boxNumber == index)
        .length > 0
        ? this.cabinetStatus.list.filter((cs) => cs.boxNumber == index)[0]
            .propNo
        : "";
    },
  },
  mounted: function () {
    if (!"${cabinetCode}") {
      alert("请在打开页面时传入cabinetCode柜号");
      window.close();
      return;
    }
    var _this = this;
    // 仅在整个视图都被渲染之后才会运行的代码
    _this.getData();
    this.$nextTick(function () {
      setInterval(function () {
        if (_this.autoRefresh) {
          _this.getData();
        }
      }, 10000);
    });
  },
};
</script>

<style>
.page-name .el-tag {
  font-size: 18px;
}
.page-name .el-tag--dark {
  color: black !important;
  font-size: 18px;
}
.page-name .el-tag--dark {
  width: 79.999px;
}
.page-name .el-tag--plain {
  margin-right: 19.999px;
}
.page-name .el-tag--dark.el-tag--warning {
  background-color: #ffff00;
}

.page-name .el-tag--dark.el-tag--danger {
  background-color: #ff0000;
}

.page-name .el-tag--dark.el-tag--success {
  background-color: #00ff00;
}
</style>

<style scoped>
.page-name {
  background-color: #4b89a2;
}
h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
#logo {
  display: inline-block;
  width: 100.001px;
  height: 60px;
  background-image: url("${pp}/images/skins/byd.png");
  background-size: 100% 100%;
  cursor: pointer;
  float: left;
}

#main-name::-webkit-scrollbar {
  display: none;
}
.mainC {
  min-height: -webkit-fill-available;
  overflow-x: hidden;
  margin: 0 30px;
  background-color: #caeff2;
  border-radius: 19.999px;
  padding: 19.999px 30px;
}
/*------------------机台状态颜色-------------------*/
.running {
  background-color: #00ff00;
}
.holding {
  background-color: #ffff00;
}
.outline {
  background-color: #909399;
}
.locking {
  background-color: #ff0000;
}
/*------------------机台状态颜色-------------------*/
/*------------------刀具寿命颜色-------------------*/
.enough {
  background-color: #00ff00;
}
.less {
  background-color: #ffff00;
}
.insufficient {
  background-color: #ff0000;
}
.notProp {
  background-color: #909399;
}
/*------------------刀具寿命颜色-------------------*/
/*------------------柜体状态颜色-------------------*/
.pad {
  background-color: unset;
}
.emptyCabinet {
  border: 1.001px black solid;
  background-color: white;
}
.newTools {
  border: 1.001px black solid;
  background-color: #00ff00;
}
.oldTools {
  border: 1.001px black solid;
  background-color: #ffff00;
}
/*------------------柜体状态颜色-------------------*/
</style>
