<template>
  <div class="container">

    <div class="row" style="user-select: none;">

      <div class="col-md-6">

        <div class="mb-4">

          <h6><b>Height:</b><i>{{heightSliderDisplay}}</i></h6>
          <vue-slider
            v-model="heightSliderValue"
            ref="heightSlider"
            :min=150
            :max=210
            :process-style=processStyle
            tooltip=false
          />
        </div>

        <div class="mb-4">

          <h6><b>Weight:</b><i>{{weightSliderDisplay}}</i></h6>
          <vue-slider
            v-model="weightSliderValue"
            ref="weightSlider"
            :min=40
            :max=150
            tooltip=false
            :process-style=processStyle
          >
          </vue-slider>
        </div>

        <div class="mb-4">
          <h6><b>Age:</b><i>{{ageSliderDisplay}}</i></h6>
          <vue-slider
            v-model="ageSliderValue"
            ref="ageSlider"
            :min=16
            :max=35
            tooltip=false
            :process-style=processStyle
          />
        </div>

      </div>

      <div class="col-md-6">

        <div class="mb-4">
          <h6><b>SAT:</b><i>{{satSliderDisplay}}</i></h6>
          <vue-slider
            v-model="satSliderValue"
            ref="satSlider"
            :min=0
            :max=2000
            :interval=10
            tooltip=false
            :process-style=processStyle
          />
        </div>

        <div class="mb-4">
          <h6><b>Toefl:</b><i>{{toeflSliderDisplay}}</i></h6>
          <vue-slider
            v-model="toeflSliderValue"
            ref="toeflSlider"
            :min=0
            :max=2000
            :interval=10
            tooltip=false
            :process-style=processStyle
          />
        </div>

        <div class="mb-4">
          <h6><b>ACT:</b><i>{{actSliderDisplay}}</i></h6>
          <vue-slider
            v-model="actSliderValue"
            ref="actSlider"
            :min=0
            :max=2000
            :interval=10
            tooltip=false
            :process-style=processStyle
          />
        </div>

      </div>

      <div class="col-12 mb-4">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="posFilerInput" v-model="posFilter">
          <label class="custom-control-label" for="posFilerInput">Select positions</label>
        </div>
      </div>

      <div class="col-6 col-md-3 mb-4" v-show="posFilter">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="forwardInput" v-model="pos.forward">
          <label class="custom-control-label" for="forwardInput">Forward</label>
        </div>
      </div>

      <div class="col-6 col-md-3 mb-4" v-show="posFilter">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="midfielderInput" v-model="pos.midfielder">
          <label class="custom-control-label" for="midfielderInput">Midfielder</label>
        </div>
      </div>

      <div class="col-6 col-md-3 mb-4" v-show="posFilter">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defenderInput" v-model="pos.defender">
          <label class="custom-control-label" for="defenderInput">Defender</label>
        </div>
      </div>

      <div class="col-6 col-md-3 mb-4" v-show="posFilter">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="goalkeeperInput" v-model="pos.goalkeeper">
          <label class="custom-control-label" for="goalkeeperInput">Goalkeeper</label>
        </div>
      </div>

    </div>

    <button class="btn btn-primary mb-5" @click="getPlayers"> FIND </button>

    <button class="btn btn-secondary mb-5" @click="resetSearch"> RESET </button>

    <player v-for="player in players" :player="player" :key="player._id" @viewPlayer="viewPlayer">

    </player>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import Player from './Player.vue'
  import vueSlider from 'vue-slider-component';

  export default {
    name: 'players',
    data () {
      return {
        posFilter: false,

        pos: {
          forward: false,
          midfielder: false,
          defender: false,
          goalkeeper: false,
        },

        heightSliderDisplay: "moo",
        weightSliderDisplay: "moo",
        ageSliderDisplay: "moo",
        satSliderDisplay: "moo",
        toeflSliderDisplay: "moo",
        actSliderDisplay: "moo",
        processStyle: {
          "backgroundColor": "#787878"
        },
        tooltipStyle: {
          "backgroundColor": "#1a1a1a",
          "borderColor": "#1a1a1a"
        },
        players: [],
        heightSliderValue: [150, 210],
        weightSliderValue: [40, 150],
        ageSliderValue: [16, 35],
        satSliderValue: [0, 2000],
        toeflSliderValue: [0, 2000],
        actSliderValue: [0, 2000],
        search: {

        },
        positions_db: require("../assets/positions")
      }
    },
    components: {
      Player,
      vueSlider
    },
    mounted () {
      this.getPlayers()
    },
    watch: {

      heightSliderValue: function () {
        this.heightSliderDisplay = this.sliderTrigger(this.heightSliderValue, 150, 210, "shorter", "taller", "cm", "cm_min", "cm_max");
      },

      weightSliderValue: function () {
        this.weightSliderDisplay = this.sliderTrigger(this.weightSliderValue, 40, 150, "lighter", "heavier", "kg", "kg_min", "kg_max");
      },

      ageSliderValue: function () {
        this.ageSliderDisplay = this.sliderTrigger(this.ageSliderValue, 16, 35, "younger", "older", "", "age_min", "age_max");
      },

      satSliderValue: function () {
        this.satSliderDisplay = this.sliderTrigger(this.satSliderValue, 0, 2000, "less", "more", "", "sat_score_min", "sat_score_max");
      },

      toeflSliderValue: function () {
        this.toeflSliderDisplay = this.sliderTrigger(this.toeflSliderValue, 0, 2000, "less", "more", "", "toefl_score_min", "toefl_score_max");
      },

      actSliderValue: function () {
        this.actSliderDisplay = this.sliderTrigger(this.actSliderValue, 0, 2000, "less", "more", "", "act_score_min", "act_score_max");
      },

      posFilter: function () {
        this.allPosFalse();
      }

    },

    methods: {
      async getPlayers () {

        delete this.search["positions"];

        if (this.posFilter) {
          this.search["positions"] = [];
          if (this.pos.forward) {this.search["positions"].push("st", "cf", "rw", "lw")}
          if (this.pos.midfielder) {this.search["positions"].push("cam", "cm", "rm", "lm", "cdm");}
          if (this.pos.defender) {this.search["positions"].push("rwb", "lwb", "cb", "rb", "lb")}
          if (this.pos.goalkeeper) {this.search["positions"].push("gk")}
        }

        console.log(this.search);

        this.$router.push({ name: "players", query: this.search });
        const response = await PlayersService.fetchPlayers(this.$route.fullPath);
        this.players = response.data.players
      },

      sliderTrigger (value, lower, upper, lowertxt, uppertxt, unit, lowq, highq) {
        let display = "";
        if (value[0] === lower && value[1] === upper) {
          display = "any";
          delete this.search[lowq];
          delete this.search[highq];
        } else if (value[0] === lower) {
          display = value[1] + unit + " or " + lowertxt;
          this.search[highq] = value[1];
          delete this.search[lowq];
        } else if (value[1] === upper) {
          display = value[0] + unit + " or " + uppertxt;
          this.search[lowq] = value[0];
          delete this.search[highq];
        } else {
          display = value[0] + unit + " - " + value[1] + unit;
          this.search[highq] = value[1];
          this.search[lowq] = value[0];
        }

        return display

      },

      allPosFalse () {
        this.pos.forward = false;
        this.pos.midfielder = false;
        this.pos.defender = false;
        this.pos.goalkeeper = false;
      },

      resetSearch () {
        console.log("Reset");
        this.heightSliderValue = [150, 210];
        this.weightSliderValue = [40, 150];
        this.ageSliderValue = [16, 35];
        this.satSliderValue = [0, 2000];
        this.toeflSliderValue = [0, 2000];
        this.actSliderValue = [0, 2000];
        this.search =  {};
        this.posFilter = false;
      },

      viewPlayer (player_id) {
        this.$emit('viewPlayer', player_id);
      },

      /*
      ,
      async deletePlayer (id) {
        const $this = this
        $this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function () {
          PlayerService.deletePlayer(id)
          $this.$router.go({
            path: '/'
          })
        })
      }

      */

    }
  }
</script>

<style scoped>

</style>