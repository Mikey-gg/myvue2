<template>
  <div class="cube-page" :class="type">
    <header class="header">
      <h1>{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc"><slot name="desc">{{desc}}</slot></section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style>
.cube-page {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;
}
.cube-page .header {
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #edf0f4;
  box-shadow: 0 1px 6px #ccc;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 5;
}
.cube-page .header h1 {
  font-size: 16px;
  font-weight: 700;
}
.cube-page .header .cubeic-back {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 15px;
  color: #fc9153;
}
.cube-page >.wrapper {
  height: calc(100% - 44px);
  overflow-x: hidden;
  overflow-y: auto;
}
.cube-page >.wrapper .desc {
  padding: 10px;
  margin: 10px 0;
  line-height: 20px;
  font-size: 14px;
}
.cube-page >.wrapper .content {
  margin: 10px;
}
.cube-page.option-demo .wrapper {
  background-color: white;
}
.cube-page.option-demo .title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-bottom: 15px;
}
.cube-page.option-demo .options {
  margin-bottom: 15px;
}
.cube-page.option-demo .option-list .group {
  margin-bottom: 15px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
}
.cube-page.option-demo .option-list .item {
  height: 52px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.cube-page.option-demo .option-list .item.sub {
  font-size: 14px;
  background-color: rgba(0, 0, 0, .04);
}
.cube-page.option-demo .option-list .item.sub.first {
  box-shadow: 0 1px 1px 1px #eee inset;
}
.cube-page.option-demo .option-list .item.sub.last {
  border-bottom: none;
}
.cube-page.option-demo .demo {
  margin-bottom: 15px;
}
.cube-page.option-demo .methods .method-list .group {
  margin-bottom: 15px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
}
.cube-page.option-demo .methods .method-list .item,
.cube-page.option-demo .methods .method-list button {
  height: 40px;
  font-size: 16px;
}
.cube-page.option-demo .methods .method-list .item {
  background-color: #333;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.cube-page.option-demo .methods .method-list button {
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fc9153;
  box-shadow: 0 0 0 1px #fc9153;
  border: none;
  outline: none;
  color: white;
}

</style>