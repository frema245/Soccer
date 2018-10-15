<template>

  <div class="card text-white bg-primary pos-rel mb-3" style="border: 0px; padding-top: 10px">

    <i v-if="editable" @click="editStat" class="edit-icon fa fa-edit fa-2x"></i>

    <div class="row text-center">

      <div class="col-md-6">

        <div class="row">

          <div class="col-5">

            <small><em>Season:</em></small>
            <h5 class="card-title">
              {{stat.season.name}}
            </h5>

          </div>

          <div class="col-7">

            <small><em>Team:</em></small>
            <h5 class="card-title">
              {{stat.team}}
            </h5>

          </div>

        </div>

      </div>

      <div class="col-md-6">
        <small><em>League:</em></small>
        <h5 class="card-title">
          {{league.name}}, <small class="text-muted">{{showFullCountry(league.country)}}</small>
        </h5>
      </div>

    </div>

    <div class="row card-body">

      <div class="col-12 col-md-5">
        <p class="card-text">
          Positions played: <b v-for="pos in stat.positions">{{pos}}</b> <br>
          Total matches (team): <b>{{stat.tot}}</b> <br>
          Total points (team): <b>{{stat.points}}</b>
        </p>
      </div>

      <div class="col-12 col-md-4">
        <p class="card-text">
          Matches from start: <b>{{stat.mfs}}</b> <br>
          Brought on: <b>{{stat.inb}}</b> <br>
          Brought off: <b>{{stat.utb}}</b>
        </p>
      </div>

      <div class="col-12 col-md-3">
        <p class="card-text">
          goals: <b>{{stat.goals}}</b> <br>
          assists: <b>{{stat.ass}}</b> <br>
          yellow: <b>{{stat.yellow}}</b> <br>
          red: <b>{{stat.red}}</b>
        </p>
      </div>

    </div>

  </div>

</template>

<script>

  import PlayersService from '@/services/PlayersService'
  import LeaguesService from '@/services/LeaguesService'

  export default {
    name: 'stat',
    data () {
      return {
        owner_name: "",
        league: Object
      }
    },
    props: {
      stat: {
        required: true,
        type: Object
      },
      editable: {
        required: true
      }
    },
    beforeMount () {
      this.getPlayer(this.stat.owner_id);
      this.getLeague(this.stat.league_id);
    },
    methods: {

      editStat () {
        this.$emit('edit');
      },

      /*
      deleteStat () {
        this.$emit('del', this.stat._id)
      },
      */

      async getPlayer (id) {
        const response = await PlayersService.getPlayer(id);
        this.owner_name = response.data.name_first + " " + response.data.name_last;
      },
      async getLeague (id) {
        const response = await LeaguesService.getLeague(id);
        this.league = response.data
      },
      showFullCountry (code_input) {
        let countries =  require("../assets/countries");
        for (let i = 0; i < countries.length; i++){
          if (countries[i].code == code_input){
            return countries[i].name
          }
        }
        return "null"
      }
    }
  }
</script>

<style scoped>

  .pos-rel {
    position: relative;
  }

  .edit-icon {
    z-index: 1050;
    position: absolute;
    top: 3px;
    right: 3px;
  }

  .fa-edit:hover {
    color: #7a0103;
  }

</style>