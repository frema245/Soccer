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

        Other shit

      </div>

    </div>

    <player v-for="player in players" :player="player">

    </player>
  </div>
</template>

<script>
  import PlayerService from '@/services/PlayersService'
  import Player from './Player.vue'
  import vueSlider from 'vue-slider-component';

  export default {
    name: 'players',
    data () {
      return {
        heightSliderDisplay: "moo",
        weightSliderDisplay: "moo",
        ageSliderDisplay: "moo",
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
        this.heightSliderTrigger();
      },

      weightSliderValue: function () {
        this.weightSliderTrigger()
      },

      ageSliderValue: function () {
        this.ageSliderTrigger()
      }

    },

    methods: {
      async getPlayers () {
        console.log('Get players');
        console.log(this.$route.query);
        console.log(this.$route);
        const response = await PlayerService.fetchPlayers(this.$route.fullPath);
        this.players = response.data.players
      },
      heightSliderTrigger () {
        if (this.heightSliderValue[0] === 150 && this.heightSliderValue[1] === 210) {
          this.heightSliderDisplay = "any";
        } else if (this.heightSliderValue[0] === 150) {
          this.heightSliderDisplay = this.heightSliderValue[1] + "cm or shorter";
        } else if (this.heightSliderValue[1] === 210) {
          this.heightSliderDisplay = this.heightSliderValue[0] + "cm or taller";
        } else {
          this.heightSliderDisplay = this.heightSliderValue[0] + "cm - " + this.heightSliderValue[1] + "cm";
        }
      },
      weightSliderTrigger () {
        if (this.weightSliderValue[0] === 40 && this.weightSliderValue[1] === 150) {
          this.weightSliderDisplay = "any";
        } else if (this.weightSliderValue[0] === 40) {
          this.weightSliderDisplay = this.weightSliderValue[1] + "kg or lighter";
        } else if (this.weightSliderValue[1] === 150) {
          this.weightSliderDisplay = this.weightSliderValue[0] + "kg or heavier";
        } else {
          this.weightSliderDisplay = this.weightSliderValue[0] + "kg - " + this.weightSliderValue[1] + "kg";
        }
      },
      ageSliderTrigger () {
        if (this.ageSliderValue[0] === 16 && this.ageSliderValue[1] === 35) {
          this.ageSliderDisplay = "any";
        } else if (this.ageSliderValue[0] === 16) {
          this.ageSliderDisplay = this.ageSliderValue[1] + " or younger";
        } else if (this.ageSliderValue[1] === 35) {
          this.ageSliderDisplay = this.ageSliderValue[0] + " or older";
        } else {
          this.ageSliderDisplay = this.ageSliderValue[0] + " - " + this.ageSliderValue[1];
        }
      }

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