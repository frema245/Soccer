<template>

  <div class="card text-white bg-primary mb-3" style="border: 0px">
    <div class="row">
      <div class="col-sm-6 col-md-3">
        {{league.name}}
      </div>
      <div class="col-sm-6 col-md-3">
        {{league.gender}}
      </div>
      <div class="col-sm-6 col-md-3">
        {{showFullCountry(league.country)}}
      </div>
      <div class="col-sm-6 col-md-3">
        {{league.rating}}
      </div>
    </div>
    <div class="col"><button type="submit" @click="del" class="btn btn-secondary mb-5">Del</button></div>
  </div>

</template>

<script>

  export default {
    name: 'league',
    data () {
      return {
      }
    },
    props: {
      league: {
        type: Object,
        required: true
      }
    },
    mounted () {
    },
    methods: {
      del () {
        this.$emit('del', this.league._id)
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

</style>