<template>

  <div class="card text-white bg-primary mb-3" style="border: 0px">
    <div class="row">

      <div class="col">owner: {{ owner_name }}</div>
      <div class="col">seas: {{stat.season.name}}</div>
      <div class="col">team: {{stat.team}}</div>
      <div class="col">leag: {{ league_name }}</div>
      <div class="col">y: {{stat.yellow}}</div>
      <div class="col">d: {{stat.red}}</div>
      <div class="col">t: {{stat.tot}}</div>
      <div class="col">g: {{stat.goals}}</div>
      <div class="col">a: {{stat.ass}}</div>
      <div class="col">p: {{stat.points}}</div>
      <div class="col"><button type="submit" @click="deleteStat" class="btn btn-secondary mb-5">Del</button></div>

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
        league_name: ""
      }
    },
    props: {
      stat: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.getPlayer(this.stat.owner_id);
      this.getLeague(this.stat.league_id);
    },
    methods: {
      deleteStat () {
        this.$emit('del', this.stat._id)
      },
      async getPlayer (id) {
        const response = await PlayersService.getPlayer(id);
        this.owner_name = response.data.name_first + " " + response.data.name_last;
      },
      async getLeague (id) {
        const response = await LeaguesService.getLeague(id);
        this.league_name = response.data.name
      },
    }
  }
</script>

<style scoped>

</style>