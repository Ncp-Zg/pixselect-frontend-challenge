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
        
        <Video ref="Video" :isStarted="isStarted"/>
        <div>

        <canvas
          :class="isClicked ? 'popup' : 'none'"
          id="canvas"
          width="500"
          height="200"
          style="border: 1px solid black;"
      ></canvas>
          
          <p v-if="isClicked">{{ recordTime }}</p>
        </div>
        
        <div v-if="isClicked">
          <v-btn fab color="red" small @click="reject()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
          <v-btn fab color="red" small @click="save()">
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
    </v-app>
    
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
import Video from "@/components/Video.vue";
// import axios from "axios"

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
      beginpathX:0,
      beginpathY:0
    };
  },
  methods: {
    startLiveCamera() {
      this.isStarted = !this.isStarted;
      console.log(this.isStarted);
    },
 drawOnImage(image) {
   console.log(image)
    const canvasElement = document.querySelector("canvas");
    const context = canvasElement.getContext("2d");


    let isDrawing;

    canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        // let size = context.lineWidth
        // let color = context.strokeStyle
        context.lineJoin = "round";
        context.lineCap = "round";
        context.moveTo(e.clientX, e.clientY);
        let a = e.clientX
        let b = e.clientY
        canvasElement.onmouseup = function (e) {
      
          console.log(a,b, e.clientX, e.clientY)
        context.strokeRect( a,b, e.clientX-a, e.clientY-b);
        
        isDrawing = false;
        context.closePath();
    };
    };

    canvasElement.onmousemove = () => {
        if (isDrawing) {
            
            context.stroke();
            
        }
    };

    
},
    async screenShot() {
      this.recordTime = new Date();
      // let el = this.$refs.Video.$el;
      // console.log(el)
      // this.output= (await html2canvas(el)).toDataURL()
      this.isClicked = true;
      var video = this.$refs.Video.$el
      var canvas = document.querySelector("canvas");
      var context = canvas.getContext("2d");
      var w, h, ratio;
      console.log(video.width);
      ratio = video.width / video.height;
      w = video.width - 100;
      h = parseInt(w / ratio, 10);
      canvas.width = w;
      canvas.height = h;

      console.log(w, h);

      context.fillRect(0, 0, w, h);
      context.drawImage(video, 0, 0, w, h);
      console.log(canvas)
      
    },

    

      
    

    save() {
      // let Img = document.querySelector("canvas");
      // Img.crossOrigin = "Anonymous"
      // var dataURL = Img.toDataURL("image/png");
      // let imgData = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      // localStorage.setItem("imgData", imgData);


      // axios({
      //   url:"http://localhost:8080/",
      //   method:"GET",
      //   responseType:"blob"
      // }).then((response)=>{
      //   let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
      //   console.log(fileUrl)
      //   var fileLink = document.createElement("a")
      //   fileLink.href=fileUrl

      //   fileLink.setAttribute("download","image.jpeg")
      //   document.body.appendChild(fileLink)

      //   fileLink.click();
      // })
      var video = this.$refs.Video.$el
      console.log(video)
      this.drawOnImage()

    },
    reject() {
      this.isClicked = false;
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

.popup {
  position:absolute;
  border-radius: 10px;
  border-color:black;
  top:0px;
  left:0px;
}

.none {
  display: none;
}
</style>
