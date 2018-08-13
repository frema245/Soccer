<template>

  <div class="container-medium">

    <h3>Add League</h3>

    <form>
      <fieldset>

        <div class="row">

          <!-- first name -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nameFirstInput">Name</label>
            <input type="text" v-model=name class="form-control" placeholder="Division 2" id="nameFirstInput">
          </div>

          <!-- gender -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="genderInput">Gender</label>
            <select class="custom-select" id="genderInput" v-model="gender">
              <option value="male" selected>male</option>
              <option value="female">female</option>
            </select>
          </div>

          <!-- nationality -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nationalityInput">Nationality</label>
            <select class="custom-select" id="nationalityInput" v-model="country">
              <option value="SE" selected>Sweden</option>
              <option v-for="country in countries" v-bind:value="country.code">
                {{ country.name }}
              </option>
            </select>
          </div>

          <!-- Rating -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="satInput">Rating</label>
            <input type="number" v-model=rating class="form-control" placeholder="rating" id="satInput">
          </div>

        </div>

        <button type="submit" @click="addLeague" class="btn btn-primary mb-5">Submit</button>

      </fieldset>
    </form>

    <league v-for="league in leagues" :league="league" :key="league._id">

    </league>

  </div>

</template>

<script>
  import LeaguesService from '@/services/LeaguesService'
  import League from './League.vue'

  export default {
    name: "leagues",
    data () {
      return {
        name: "",
        gender: "",
        country: "",
        rating: "",
        leagues: [],
        countries: require("../assets/countries")
      }
    },
    components: {
      League
    },
    mounted () {
      this.getLeagues()
    },
    watch: {


    },

    methods: {
      async getLeagues () {
        const response = await LeaguesService.fetchLeagues();
        this.leagues = response.data.leagues
      },
      async addLeague () {
        console.log("addLeague");
        await LeaguesService.addLeague({
          name: this.name,
          gender: this.gender,
          country: this.country,
          rating: this.rating
        });
      }

    }
  }
</script>

<style scoped>

</style>