<!--  -->
<template>
  <div id="demo02">
    <h1>Demo02组件</h1>
    <button @click="sendData">发送事件给Demo01</button>
    <h2>从Demo01接受的收据：{{msg}}</h2>
  </div>
</template>
 
<script>
export default {
  name: "file2",
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    sendData () {
      // 触发全局的haha事件
      this.$bus.$emit("haha", '老王')
    //   this.$router.push({path: 'file1', params: {id: 11}});
      this.$router.push({
    name:"file1",//这个name就是你刚刚配置在router里边的name
    params:{
          userId:"10011"
    }
})

    },
    display (data) {
      console.log(data);
      this.msg = data
    }
  },
  mounted () {
    // console.log(this.abc);
    console.log(this.$bus);
    this.$bus.$on("send", this.display)
  }
}
</script>
<style scoped>
#demo02 {
  background-color: lightblue;
  padding: 20px;
}
</style>