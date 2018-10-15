<template>
  <div v-on:click="viewPlayer">

    <div class="card text-white bg-primary mb-3" style="border: 0px">
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <div class="img-container" v-bind:style="{ backgroundImage: 'url(' + avatar_url + ')' }">
          </div>
        </div>
        <div class="card-body col-md-8 col-lg-9">

              <h5 class="card-title">
                {{player.name_first}} {{player.name_last}}, {{player.age}}
                <small class="text-muted">
                  {{showFullCountry(player.nationality)}}
                </small>
              </h5>

          <div class="row mt-md-1 mt-lg-2 mt-xl-3">

            <div class="col-12 col-lg-3 col-md-5">
              <div class="row">
                <div class="col-6 col-md-12">
                  <p class="card-text short-data">
                    Height: <b>{{player.cm}}</b> <br/>
                    Weight: <b>{{player.kg}}</b>
                  </p>
                </div>
                <div class="col-6 col-md-12">
                  <p class="card-text short-data">
                  Toefl: <b>{{player.toefl_score}}</b> <br/>
                  SAT: <b>{{player.sat_score}}</b> <br/>
                  ACT: <b>{{player.act_score}}</b>
                  </p>
                </div>

              </div>
              <!--
              <p class="card-text" style="text-align: left">
                Height: <b>190cm{{player.cm}}</b> <br/>
                Weight: <b>88kg{{player.kg}}</b> <br/>
                Toefl: <b>956{{player.toefl_score}}</b> <br/>
                SAT: <b>{{player.sat_score}}</b> <br/>
                ACT: <b>-{{player.act_score}}</b> <br/>
              </p>
              -->
            </div>

            <div class="col-12 col-lg-5 col-md-7 mt-3 mt-md-0">
              <p>
                Oscar is a <b>Forward</b> playing positions <b>ST</b> and <b>CF</b>. He has played for <strong>AFK Linköping</strong> in <strong>Division 2</strong> in <strong>Sweden</strong>.
              </p>

            </div>

            <div class="col-12 col-lg-4 d-none d-lg-block">
              <p>
                About {{player.name_first}}: <br/>
                <em class="d-lg-block d-xl-none">
                  {{player.presentation.substr(0,90)}}...
                </em>
                <em class="d-none d-xl-block">
                  {{player.presentation.substr(0,180)}}...
                </em>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
    <!--
    <p> Name: {{player.name_first}} {{player.name_last}}</p>
    <p> Gender: {{player.gender}} Birth date: {{player.birth_date}} Age: {{player.age}} </p>
    <p> Nationality: {{player.nationality}} Joined: {{player.join_date}} Positions: {{player.positions}} </p>
    <p> Toefl: {{player.toefl_score}} SAT: {{player.sat_score}} </p>
    <p> ACT: {{player.act_score}} Height: {{player.cm}} </p>
    <p> Weight: {{player.kg}} Phone: {{player.phone_number}} </p>
    <p> Email: {{player.email}} Skype: {{player.skype}} Agency: {{player.agency}} </p>
    <p>  ----  </p>
    -->
  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
        avatar_url: null
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
      this.setAvatarURL();
    },
    methods: {
      viewPlayer () {
        this.$emit('viewPlayer', this.player._id)
      },

      setAvatarURL() {
        this.avatar_url = "http://localhost:8081/player/" + this.player._id + "/avatar";
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

  .short-data {
    text-align: center;
  }

  @media (min-width: 768px) {
    .short-data {
      text-align: left;
    }
  }

  .img-container {
    background: #6c77ff url("../assets/oscar.jpg");
    background-size: cover;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative; /* If you want text inside of it */
  }

</style>