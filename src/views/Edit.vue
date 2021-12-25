<template>
  <div>
    <v-app>
      <div class="maincard">
        <v-row>
          <v-col cols="12" md="4" class="d-flex justify-center align-center">
            <v-btn fab color="red" x-large @click="goToLeft()">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="mx-auto card" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                src="../../public/indir (8).png"
              >
                <v-card-title></v-card-title>
              </v-img>

              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="loc"
                  label="Location"
                  required
                ></v-text-field>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="x1"
                      label="x1"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="y1"
                      label="y1"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="x2"
                      label="x2"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="y2"
                      label="y2"
                      required
                    ></v-text-field></v-col
                ></v-row>

                <v-text-field
                  v-model="time"
                  label="RecordTime"
                  required
                ></v-text-field>
                <v-btn color="success" class="mr-4" @click="edit()">
                  EDIT
                </v-btn>

                <v-btn color="error" class="mr-4" @click="del()">
                  DELETE
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-center align-center">
            <v-btn fab color="red" x-large @click="goToRight()">
              <v-icon color="white">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      ImgData: {},
      loc: "",
      x1: "",
      x2: "",
      y1: "",
      y2: "",
      time: "",
      arrlength:"",
    };
  },
  methods: {
    edit() {
      let updatedData = JSON.parse(localStorage.getItem("imgData"));
      updatedData.splice(this.$route.params.id, 1, {
        url: this.ImgData.url,
        timestamp: this.time,
        location: this.loc,
        coordinates: {
          x1: this.x1,
          x2: this.x2,
          y1: this.y1,
          y2: this.y2,
        },
      });
      console.log(updatedData);
      //   console.log(newData)
      localStorage.setItem("imgData", JSON.stringify(updatedData));
      this.$router.push({ name: "Screenshot" });
    },
    goToLeft() {
      if (parseInt(this.$route.params.id) !== 0) {
        this.$router.push({
          name: "Edit",
          params: { id: +this.$route.params.id - 1 },
        });
        location.reload();
      }
    },
    goToRight() {
      if(parseInt(this.$route.params.id) < this.length-1){
        this.$router.push({
        name: "Edit",
        params: { id: +this.$route.params.id + 1 },
      });
      location.reload();
      }
      
    },
  },
  created() {
    let data = JSON.parse(localStorage.getItem("imgData"))[
      this.$route.params.id
    ];
    this.ImgData = data;
    this.loc = data.location;
    this.x1 = data.coordinates.x1;
    this.x2 = data.coordinates.x2;
    this.y1 = data.coordinates.y1;
    this.y2 = data.coordinates.y2;
    this.time = data.timestamp;
    this.length = (JSON.parse(localStorage.getItem("imgData"))).length
    console.log("created",(JSON.parse(localStorage.getItem("imgData"))).length)
  },
  updated() {
    this.ImgData = JSON.parse(localStorage.getItem("imgData"))[
      this.$route.params.id
    ];
  },
  
};
</script>
