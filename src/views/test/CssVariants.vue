<!--
@author: chen.liuyong
@since : 2022/10/25
@description: 测试css变量
-->
<template>
  <div class="cssVariants">
    <span class="text">111</span>
    <button @click="btnClick" class="btn-click">按钮</button>
  </div>
</template>

<script>
export default {
  name: 'cssVariants',
  created() {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    btnClick() {
      console.log("点击");
      document.documentElement.style.setProperty("--bg-color", "red")
    },
  },
}
</script>
<style>
:root{
  /* --bg-color: yellow; */
}
</style>

<style scoped>

.cssVariants {
  height: 100vh;
  /* --bg-color: orange; */
  /* background-color: var(--bg-color); */
  /* background-color: gray; */
  width: 100%;
  /* color: red; */
}
.cssVariants :deep(.text) {
    color: "red";
}
</style>