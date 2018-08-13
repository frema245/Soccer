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
          <div class="form-group col-md-6 col-lg-4">
            <label class="col-form-label" for="teamInput">Team</label>
            <input type="text" v-model=team class="form-control" placeholder="IFK Norrköping" id="teamInput">
          </div>

          <!-- Total team games -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="totInput">Total</label>
            <input type="number" v-model=tot class="form-control" placeholder="16" id="totInput">
            <small>Total amount of games the team played in given league in given season</small>
          </div>

          <!-- Total team points -->
          <div class="form-group col-md-4 col-lg-3">
            <label class="col-form-label" for="pointsInput">Total</label>
            <input type="number" v-model=tot class="form-control" placeholder="16" id="pointsInput">
            <small>Total amount of points the team gained in given league in given season</small>
          </div>

        </div>

        <button type="submit" @click="addStat" class="btn btn-primary mb-5">Submit</button>

      </fieldset>
    </form>

    <stat v-for="stat in stats" :stat="stat" :key="stat._id">

    </stat>

  </div>

</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import LeaguesService from '@/services/LeaguesService'
  import StatsService from '@/services/StatsService'
  import Stat from './Stat.vue'

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
      Stat
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
      }
    }
  }
</script>

<style scoped>

</style>