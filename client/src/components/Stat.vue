<template>

  <div class="card text-white bg-primary mb-3" style="border: 0px">
    <div class="row">

      <div class="col-sm-4 col-md-2 col-lg-2">owner: {{stat.owner_id}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">seas: {{stat.season}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">team: {{stat.team}}</div>
      <div class="col-sm-4 col-md-2 col-lg-2">leag: {{stat.league_id}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">y: {{stat.yellow}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">d: {{stat.red}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">t: {{stat.tot}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">g: {{stat.goals}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">a: {{stat.ass}}</div>
      <div class="col-sm-4 col-md-2 col-lg-1">p: {{stat.points}}</div>

    </div>
  </div>

</template>

<script>

  export default {
    name: 'stat',
    data () {
      return {
      }
    },
    props: {
      stat: {
        type: Object,
        required: true
      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>