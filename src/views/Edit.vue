<template>
    <div>
        <v-app>
<div class="maincard">
<v-card
    class="mx-auto card"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src= "`data:image/png;base64,${this.ImgData.url}`"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{this.ImgData.timestamp}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{this.ImgData.location}}</div>

      <div>Coordinates : ({{this.ImgData.coordinates.x1}},{{this.ImgData.coordinates.y1}}) - ({{this.ImgData.coordinates.x1}},{{this.ImgData.coordinates.y2}}) - ({{this.ImgData.coordinates.x2}},{{this.ImgData.coordinates.y1}}) - ({{this.ImgData.coordinates.x2}},{{this.ImgData.coordinates.y2}})</div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        color="success"
        
        
      >
        EDIT
      </v-btn>

      <v-btn
      color="error"
      
        
      >
        DELETE
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</v-app>
    </div>
</template>

<script>
    export default {
        components:{},
        props:{},
        data(){
            return{
                ImgData:{}
            }
        },
        methods:{

        },
        created(){
            this.ImgData=(JSON.parse(localStorage.getItem("imgData")))[this.$route.params.id]
        },
        updated(){
            this.ImgData=(JSON.parse(localStorage.getItem("imgData")))[this.$route.params.id]
        }
    }
</script>