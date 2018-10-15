<template>

  <div class="container-medium mb-5">

    <h1>Add Player</h1>

    <form>
      <fieldset>

        <div class="row">

          <!-- first name -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nameFirstInput">First Name</label>
            <input type="text" v-model=name_first class="form-control" placeholder="John" id="nameFirstInput">
          </div>

          <!-- last name -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nameLastInput">Last Name</label>
            <input type="text" v-model=name_last class="form-control" placeholder="Smith" id="nameLastInput">
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
            <select class="custom-select" id="nationalityInput" v-model="nationality">
              <option value="SE" selected>Sweden</option>
              <option v-for="country in countries" v-bind:value="country.code">
                {{ country.name }}
              </option>
            </select>
          </div>

          <legend>Positions</legend>


          <!-- positions : Back -->
          <div class="form-group col-md-6 text-left">

            <h6>Defender</h6>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rwbInput" v-model="pos.rwb">
              <label class="custom-control-label" for="rwbInput">Right Wing Defender</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="lwbInput" v-model="pos.lwb">
              <label class="custom-control-label" for="lwbInput">Left Wing Defender</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cbInput" v-model="pos.cb">
              <label class="custom-control-label" for="cbInput">Center Defender</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rbInput" v-model="pos.rb">
              <label class="custom-control-label" for="rbInput">Right Defender</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="lbInput" v-model="pos.lb">
              <label class="custom-control-label" for="lbInput">Left Defender</label>
            </div>

          </div>

          <!-- positions : Midfielder -->
          <div class="form-group col-md-6 text-left">

            <h6>Midfielder</h6>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="camInput" v-model="pos.cam">
              <label class="custom-control-label" for="camInput">Center Attacking Midfielder</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cmInput" v-model="pos.cm">
              <label class="custom-control-label" for="cmInput">Center Midfielder</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rmInput" v-model="pos.rm">
              <label class="custom-control-label" for="rmInput">Right Midfielder</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="lmInput" v-model="pos.lm">
              <label class="custom-control-label" for="lmInput">Left Midfielder</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cdmInput" v-model="pos.cdm">
              <label class="custom-control-label" for="cdmInput">Center Defending Midfielder</label>
            </div>

          </div>

          <!-- positions : Forward -->
          <div class="form-group col-md-6 text-left">

            <h6>Forward</h6>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="stInput" v-model="pos.st">
              <label class="custom-control-label" for="stInput">Striker</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cfInput" v-model="pos.cf">
              <label class="custom-control-label" for="cfInput">Center Forward</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rwInput" v-model="pos.rw">
              <label class="custom-control-label" for="rwInput">Right Wing</label>
            </div>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="lwInput" v-model="pos.lw">
              <label class="custom-control-label" for="lwInput">Left Wing</label>
            </div>

          </div>

          <!-- positions : Goalkeeper -->
          <div class="form-group col-md-6 text-left">

            <h6>Goalkeeper</h6>

            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="gkInput" v-model="pos.gk">
              <label class="custom-control-label" for="gkInput">Goalkeeper</label>
            </div>

          </div>

          <!-- description -->
          <div class="form-group col-12">
            <label for="descriptionsInput">Write about yourself</label>
            <textarea class="form-control" id="descriptionsInput" rows="5" v-model="presentation"></textarea>
          </div>

          <!-- dateofbirth -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="birthDateInput">Date of birth</label>
            <input type="text" v-model=birth_date class="form-control" placeholder="YYYY-MM-DD" id="birthDateInput">
          </div>

          <!-- phone -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="phoneInput">Phone number</label>
            <input type="text" v-model=phone_number class="form-control" placeholder="Enter your phone number" id="phoneInput">
          </div>

          <!-- email -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="emailInput">Email</label>
            <input type="text" v-model=email class="form-control" placeholder="yourmail@something.com" id="emailInput">
          </div>

          <!-- skype -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="skypeInput">Skype</label>
            <input type="text" v-model=skype class="form-control" placeholder="skype username" id="skypeInput">
          </div>

          <!-- SAT -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="satInput">SAT</label>
            <input type="number" v-model=sat_score class="form-control" placeholder="sat score" id="satInput">
          </div>

          <!-- Toefl -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="toeflInput">Toefl</label>
            <input type="number" v-model=toefl_score class="form-control" placeholder="toefl score" id="toeflInput">
          </div>

          <!-- ACT -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="actInput">ACT</label>
            <input type="number" v-model=act_score class="form-control" placeholder="act score" id="actInput">
          </div>

          <!-- Height -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="cmInput">Height</label>
            <input type="number" v-model=cm class="form-control" placeholder="height in cm" id="cmInput">
          </div>

          <!-- Weight -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="kgInput">Weight</label>
            <input type="number" v-model=kg class="form-control" placeholder="weight in kg" id="kgInput">
          </div>

        </div>

        <button type="button" @click="addPlayer" class="btn btn-primary">Submit</button>

      </fieldset>
    </form>

  </div>

  <!--

      <form>
        <fieldset>
          <legend>Legend</legend>



          <div class="form-group">
            <label class="col-form-label" for="inputDefault">Default input</label>
            <input type="text" class="form-control" placeholder="Default input" id="inputDefault">
          </div>


          <div class="form-group">
            <select class="custom-select">
              <option selected="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleTextarea">Example textarea</label>
            <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">File input</label>
            <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
            <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>

        </fieldset>
      </form>

      <!--

      <div class="form">

        <div>
          <input type="text" name="title" placeholder="first name" v-model="name_first">
        </div>
        <div>
          <input type="text" name="title" placeholder="last name" v-model="name_last">
        </div>
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>

        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>

        <div>
          <button class="app_player_btn" @click="addPlayer">Add</button>
        </div>

      </div>

      -->

</template>

<script>
  import PlayersService from '@/services/PlayersService'

  export default {
    name: 'addplayer',
    data () {
      return {
        pos: {
          st: false,
          cf: false,
          rw: false,
          lw: false,
          cam: false,
          cm: false,
          rm: false,
          lm: false,
          cdm: false,
          rwb: false,
          lwb: false,
          cb: false,
          rb: false,
          lb: false,
          gk: false
        },

        name_first: '',
        name_last: '',
        gender: '',
        birth_date: '',
        nationality: '',
        presentation: '',
        positions: [],
        toefl_score: null,
        sat_score: null,
        act_score: null,
        cm: null,
        kg: null,
        phone_number: '',
        email: '',
        skype: '',
        countries: require("../assets/countries"),
        positions_db: require("../assets/positions")
      }
    },
    components: {
    },
    methods: {
      getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },

      async addPlayer () {
        console.log("addPlayer");

        for (let key in this.pos) {
          if (this.pos[key]) {
            this.positions.push(key)
          }
        }

        console.log(this.positions);

        PlayersService.addPlayer({
          name_first: this.name_first,
          name_last: this.name_last,
          gender: this.gender,
          age: this.getAge(this.birth_date),
          birth_date: this.birth_date,
          nationality: this.nationality,
          presentation: this.presentation,
          join_date: Date.now(),
          positions: this.positions,
          toefl_score: this.toefl_score,
          sat_score: this.sat_score,
          act_score: this.act_score,
          cm: this.cm,
          kg: this.kg,
          phone_number: this.phone_number,
          email: this.email,
          skype: this.skype
        }).then(function (response) {
          console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });

        console.log("Done")

      }
    }
  }
</script>
<style scoped>


</style>

