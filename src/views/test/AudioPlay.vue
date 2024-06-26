<!--
@author: chen.liuyong
@since : 2023/02/13
@description: 声音播放
-->
<template>
  <div class="audioPlay">
    <audio controls autoplay="autoplay" loop="loop" preload="auto" id="maudio">
      <source src="@/assets/exception.wav" type="audio/wav" />
    </audio>
    <button type="" @click="autoPlay">开启自动播报</button>
  </div>
</template>

<script>
export default {
  name: "audioPlay",
  created() {},
  mounted() {
    this.maudio = document.getElementById("maudio");
  },
  data() {
    return {
      maudio: null,
    };
  },
  methods: {
    autoPlay() {
      setInterval(() => {
        this.maudio.play();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.audioPlay {
  height: 100%;
}
</style>
