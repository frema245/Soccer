<template>

  <div>

    <h4>
      <b v-if="update_mode">Edit entry</b>
      <b v-else>Add new entry</b>
    </h4>

    <form>
      <fieldset>

        <div class="row align-content-center">

          <!-- League -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="leagueInput">League</label>
            <select class="custom-select" id="leagueInput" v-model="stat.league_id">
              <option v-for="league in leagues" v-bind:value="league._id">
                {{ league.name }}
              </option>
            </select>
          </div>

          <!-- Season -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="seasonInput">Season</label>
            <select class="custom-select" id="seasonInput" v-model="stat.season">
              <option v-for="season in seasons" v-bind:value="season">
                {{ season.name }}
              </option>
            </select>
          </div>

          <h6 class="col-12 mt-2">team stats:</h6>
          <!-- Team -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="teamInput">Club and team name</label>
            <input type="text" v-model=stat.team class="form-control" placeholder="IFK Norrköping" id="teamInput">
          </div>

          <!-- Total team games -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="totInput">Total games</label>
            <input type="number" v-model=stat.tot class="form-control" placeholder="16" id="totInput">
            <small>Total amount of games the team played in given league in given season</small>
          </div>

          <!-- Total team points -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="pointsInput">Total points</label>
            <input type="number" v-model=stat.points class="form-control" placeholder="23" id="pointsInput">
            <small>Total amount of points the team gained in given league in given season</small>
          </div>

          <h6 class="col-12 mt-2">personal stats:</h6>

          <!-- Goals -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="goalsInput">Goals</label>
            <input type="number" v-model=stat.goals class="form-control" placeholder="" id="goalsInput">
          </div>

          <!-- Assist -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="assInput">Assist</label>
            <input type="number" v-model=stat.ass class="form-control" placeholder="" id="assInput">
          </div>

          <!-- Yellow -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="yellowInput">Yellow</label>
            <input type="number" v-model=stat.yellow class="form-control" placeholder="" id="yellowInput">
            <small>Yellow cards received</small>
          </div>

          <!-- Red -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="redInput">Red</label>
            <input type="number" v-model=stat.red class="form-control" placeholder="" id="redInput">
            <small>Red cards received</small>
          </div>

          <!-- Matches from start -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="mfsInput">Games from start</label>
            <input type="number" v-model=stat.mfs class="form-control" placeholder="" id="mfsInput">
          </div>

          <!-- Utbytt -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="utbInput">Utbytt</label>
            <input type="number" v-model=stat.utb class="form-control" placeholder="" id="utbInput">
          </div>

          <!-- Inbytt -->
          <div class="form-group col-sm-6 col-md-3">
            <label class="col-form-label" for="inbInput">Inbytt</label>
            <input type="number" v-model=stat.inb class="form-control" placeholder="" id="inbInput">
          </div>

        </div>

        <button type="button" @click="submitStat" class="btn btn-primary mb-5">Submit</button>
        <button type="button" @click="revertStat" class="btn btn-secondary mb-5">Cancel</button>
        <button type="button" v-show="update_mode" @click="deleteStat" class="btn btn-danger mb-5 float-right">Delete</button>

      </fieldset>
    </form>

  </div>

</template>

<script>
  import LeaguesService from '@/services/LeaguesService'
  import StatsService from '@/services/StatsService'

  export default {
    name: "AddStat",
    data () {
      return {
        stat: {
          season: null,
          team: null,
          league_id: null,
          yellow: null,
          red: null,
          tot: null,
          goals: null,
          ass: null,
          points: null,
          mfs: null,
          utb: null,
          inb: null,
        },

        leagues: [],

        stat_for_revert: null,

        countries: require("../assets/countries"),
        seasons: require("../assets/seasons")
      }
    },
    props: {
      owner_id: {
        required: true
      },
      update_mode: {
        required: true
      },
      stat_edit: {
        required: false
      }
    },

    components: {

    },
    mounted () {
      this.getLeagues();
      if (this.update_mode) {
        console.log("JarrååEEEEEEå");
        this.stat = this.stat_edit;
      }
      this.stat_for_revert = JSON.parse(JSON.stringify(this.stat));
    },
    watch: {
      /*
      stat_edit: function () {
        if (this.update_mode) {
          console.log("JarrååEEEEEEå");
          this.stat = this.stat_edit;
        }
      }
      */
    },

    methods: {
      revertStat () {
        this.stat = JSON.parse(JSON.stringify(this.stat_for_revert));
        this.$emit('hide');
      },
      async getLeagues () {
        const response = await LeaguesService.fetchLeagues();
        this.leagues = response.data.leagues
      },
      async submitStat () {

        let submit = {
          owner_id: this.owner_id,
          season: this.stat.season,
          team: this.stat.team,
          league_id: this.stat.league_id,
          yellow: this.stat.yellow,
          red: this.stat.red,
          tot: this.stat.tot,
          goals: this.stat.goals,
          ass: this.stat.ass,
          points: this.stat.points,
          mfs: this.stat.mfs,
          inb: this.stat.inb,
          utb: this.stat.utb
        };

        if (this.update_mode) {
          console.log(this.stat._id);
          await StatsService.updateStat(this.stat._id, submit);
          console.log("update stat ----");
        } else {
          await StatsService.addStat(submit);
          console.log("add stat ----");
        }

        this.$emit('hide');
      },
      async deleteStat () {
        this.$emit('del');
        this.$emit('hide');
      },
    }
  }
</script>

<style scoped>

</style>