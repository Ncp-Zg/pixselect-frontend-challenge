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
        <Video ref="Video" :isStarted="isStarted" />
        <div>
          <canvas
            :class="isClicked ? 'popup' : 'none'"
            id="layer1"
            width="500"
            height="200"
            style="border: 1px solid black"
          ></canvas>

          <p v-if="isClicked">{{ recordTime }}</p>
        </div>

        <div v-if="isClicked">
          <v-btn fab color="red" small @click="reject()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
          <v-btn class="ml-2" fab color="red" small  id="check" @click="save()">
            <v-icon color="white">mdi-check</v-icon>
          </v-btn>

        </div>

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
      <Img id = "main" class="none"/>
    </v-app>
  </div>
</template>

<script>
import Video from "@/components/Video.vue";

export default {
  name: "Home",
  components: {
    Video,
  },
  data() {
    return {
      isStarted: false,
      output: "",
      isClicked: false,
      recordTime: "",
      imgdata: [],
      coordinates: {},
      mainImg:"",
      
    };
  },
  methods: {
    startLiveCamera() {
      this.isStarted = !this.isStarted;
      this.isClicked = false;
    },
    drawOnImage(w,h) {
      const canvasElement = document.getElementById("layer1");
      const main = document.getElementById("main");
      const context = canvasElement.getContext("2d");
      let mouseX = 0;
      let mouseY = 0;

      // let isDrawing;
      let dataImage = localStorage.getItem("mainImg")
      main.src="data:image/png;base64," + dataImage
      canvasElement.onmousedown = (e) => {
        context.fillRect(0, 0, w, h);
      context.drawImage(main, 0, 0, w, h);
        context.beginPath();
        context.closePath();
        if (e.offsetX) {
          mouseX = e.offsetX;
          mouseY = e.offsetY;
        } else {
          mouseX = e.pageX - e.target.offsetLeft;
          mouseY = e.pageY - e.target.offsetTop;
        }

        let x = e.layerX;
        let y = e.layerY

        canvasElement.onmouseup = (e) => {
          this.coordinates.x1 = x;
          this.coordinates.x2 = e.layerX;
          this.coordinates.y1 = y;
          this.coordinates.y2 = e.layerY;
          context.strokeRect(
            mouseX,
            mouseY,
            e.offsetX - mouseX,
            e.offsetY - mouseY
            
          );
          context.closePath();
        };
      };
    },
    async screenShot() {
      this.recordTime = new Date();
      this.isClicked = true;
      var img = this.$refs.Video.$el;
      var canvas = document.getElementById("layer1");
      var context = canvas.getContext("2d");
      var w, h, ratio;
      ratio = img.width / img.height;
      w = img.width - 100;
      h = parseInt(w / ratio, 10);
      canvas.width = w;
      canvas.height = h;

      context.fillRect(0, 0, w, h);
      context.drawImage(img, 0, 0, w, h);

       var dataURL = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/(png|jpg);base64,/, "");

        localStorage.setItem("mainImg", dataURL);

      this.drawOnImage(w,h);
    },

    save() {
      const canvas = document.getElementById("layer1");
      canvas.crossOrigin = "Anonymous";
      var dataURL = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/(png|jpg);base64,/, "");

      
this.$prompt("Please enter a location","Location..",`${this.recordTime}`,"info").then((text) => {
  if (text != null) {
        const data = {
          url: dataURL,
          timestamp: this.recordTime,
          location: text,
          coordinates: this.coordinates,
        };

        this.imgdata.push(data);
        this.isClicked = false;
        localStorage.setItem("imgData", JSON.stringify(this.imgdata));
      }
      localStorage.removeItem("mainImg")
      this.$alert("Screenshot is saved successfully.","Success","success");
})

      // var link = document.getElementById("check");

      //     link.href = canvas.toDataURL();
      //     link.download = "mypainting.png";
    },
    reject() {
      this.isClicked = false;
    },
  },
  created() {
    let data = JSON.parse(localStorage.getItem("imgData"));
    if (data) {
      this.imgdata = data;
    } else {
      this.imgdata = [];
    }
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

.popup {
  margin-top:5px;
  border-radius: 10px;
  border-color: black;
  top: 0px;
  left: 0px;
}

.popup:hover {
  cursor:se-resize

;
  
}

.none {
  display: none;
}
</style>
