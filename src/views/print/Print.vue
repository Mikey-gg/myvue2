<template>
  <div>
    <el-row>
      <el-button @click="printPdf">打印</el-button>
      <el-button @click="download">导出</el-button>
    </el-row>
    <iframe style="display: none" id="frame" ref="printIframe" :src="pdfStream">
    </iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfData: "", //需要获取的base64串
      prefixBase64: "data:application/pdf;base64,", // base64前缀
      pdfStream: "",
    };
  },
  mounted() {
    //这种写法是为了防止打印跨域
    let myBlob = this.changeURLtoBlob(this.prefixBase64 + this.pdfData);
    let myUrl = URL.createObjectURL(myBlob);
    this.pdfStream = myUrl;
  },
  created() {
    //需要获取到pdfData,这个是本地业务
  },
  methods: {
    //下载
    download() {
      const imgUrl = this.prefixBase64 + this.pdfData;
      let a = document.createElement("a");
      a.href = imgUrl;
      a.setAttribute("download", "chart-download");
      a.click();
    },

    changeURLtoBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      console.log("mime", mime);
      console.log("arr[0].match(/:(.*?);/)", arr[0].match(/:(.*?);/));
      console.log("bstr", bstr);
      console.log("u8arr", u8arr);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    //打印
    printPdf() {
      this.$refs.printIframe.contentWindow.print();
    },
  },
};
</script>
