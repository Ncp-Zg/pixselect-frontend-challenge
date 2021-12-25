<template>
  <v-app>
    <div class="maincard">
      <v-card
        v-for="(data, index) in imgData"
        :key="data.timestamp"
        class="mx-auto card"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`data:image/png;base64,${data.url}`"
        >
          <v-card-title></v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ data.timestamp }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ data.location }}</div>

          <div>
            Coordinates : ({{ data.coordinates.x1 }},{{ data.coordinates.y1 }})
            - ({{ data.coordinates.x1 }},{{ data.coordinates.y2 }}) - ({{
              data.coordinates.x2
            }},{{ data.coordinates.y1 }}) - ({{ data.coordinates.x2 }},{{
              data.coordinates.y2
            }})
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn color="success" @click="edit(data, index)"> EDIT </v-btn>

          <v-btn color="error" @click="del(index)"> DELETE </v-btn>
          <v-btn color="orange" @click="show(index)">
            <a id="show">SHOW & DOWNLOAD</a>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  component: {},
  props: {},
  data() {
    return {
      imgData: [],
    };
  },

  created() {
    let data = JSON.parse(localStorage.getItem("imgData"));
    console.log("created render");
    if (data) {
      this.imgData = data;
    }
    console.log(this.imgData);
  },

  updated() {
    JSON.parse(localStorage.getItem("imgData"));
    console.log("updated render");
  },
  methods: {
    async del(e) {
      let data = JSON.parse(localStorage.getItem("imgData"));
      console.log(data);
      let updated = await data.splice(e, 1);
      console.log(updated);
      console.log(data);
      this.imgData = data;
      localStorage.setItem("imgData", JSON.stringify(data));
    },
    edit(data, index) {
      console.log(data);
      this.$router.push({ name: "Edit", params: { id: index } });
    },
    debugBase64(base64URL) {
      var win = window.open();

      win.document.write(
        '<div style="display:flex;flex-direction:column;width:100%;height:100%;align-items:center;" allowfullscreen><iframe src="' +
          base64URL +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:550px; height:350px;"></iframe><a href="' +
          base64URL +
          '" download="screenshot.png" style="text-decoration:none;background-color: #EE8E00;border: none;color: white;padding: 15px 32px;width:100px;text-align: center;font-size: 16px;margin: 4px 2px ;cursor: pointer;border-radius:10px">DOWNLOAD</a></div>'
      );
    },
    show(i) {
      console.log(i);
      let dataurl = this.imgData[i].url;
      console.log(this.imgData[i]);
      this.debugBase64(`data:image/png;base64,${dataurl}`);
    },
  },
};
</script>

<style>
.maincard {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
