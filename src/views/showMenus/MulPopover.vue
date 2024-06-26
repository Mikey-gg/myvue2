<!--
@author: chen.liuyong
@since : 2023/01/05
@description: MulPopover
-->
<template>
  <div class="mulPopover">
    <div class="item" v-for="item in list" :key="item.$index">
        <el-popover placement="bottom" title="首页" popper-class="hover-to-menu-pop" :width="200" trigger="hover">
          <template #reference>
            <el-button>首页</el-button>
          </template>
        </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mulPopover',
  created() {
    
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
.mulPopover {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
    margin: 0 10px;
}
</style>
<style>
.hover-to-menu-pop {
  left: 0 !important;
  width: auto !important;
  right: 10px !important;
}
.hover-to-menu-pop .el-popover__title {
  text-align: center;
}
</style>