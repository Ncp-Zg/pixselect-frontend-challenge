<template>
<v-app>
<div class="maincard">
<v-card v-for="(data,index) in imgData" :key="data.timestamp"
    class="mx-auto card"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src= "`data:image/png;base64,${data.url}`"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{data.timestamp}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{data.location}}</div>

      <div>Coordinates : ({{data.coordinates.x1}},{{data.coordinates.y1}}) - ({{data.coordinates.x1}},{{data.coordinates.y2}}) - ({{data.coordinates.x2}},{{data.coordinates.y1}}) - ({{data.coordinates.x2}},{{data.coordinates.y2}})</div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        color="success"
        @click="edit(data,index)"
        
      >
        EDIT
      </v-btn>

      <v-btn
      color="error"
      @click="del(index)"
        
      >
        DELETE
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</v-app>
  
</template>

<script>

export default {
  component:{},
  props:{},
  data(){
    return{
     imgData:[] 
    }
    
  },
  methods:{
    del(e){
      // console.log(this.imgData)
      let imgdata = JSON.parse(localStorage.getItem("imgData"))
      imgdata.splice(e,1);
      localStorage.setItem("imgData",imgdata)
      this.imgData=imgdata
      
    },
    edit(data,index){
      console.log(data)
      this.$router.push({name: 'Edit', params : { id: index}});
    }
  },
  created() {
    let data = JSON.parse(localStorage.getItem("imgData"))
    console.log(data)
    if(data){
      this.imgData = data
    }
  },
  updated() {
    let data = JSON.parse(localStorage.getItem("imgData"))
    console.log(data)
    if(data){
      this.imgData = data
    }
  }
}

</script>

<style>

.maincard{
  display:flex;
  flex-wrap:wrap;

}

.card{
  margin-top:10px;
  margin-left:10px;
}



</style>
