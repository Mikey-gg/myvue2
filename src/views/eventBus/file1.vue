<!--  -->
<template>
  <div id="demo01">
    <h1>Demo01组件</h1>
    <h2>从Demo02接受的收据：{{msg}}</h2>
    <button @click="fasong">发送数据给Demo02</button>
  </div>
</template>
 
<script>
export default {
  name: "file1",
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    test01 (data) {
      console.log(data);
      this.msg = data
    },
    fasong () {
      this.$bus.$emit("send", "我是Demo01页面");
    }
  },
  mounted () {
    // console.log(this);
    // 2.接受全局的haha事件
    this.$bus.$on('haha', this.test01)
    console.log(this.$route.params);
  }
}
</script>
<style scoped>
#demo01 {
  background-color: lightyellow;
  padding: 20px;
  margin-bottom: 20px;
}
</style>