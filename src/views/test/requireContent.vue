<!--
@author: chen.liuyong
@since : 2022/09/23
@description: 使用webpack的require.content来读取文件
-->
<template>
  <div>
    1234567
  </div>
</template>

<script>
export default {
  name: 'requireContent',
  created() {
      this.test()
  },
  data() {
    return {
      
    }
  },
  methods: {
    test() {
        console.log('require.context: ', require);
    //   let file = require.context("./data", false, /\.js/);

    //   console.log('file: ', file);
    },
  },
}
</script>

<style scoped>

</style>