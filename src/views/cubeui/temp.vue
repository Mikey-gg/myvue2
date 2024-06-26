<!-- 
* chen.liuyong
* 2022/5/4
* 食堂订餐
-->
<template>
  <base-frame class="roomSection container-item">
    <!-- <template v-slot:left><div slot="left">31211</div></template>
    <template v-slot:right><div slot="right">31231311</div></template> -->
    <span slot="back" class="back" @click="goBack"
      >&nbsp;<svg t="1652857622710" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2063" width="16" height="16">
        <path
          d="M770.694737 843.452632L342.231579 512 770.694737 180.547368c18.863158-13.473684 21.557895-37.726316 8.08421-56.589473-13.473684-18.863158-37.726316-21.557895-56.589473-8.084211L250.610526 479.663158c-8.084211 8.084211-13.473684 18.863158-13.473684 32.336842s5.389474 24.252632 16.168421 32.336842l471.578948 363.789474c18.863158 13.473684 43.115789 10.778947 56.589473-8.084211 10.778947-18.863158 8.084211-43.115789-10.778947-56.589473z"
          fill="#999999"
          p-id="2064"
        ></path></svg
      >&nbsp;</span
    >
    <div slot="left" class="back" @click="goBack">{{ customerInfo.orderType === "B" ? "包间预定" : "订餐打包" }}</div>
    <span slot="center" class="hot-call">订餐热线：13682394517</span>
    <div class="title-content">B3 饭堂 欢迎您!</div>
    <!-- <button @click="btnClick">按钮</button> -->

    <!-- 需要滚动的菜单 -->
    <div slot="scroll-content">
      <!-- 客户信息 -->
      <div class="customer-info" v-if="customerInfo.orderType === 'B'">
        <div class="base-info">
          <div>
            订餐人： <span> {{ form.orderName }} </span>
          </div>
          <div>
            联系方式：<span> {{ form.orderTel }} </span>
          </div>
        </div>
        <div class="eat-info">
          <div class="eat-title">就餐信息</div>
          <div>
            <span
              >预计用餐时间段：
              <el-select v-model="form.timeBucket" placeholder="请选择时间" @change="timeBucketChange">
                <el-option v-for="item in timeBucket" :key="item.$index" :label="item" :value="item">{{ item }} </el-option>
              </el-select>
            </span>
          </div>
          <div>
            <span
              >预计到达时间：
              <el-time-picker
                v-model="form.orderTime"
                :picker-options="{
                  selectableRange: selectTimePart,
                }"
                value-format="HH:mm:ss"
                placeholder="请选择指定到达时间"
              >
              </el-time-picker>
            </span>
          </div>
          <div>用餐人数：{{ customerInfo.orderNum }}</div>
        </div>
      </div>
      <div class="customer-info" v-if="customerInfo.orderType === 'Z'">
        <div class="eat-info">
          <div class="eat-title">订餐信息</div>
          <div>订餐人： <input type="text" v-model="form.orderName" /></div>
          <div>联系方式： <input type="text" v-model="form.orderTel" /></div>
          <div>
            <span
              >取餐时间： {{ getTomorrow }} &nbsp;
              <el-time-picker
                v-model="form.orderTime"
                :picker-options="{
                  selectableRange: timeBucket,
                }"
                value-format="HH:mm:ss"
                placeholder="请选择指定取餐时间"
              >
              </el-time-picker>
            </span>
          </div>
        </div>
      </div>

      <div class="pick-menu">
        <div class="pick-aside">
          <div class="aside-item" v-for="item in asideCategories" :key="item.category" :class="{ active: item.category === selectAside }" @click="asideClick(item.category)">{{ item.category }}</div>
        </div>

        <menu-list class="menu-content" @click.native="cartPrice" :dataList="detailMenu"></menu-list>
      </div>
      <div style="height: 30px"></div>
    </div>

    <!-- 黑色蒙版 -->
    <div class="mask" v-if="ifShowMask" @click="closeMask"></div>
    <!-- 下面的购物条 -->
    <div class="cart-bar" :class="{ absolute: absolute }" @click="showMask">
      <div class="top-bar" v-if="ifShowMask">
        <div class="clearCart" @click="clearCart">
          &nbsp;&nbsp;&nbsp; 清空购物车
          <svg t="1653362452562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1262" width="16" height="16">
            <path d="M768 1024H256c-70.4 0-128-57.6-128-128V192h768v704c0 70.4-57.6 128-128 128zM192 256v640c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64V256H192z" p-id="1263" fill="#cdcdcd"></path>
            <path d="M416 432c9.6 0 16 6.4 16 16v256c0 9.6-6.4 16-16 16s-16-6.4-16-16v-256c0-9.6 6.4-16 16-16z" p-id="1264" fill="#cdcdcd"></path>
            <path d="M416 736c-19.2 0-32-12.8-32-32v-256c0-19.2 12.8-32 32-32s32 12.8 32 32v256c0 19.2-12.8 32-32 32z m0-304v16-16z" p-id="1265" fill="#cdcdcd"></path>
            <path d="M608 432c9.6 0 16 6.4 16 16v256c0 9.6-6.4 16-16 16s-16-6.4-16-16v-256c0-9.6 6.4-16 16-16z" p-id="1266" fill="#cdcdcd"></path>
            <path
              d="M608 736c-19.2 0-32-12.8-32-32v-256c0-19.2 12.8-32 32-32s32 12.8 32 32v256c0 19.2-12.8 32-32 32z m0-304v16-16zM704 256H320V96c0-54.4 41.6-96 96-96h192c54.4 0 96 41.6 96 96v160zM384 192h256V96c0-19.2-12.8-32-32-32h-192c-19.2 0-32 12.8-32 32v96z"
              p-id="1267"
              fill="#cdcdcd"
            ></path>
            <path d="M864 192h128c19.2 0 32 12.8 32 32s-12.8 32-32 32h-128c-19.2 0-32-12.8-32-32s12.8-32 32-32z" p-id="1268" fill="#cdcdcd"></path>
            <path d="M32 192h128c19.2 0 32 12.8 32 32s-12.8 32-32 32H32c-19.2 0-32-12.8-32-32s12.8-32 32-32z" p-id="1269" fill="#cdcdcd"></path>
          </svg>
        </div>
      </div>
      <div id="cartBar">
        <cart-bar :showImg="true" @click.native="cartPrice" ref="cartBar">
          <img src="@/assets/logistics/cart.svg" alt="" slot="img" />
          <div slot="rightTop" v-show="totalNum != 0">{{ totalNum }}</div>
          <div slot="left">￥{{ totalPrice }}</div>
          <button slot="button" class="base-button yb-button" @click="goReserve"><b>去预定</b></button>
        </cart-bar>
      </div>
    </div>
  </base-frame>
</template>

<script>
import BaseFrame from "@/components/logistics/BaseFrame.vue";
import MenuList from "@/components/logistics/MenuList.vue";
import CartBar from "@/components/logistics/CartBar.vue";
import CubePage from "@/components/logistics/cube-page.vue";
export default {
  name: "roomSection",
  components: {
    BaseFrame,
    MenuList,
    CartBar,
    CubePage,
  },
  created() {
    this.customerInfo = this.$store.state.customerInfo || {};
    if (!this.customerInfo.orderType) {
      this.customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    }
    this.cartPrice();
    this.getAllData();
    this.form = {
      orderName: this.customerInfo.orderName,
      orderTel: this.customerInfo.orderTel,
      orderTime: this.customerInfo.orderTime,
      timeBucket: this.customerInfo.timeBucket,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.showHeight = document.documentElement.clientHeight;
      this.heightChange();
    });
  },
  data() {
    return {
      showHeight: document.documentElement.clientHeight,
      docmHeight: document.documentElement.clientHeight,
      absolute: false,
      param: "",
      cartDetailInfo: [],
      totalPrice: 0,
      totalNum: 0,
      detailMenu: [],
      asideCategories: [],
      selectAside: "",
      allData: [],
      timeBucket: ["11:00:00-12:00:00", "12:00:00-13:00:00", "17:00:00-18:00:00", "18:00:00-19:00:00", "19:00:00-20:00:00"],
      form: {
        orderName: "",
        orderTel: "",
        orderTime: "",
        timeBucket: "",
      },
      customerInfo: {},
      ifShowMask: false,
      selectTimePart: "",
      start: "11:00",
      end: "12:00",
    };
  },
  methods: {
    changeHandler(label) {
      console.log("changed to:", label);
    },
    stickyChangeHandler(current) {
      console.log("sticky-change", current);
    },
    heightChange() {
      if (this.docmHeight > this.showHeight) {
        this.absolute = true;
      } else {
        this.absolute = false;
      }
    },
    btnClick() {
      console.log();
    },
    timeBucketChange() {
      this.form.orderTime = "";
      const temp = this.form.timeBucket.split("-");
      this.selectTimePart = temp[0] + "-" + temp[1];
    },
    showMask() {
      let cartBar = this.$refs.cartBar;
      cartBar.showDetail = this.ifShowMask = cartBar.showDetail && cartBar.detailMenu.length;
    },
    closeMask() {
      let cartBar = this.$refs.cartBar;
      cartBar.showDetailMenu();
      cartBar.showDetail = this.ifShowMask = cartBar.showDetail && cartBar.detailMenu.length;
    },
    goBack() {
      if (!this.customerInfo.orderType) {
        this.$router.go(-1);
      }
      if (this.customerInfo.orderType === "B") {
        this.$router.push("/roomReservation");
      } else {
        this.$router.push("/package");
      }
    },
    goReserve() {
      const param = { ...this.form, sum: this.totalNum, price: this.totalPrice };
      if (param.orderTime.length < 10) {
        param.orderTime = this.getTomorrow + " " + param.orderTime;
      }
      if (this.checkForm(param)) {
        return;
      }
      this.$store.commit("setCustomerInfo", param);
      const path = {
        path: "/submitOrder",
      };
      if (this.$route.query.isEdit) {
        path.query = this.$route.query;
      }
      this.$router.push(path);
    },
    cartPrice() {
      let price = 0;
      let num = 0;
      this.$store.state.cartList.forEach((el) => {
        price += el.num * el.price;
        num += el.num;
      });
      this.totalPrice = price;
      this.totalNum = num;
      let cartBar = this.$refs.cartBar;
    },
    getAllData() {
      this.$http.axios.get(`${this.$http.logistics_url}logisticCanteenMenus/getMenus?isCart=true`).then((res) => {
        this.allData = res.DATA[0];
        if (this.allData) {
          this.asideCategories = this.allData.categories;
          if (this.asideCategories[0]) {
            this.asideClick(this.asideCategories[0].category);
          }
        }
      });
    },
    asideClick(selectAside) {
      this.selectAside = selectAside;
      if (this.allData) this.detailMenu = this.allData.categories.filter((el) => el.category === selectAside)[0].subInfo;
    },
    checkForm(param) {
      const obj = {
        orderTime: "请选择合适的订餐时间",
        price: "请选择菜品",
      };
      for (const key in obj) {
        if (!param[key]) {
          this.$alert(obj[key]);
          return true;
        }
      }
    },
    clearCart() {
      this.dialog = false;
      this.$store.commit("clearCart");
      this.cartPrice();
    },
  },
  computed: {
    getTomorrow() {
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      let time = tomorrow.toLocaleDateString();
      time = time[6] === "/" ? time.slice(0, 5) + "0" + time.slice(5) : time;
      time = time[9] !== undefined ? time : time.slice(0, 8) + "0" + time.slice(8);
      time = time.replace(/\//g, "-");
      return time;
    },
  },
};
</script>
<style>
.el-picker-panel {
  left: 4vw !important;
}
.container-item .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 37.333vw;
}
.scroll-nav-side {
  background-color: #fff;
}
.scroll-nav-side .view-wrapper {
  position: fixed;
  top: 44px;
  left: 0;
  bottom: 0;
  width: 100%;
}
.scroll-nav-side .prepend-header {
  width: 90%;
  margin: 20px auto;
  text-align: center;
  font-size: 20px;
  line-height: 1.6;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
.scroll-nav-side .cube-scroll-nav-main {
  background-color: #efeff4;
}
.scroll-nav-side .cube-sticky-fixed {
  background-color: #efeff4;
}
.scroll-nav-side .cube-scroll-nav-bar {
  width: 120px;
  background-color: transparent;
}
.scroll-nav-side .cube-scroll-nav-bar-item {
  padding: 15px;
}
.scroll-nav-side .cube-scroll-nav-bar-item_active {
  background-color: #fff;
}
.scroll-nav-side .cube-scroll-nav-panels {
  background-color: #fff;
}
.scroll-nav-side .cube-scroll-nav-panel img {
  width: 114px;
  height: 114px;
}
.scroll-nav-side .cube-scroll-nav-panel ul {
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}
.scroll-nav-side .cube-scroll-nav-panel li {
  float: left;
  width: 50%;
}
.scroll-nav-side .cube-scroll-nav-panel li div {
  width: 114px;
  margin: auto;
}
.scroll-nav-side .cube-scroll-nav-panel li div p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.scroll-nav-side .cube-scroll-nav-panel-title {
  padding: 15px;
  font-size: 16px;
  background-color: #fff;
}
</style>
<style scoped>
.container-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.back {
  font-size: 4.267vw;
  display: flex;
  align-items: center;
}
.main-item {
  flex: 1;
}
.title-content {
  text-align: center;
  font-size: 4.8vw;
  margin-bottom: 2.667vw;
}
/* .title-content::after{
  content: "订餐热线：13682394517";
  color: #163BD4;
  font-size: 12px;
} */
.hot-call {
  color: #163bd4;
  font-size: 3.2vw;
  /* text-align: right; */
  height: 3.2vw;
  font-weight: bold;
}
.base-info {
  display: flex;
  border-bottom: 0.267vw solid rgb(248, 248, 248);
  padding-bottom: 0.8vw;
}
.base-info input {
  display: inline;
  width: 26.667vw;
}
.customer-info {
  font-size: 3.2vw;
}
.base-info div {
  flex: 1;
}
.eat-info {
  border-bottom: 0.8vw solid rgb(248, 248, 248);
  border-top: 0.8vw solid rgb(248, 248, 248);
}
.eat-info div:not(:first-child) {
  margin: 1.333vw 0;
}

.eat-title {
  font-weight: bold;
}
.pick-menu {
  display: flex;
  height: calc(100% - 9.867vw);
  margin-top: 2.667vw;
}
.pick-aside {
  width: 30%;
  background-color: rgb(250, 250, 250);
  height: 100%;
  /* overflow: auto; */
  margin-right: 1.6vw;
  /* position: fixed;
  top: 20px; */
  position: sticky;
  top: 0;
}
.pick-aside::-webkit-scrollbar {
  display: none;
}
.aside-item {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 13.333vw;
  padding: 2.667vw 0;
  text-align: center;
  font-size: 3.733vw;
}
.menu-content {
  flex: 1;
  height: 100%;
  width: 70%;
  overflow: auto;
  font-size: 3.2vw;
  font-weight: bold;
  min-height: 26.667vw;
}
.menu-content::-webkit-scrollbar {
  display: none;
}
.cart-bar {
  /* position: relative; */
  /* position: absolute; */
  position: fixed;
  bottom: 1.6vw;
  left: 1.6vw;
  right: 1.6vw;
  margin: auto;
  /* margin: -13.333vw 2.667vw 5.333vw 2.667vw; */
  font-size: 4.267vw;
  /* border: 0.267vw solid #FFC000; */
  border-radius: 6vw 6vw 2.667vw 2.667vw;
  padding: 0.8vw;
  background-color: #fff;
  z-index: 10;
}
.absolute {
  position: absolute !important;
}
.cart-bar::-webkit-scrollbar {
  display: none;
}
.cart-bar img {
  width: 9.333vw;
  height: auto;
  object-fit: cover;
}
.container-item input {
  background-color: initial;
  border: none;
  border-bottom: 0.267vw solid rgba(143, 133, 133, 0.4);
  outline: none;
  width: 24vw;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: auto;
  bottom: 0;
  z-index: 9;
  background-color: rgba(5, 5, 5, 0.4);
}
.active {
  font-weight: bolder;
  background-color: #ffffff !important;
}
@media screen and (min-width: 128vw) {
  .cart-bar::-webkit-scrollbar {
    display: initial;
  }
  .menu-content::-webkit-scrollbar {
    display: initial;
  }
  .pick-aside::-webkit-scrollbar {
    display: initial;
  }
}
.top-bar {
  width: 100%;
  height: 5.333vw;
  border-radius: 5.333vw 5.333vw 0 0;
  background-color: #f3eeda;
  margin-bottom: 2.667vw;
  display: flex;
  direction: rtl;
  /* justify-content: center; */
  align-items: center;
}
.clearCart {
  /* direction: rtl; */
  color: #cdcdcd;
  font-size: 3.2vw;
  /* position: absolute; */
  /* top: 0; */
  /* background-color: #fff; */
  /* padding-right: 1.6vw; */
  /* right: 0vw; */
  /* z-index: 99; */
}
.clearCart > .icon {
  width: 3.2vw;
  height: 3.2vw;
}
</style>
<style>
.roomSection .callInfo {
  font-size: 12px;
  float: right;
  margin-top: 5px;
  color: #0151a3;
}
</style>
