<template>

  <div class="container">

    <h3>Add Stat</h3>

    <form>
      <fieldset>

        <div class="row">

          <!-- Owner -->
          <div class="form-group col-md-6 col-lg-4">
            <label class="col-form-label" for="ownerInput">Player</label>
            <select class="custom-select" id="ownerInput" v-model="owner_id">
              <option v-for="player in players" v-bind:value="player._id">
                {{ player.name_first }} {{ player.name_last }}
              </option>
            </select>
          </div>

          <!-- League -->
          <div class="form-group col-md-6 col-lg-4">
            <label class="col-form-label" for="leagueInput">League</label>
            <select class="custom-select" id="leagueInput" v-model="league_id">
              <option v-for="league in leagues" v-bind:value="league._id">
                {{ league.name }}
              </option>
            </select>
          </div>

          <!-- Season -->
          <div class="form-group col-md-6 col-lg-4">
            <label class="col-form-label" for="seasonInput">Season</label>
            <select class="custom-select" id="seasonInput" v-model="season">
              <option v-for="season in seasons" v-bind:value="season">
                {{ season.name }}
              </option>
            </select>
          </div>

          <!-- Team -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="teamInput">Team</label>
            <input type="text" v-model=team class="form-control" placeholder="IFK Norrköping" id="teamInput">
          </div>

          <!-- Total team games -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="totInput">Total games</label>
            <input type="number" v-model=tot class="form-control" placeholder="16" id="totInput">
            <small>Total amount of games the team played in given league in given season</small>
          </div>

          <!-- Total team points -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="pointsInput">Total points</label>
            <input type="number" v-model=points class="form-control" placeholder="23" id="pointsInput">
            <small>Total amount of points the team gained in given league in given season</small>
          </div>

          <!-- Matches from start -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="mfsInput">Games from start</label>
            <input type="number" v-model=mfs class="form-control" placeholder="" id="mfsInput">
          </div>

          <!-- Yellow -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="yellowInput">Yellow</label>
            <input type="number" v-model=yellow class="form-control" placeholder="" id="yellowInput">
            <small>Yellow cards received</small>
          </div>

          <!-- Red -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="redInput">Red</label>
            <input type="number" v-model=red class="form-control" placeholder="" id="redInput">
            <small>Red cards received</small>
          </div>

          <!-- Goals -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="goalsInput">Goals</label>
            <input type="number" v-model=goals class="form-control" placeholder="" id="goalsInput">
          </div>

          <!-- Assist -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="assInput">Assist</label>
            <input type="number" v-model=ass class="form-control" placeholder="" id="assInput">
          </div>

          <!-- Utbytt -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="utbInput">Utbytt</label>
            <input type="number" v-model=utb class="form-control" placeholder="" id="utbInput">
          </div>

          <!-- Inbytt -->
          <div class="form-group col-sm-6 col-md-3 col-lg-2">
            <label class="col-form-label" for="inbInput">Inbytt</label>
            <input type="number" v-model=inb class="form-control" placeholder="" id="inbInput">
          </div>

        </div>

        <button type="submit" @click="addStat" class="btn btn-primary mb-5">Submit</button>

      </fieldset>
    </form>

    <stat v-for="stat in stats" :stat="stat" @del="deleteStat" :key="stat._id">

    </stat>

  </div>

</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import LeaguesService from '@/services/LeaguesService'
  import StatsService from '@/services/StatsService'
  import Stat_admin from './Stat_admin.vue'

  export default {
    name: "leagues",
    data () {
      return {
        owner_id: "",
        season: Object,
        team: "",
        league_id: "",
        yellow: null,
        red: null,
        tot: null,
        goals: null,
        ass: null,
        points: null,

        mfs: null,
        utb: null,
        inb: null,

        stats: [],
        players: [],
        leagues: [],

        countries: require("../assets/countries"),
        seasons: require("../assets/seasons")
      }
    },
    components: {
      Stat_admin
    },
    mounted () {
      this.getStats();
      this.getPlayers();
      this.getLeagues();
    },
    watch: {


    },

    methods: {
      async getStats () {
        const response = await StatsService.fetchStats();
        this.stats = response.data.stats
      },
      async getPlayers () {
        const response = await PlayersService.fetchPlayers("");
        this.players = response.data.players
      },
      async getLeagues () {
        const response = await LeaguesService.fetchLeagues();
        this.leagues = response.data.leagues
      },
      async addStat () {
        console.log("addStat");
        await StatsService.addStat({
          owner_id: this.owner_id,
          season: this.season,
          team: this.team,
          league_id: this.league_id,
          yellow: this.yellow,
          red: this.red,
          tot: this.tot,
          goals: this.goals,
          ass: this.ass,
          points: this.points,
          mfs: this.mfs,
          inb: this.inb,
          utb: this.utb
        });
      },
      async deleteStat (id) {
          await StatsService.deleteStat(id);
          this.getStats();
      }
    }
  }
</script>

<style scoped>

</style>