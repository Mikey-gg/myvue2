<!--
@author: chen.liuyong
@since : 2022/09/14
@description: 微信sdk调用扫描测试函数是否具有
-->
<template>
  <div>
    
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
  name: 'wxSDK',
  created() {
    console.log('wx',wx.scanQRCode);
    wx.scanQRCode({
    desc: 'scanQRCode desc',
    needResult: 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
    success: function(res) {
        // 回调
		var result = res.resultStr;//当needResult为1时返回处理结果
    },
    error: function(res) {
        if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
        }
    }
});
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>

</style>