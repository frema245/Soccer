<template>
  <div>
    <p> Name: {{player.name_first}} {{player.name_last}}</p>
    <p> Gender: {{player.gender}} Birth date: {{player.birth_date}} Age: {{player.age}} </p>
    <p> Nationality: {{player.nationality}} Joined: {{player.join_date}} Positions: {{player.positions}} </p>
    <p> Toefl: {{player.toefl_score}} SAT: {{player.sat_score}} </p>
    <p> ACT: {{player.act_score}} Height: {{player.cm}} </p>
    <p> Weight: {{player.kg}} Phone: {{player.phone_number}} </p>
    <p> Email: {{player.email}} Skype: {{player.skype}} Agency: {{player.agency}} </p>
    <p>  ----  </p>
  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
      }
    },
    props: {
      player: {
        type: Object,
        required: true
      }
    },
    components: {
    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>