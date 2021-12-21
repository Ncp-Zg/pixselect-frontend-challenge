<template>
  <div class="home">
    <v-app>
      <div class="text-center">
        <v-btn fab dark x-large color="red" @click="startLiveCamera()">
          <v-icon v-if="!isStarted" color="white">mdi-play</v-icon>
          <v-icon v-else-if="isStarted" color="white">mdi-stop</v-icon>
        </v-btn>
      </div>
      <div class="video">
        <Img
        src="http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg"
        >
        
        </Img>
        <canvas width="364" height="204" />
        <v-btn
          class="snap"
          v-if="isStarted"
          fab
          dark
          x-large
          color="red"
          @click="screenShot()"
        >
          <v-icon color="white">mdi-camera</v-icon>
        </v-btn>
      </div>
    </v-app>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      isStarted: false,
      output: "",
    };
  },
  methods: {
    startLiveCamera() {
      this.isStarted = !this.isStarted;
      console.log(this.isStarted);
    },
    async screenShot() {
      // let el = this.$refs.Video.$el;
      // console.log(el)
      // this.output= (await html2canvas(el)).toDataURL()

      var video = document.querySelector("Img");
      var canvas = document.querySelector("canvas");
      var context = canvas.getContext("2d");
      var w, h, ratio;
      console.log(video.width)
      ratio = video.width / video.height;
      w = video.width - 100;
      h = parseInt(w / ratio, 10);
      canvas.width = w;
      canvas.height = h;

      console.log(w,h)

      context.fillRect(0, 0, w, h);
      context.drawImage(video, 0, 0, w, h);
    },
  },
};
</script>

<style>
.video {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.video > iframe {
  width: 645px;
  height: 365px;
}

.snap {
  margin-top: 15px;
}

.home > img {
  width: 100px;
  height: 100px;
}
</style>
