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
        <iframe
          
          v-if="isStarted"
          width="420"
          height="315"
          src="http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg"
        >
        </iframe>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      isStarted: false,
    };
  },
  methods: {
    startLiveCamera() {
      this.isStarted = !this.isStarted;
      console.log(this.isStarted);
    },
  },
};
</script>

<style>
.video {
  margin-top:15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video > iframe{
  width:645px;
  height:365px
}
</style>
