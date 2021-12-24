<template>
<div >
<v-card v-for="data in imgData" :key="data.timestamp"
    class="mx-auto"
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
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
  
</template>

<script>

export default {
  component:{},
  props:{},
  data(){
    return{
     imgData:JSON.parse(localStorage.getItem("imgData")) 
    }
    
  },
  methods:{

  },
  created() {
    let data = JSON.parse(localStorage.getItem("imgData"))
    console.log(data)
    if(data){
      this.imgdata = data
    }else{
      this.imgdata="Gösterilecek bir bilgi bulunmamaktadır"
    }
  },
  updated() {
    let data = JSON.parse(localStorage.getItem("imgData"))
    console.log(data)
    if(data){
      this.imgdata = data
    }else{
      this.imgdata="Gösterilecek bir bilgi bulunmamaktadır"
    }
  }
}

</script>
