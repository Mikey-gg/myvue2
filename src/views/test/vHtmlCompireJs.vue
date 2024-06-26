<!--
@author: chen.liuyong
@since : 2022/09/20
@description: 解析js试试, 但是不行哦， v-html 解析个锤子的 js , script 标签都难解析
-->
<template>
  <!-- <div v-html="str" class="cly-v-html"> -->
  <div v-html="clyLog" class="cly-v-html">
    
  </div>
</template>

<script>
export default {
  name: 'vHtml',
  created() {},
  data() {
    return {
      
    }
  },
  computed: {
      str() {
    const script = `
      <scrip>
      console.log("2222)
function btn() {
  console.log("1111");
}
var boxs = document.getElementsByClassName("box"); //获取元素

for (let i = 0; i < boxs.length; i++) {
  bindMove(boxs[i],i);
}
function bindMove(box,i) {
  var x, y; 
  var isDrop = false; 
  box.onmousedown = function(e) {
    var e = e || window.event; //要用event这个对象来获取鼠标的位置
    x = e.clientX - box.offsetLeft;
    y = e.clientY - box.offsetTop;
    isDrop = true; //设为true表示可以移动
  };

  document.onmousemove = function(e) {
    //是否为可移动状态
    if (isDrop) {
      var e = e || window.event;
      var moveX = e.clientX - x;
      var moveY = e.clientY - y;
      var maxX = document.documentElement.clientWidth - box.offsetWidth;
      var maxY = document.documentElement.clientHeight - box.offsetHeight;

      //范围限定方法二
      moveX = Math.min(maxX, Math.max(0, moveX));

      moveY = Math.min(maxY, Math.max(0, moveY));
      box.style.left = moveX + "px";
      box.style.top = moveY + "px";
    } else {
      return;
    }
  };

  document.onmouseup = function() {
    isDrop = false; //设置为false不可移动
  };
}
<\/script>
    `;
    let str = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <title></title>
            <style>
              .box {
                position: absolute;
                width: 200px;
                height: 200px;
                background: red;
                bottom: 0;
              }
            </style>
          </head>
          <body>
            <div class="box" onclick="btn()"></div>
            ${script}
          </body>
        </html>
        `
        return str;
      },
      clyLog() {
        const s = "</scrip";
        return `<script>console.log(123456)${s}t>`
      }
  },
  methods: {
    btn() {
      console.log('%c 998:','color:#e98192;', 998);
    }
  }
}
</script>

<style>
.cly-v-html {
  height: 110%;
  width: 100%;
}
</style>