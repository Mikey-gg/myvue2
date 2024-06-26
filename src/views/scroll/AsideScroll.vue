<template>
  <div class="main">
    <van-sidebar v-model="classifyKey">
      <!-- 遍历渲染主类 -->
      <van-sidebar-item
        v-for="(item, i) in classify"
        :key="i"
        @click="classSwitch(i)"
        :title="item.name" />
    </van-sidebar>
    <div class="category">
      <div style="width:258px;height:92px;background:green"></div>
      <!-- 遍历渲染二级分类 -->
      <div v-for="(cate,i) in category" :key="i">
        <h3 ref="abc">{{cate.name}}</h3>
        <van-grid  :border="false" :column-num="3">
          <!-- 遍历渲染三级分类 -->
          <van-grid-item v-for="(type,i) in cate.childList" :key="i">
            <div style="width:76px;height:76px;background:red"></div>
            <p>{{type.name}}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
// 引入数据
import data from './example/data/data2.json'
export default {
  data () {
    return {
      // 主类
      classify: [],
      classifyKey: 0,
      // 侧边内容
      category: []
    }
  },
  created () {
    this.classify = data.data
    // 默认二级分类显示的数据
    this.category = this.classify[0].childList
  },
  methods: {
    classSwitch (i) { // 点击主类级别导航切换
      this.classify = data.data
      // 根据i进行二级菜单筛选
      this.category = this.classify[i].childList
    }
  }
}
</script>
 
<style lamg="less" scoped>
div.main {
  display: flex;
}
</style>