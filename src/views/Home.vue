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
          
          <a id="check" @click="save()">indir</a>
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
      imgdata:[]
    };
  },
  methods: {
    startLiveCamera() {
      this.isStarted = !this.isStarted;
      this.isClicked = false;
      console.log(this.isStarted);
    },
    drawOnImage() {
      const canvasElement = document.getElementById("layer1");
      const context = canvasElement.getContext("2d");
      let mouseX = 0;
      let mouseY = 0;

      // let isDrawing;

      canvasElement.onmousedown = (e) => {
        context.beginPath();
        context.closePath()
if (e.offsetX) {
          mouseX= e.offsetX;
          mouseY=e.offsetY;
        }else{
          mouseX = e.pageX -e.target.offsetLeft;
          mouseY = e.pageY - e.target.offsetTop;
        }
        
        canvasElement.onmouseup = function (e) {
          context.strokeRect(mouseX, mouseY, e.offsetX-mouseX ,e.offsetY-mouseY);
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
      console.log(img.width);
      ratio = img.width / img.height;
      w = img.width - 100;
      h = parseInt(w / ratio, 10);
      canvas.width = w;
      canvas.height = h;

      console.log(w, h);

      context.fillRect(0, 0, w, h);
      context.drawImage( img,0, 0, w, h);
      console.log(canvas);
      this.drawOnImage();
    },

    save() {
      const canvas = document.getElementById("layer1");
      canvas.crossOrigin = "Anonymous"
      var dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");

      const data = {
        url:dataURL,
        timestamp:this.recordTime,
        location:"",
      }

      this.imgdata.push(data)

      localStorage.setItem("imgData", JSON.stringify(this.imgdata));

      // var link = document.getElementById("check");
      
      
      //     link.href = canvas.toDataURL();
      //     link.download = "mypainting.png";
        
    },
    reject() {
      this.isClicked = false;
    },
  },
  created(){
    let data = JSON.parse(localStorage.getItem("imgData"))
    console.log(data,this.imgdata)
    this.imgdata = [...data]
  }
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
  
  border-radius: 10px;
  border-color: black;
  top: 0px;
  left: 0px;
}

.none {
  display: none;
}
</style>
