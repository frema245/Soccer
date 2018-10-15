<template>
  <div class="container-medium">

    <div class="card mb-3" style="border: 0px">

      <div class="row">
        <!-- Avatar -->
        <div class="col-md-6">

          <div class="img-container text-white" v-bind:style="{ backgroundImage: 'url(' + avatar_url + ')' }">
            <i v-if="edit_mode_avatar" @click="editAvatar" class="edit-icon fa fa-undo fa-3x"></i>
            <i v-else @click="dismissAvatar" class="edit-icon fa fa-edit fa-3x"></i>
          </div>

          <div v-show=edit_mode_avatar>
            <input type="file" @change="onFileChanged">
            <button type="button" v-show="show_upload_button" class="btn btn-primary mt-2" @click="uploadAvatar" >Upload!</button>

          </div>

        </div>

        <!-- Info -->
        <div class="col-md-6 mt-3 mt-md-0">
          <h3 class="card-title">
            {{player.name_first}} {{player.name_last}}, {{player.age}}
            <small class="text-muted">
              {{showFullCountry(player.nationality)}}
            </small>
          </h3>
          <div class="card-body mt-3">

            <!-- EDITMODE -->
            <div v-if="edit_mode_info" class="line-left pos-rel">

              <div class="text-right">
                <i @click="revertInfo" class="fa fa-undo fa-2x"></i>
                <i @click="saveInfo" class="fa fa-check fa-2x"></i>
              </div>

              <div class="row">
                <!-- Height -->
                <div class="form-group col-6">
                  <label class="col-form-label col-form-label-sm" for="cmInput">Height (cm)</label>
                  <input type="number" v-model=player.cm class="form-control form-control-sm" placeholder="height in cm" id="cmInput">
                </div>

                <!-- Weight -->
                <div class="form-group col-6">
                  <label class="col-form-label col-form-label-sm" for="kgInput">Weight (kg)</label>
                  <input type="number" v-model=player.kg class="form-control form-control-sm" placeholder="weight in kg" id="kgInput">
                </div>

                <!-- ACT -->
                <div class="form-group col-6">
                  <label class="col-form-label col-form-label-sm" for="actInput">ACT</label>
                  <input type="number" v-model=player.act_score class="form-control form-control-sm" id="actInput">
                </div>

                <!-- SAT -->
                <div class="form-group col-6">
                  <label class="col-form-label col-form-label-sm" for="satInput">SAT</label>
                  <input type="number" v-model=player.sat_score class="form-control form-control-sm" id="satInput">
                </div>

                <!-- Toefl -->
                <div class="form-group col-6">
                  <label class="col-form-label col-form-label-sm" for="toeflInput">Toefl</label>
                  <input type="number" v-model=player.toefl_score class="form-control form-control-sm" id="toeflInput">
                </div>
              </div>

            </div>

            <!-- VIEWMODE -->
            <div v-else class="line-left pos-rel">

              <i @click="editInfo" class="edit-icon fa fa-edit fa-2x"></i>

              <p>
                Positions: <b v-for="pos in player.positions">{{pos}} </b>
              </p>
              <p>
                Height: <b>{{player.cm}}cm</b> <br/>
                Weight: <b>{{player.kg}}kg</b>
              </p>
              <p>
                Toefl: <b>{{player.toefl_score}}</b> <br/>
                SAT: <b>{{player.sat_score}}</b> <br/>
                ACT: <b>{{player.act_score}}</b>
              </p>

            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- About -->
    <div class="pos-rel mt-5">
      <i v-if="!edit_mode_about" @click="editAbout" class="edit-icon fa fa-edit fa-2x"></i>
      <div v-else class="text-right edit-icon">
        <i @click="revertAbout" class="fa fa-undo fa-2x"></i>
        <i @click="saveAbout" class="fa fa-check fa-2x"></i>
      </div>
      <h3>About {{player.name_first}}:</h3>
    </div>
    <hr>
    <div>

      <!-- description -->
      <div v-if="edit_mode_about" class="form-group">
        <textarea class="form-control" rows="5" v-model="player.presentation"></textarea>
      </div>
      <p v-else class="preserve-line-breaks"><em>{{player.presentation}}</em></p>

    </div>

    <!-- STATS -->
    <div class="pos-rel mt-5">
      <i v-if="!edit_mode_stats" @click="editStats" class="edit-icon fa fa-edit fa-2x"></i>

      <div v-else class="text-right edit-icon">
        <i @click="addNewStat" class="fa fa-plus fa-2x"></i>
        <i @click="saveStats" class="fa fa-check fa-2x"></i>
      </div>

      <h3>Statistics:</h3>
    </div>
    <hr>

    <transition-group name="component-fade">

      <add-stat
        v-if="show_add_stat"
        :owner_id="player._id"
        :stat_edit="stat_to_be_edited"
        :update_mode="stat_update_mode"
        key="addstat"
        @hide="show_add_stat=false"
        @del="deleteStat"
      />

      <stat v-else
            :key="stat._id"
            v-for="(stat, index) in stats"
            :stat="stat"
            :editable="edit_mode_stats"
            @edit="editExistingStat(stat)"
      />

    </transition-group>

    <!-- VIDEOS -->
    <div class="pos-rel mt-5">
      <i v-if="edit_mode_videos" @click="saveVideos" class="edit-icon fa fa-check fa-2x"></i>
      <i v-else @click="editVideos" class="edit-icon fa fa-edit fa-2x"></i>
      <h3>Videos:</h3>
    </div>
    <hr>
    <div v-for="(video, index) in player.youtube_links">
      <div class="row justify-content-center">

        <div v-show="edit_mode_videos" class="col-auto">
          <i class="fa fa-remove fa-3x" style="height: 50px; width: 50px" @click="removeYoutubeLink(index)"></i>
        </div>

        <div class="col-auto">
          <iframe class="d-none d-md-block" :width="500" :height="350" :src="video"></iframe>
          <iframe class="d-block d-md-none" :width="360" :height="240" :src="video"></iframe>
        </div>

      </div>
    </div>
    <div v-show="edit_mode_videos">
      <form>
        <fieldset>
          <div class="row">
            <!-- first name -->
            <div class="form-group col-12 mx-auto text-left">
              <label class="col-form-label" for="youtube_link">Add youtube video</label>

              <div class="row">
                <div class="col">
                  <input type="text" v-model=added_youtube_link placeholder="youtube link" class="form-control" id="youtube_link">
                </div>
                <div class="col-auto">
                  <button type="button" class="btn btn-primary" @click="addYoutubeLink">Add</button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>

  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService';
  import StatsService from "../services/StatsService";

  import Stat from '@/components/Stat.vue'
  import AddStat from '@/components/AddStat.vue'

  export default {
    name: 'PlayerFull',
    data () {
      return {
        player_id: null,

        player: {
          type: Object,
          default: null
        },

        player_revert: {
          type: Object,
          default: null
        },

        selected_file: null,
        avatar_url: null,
        added_youtube_link: null,

        edit_mode_info: false,
        edit_mode_about: false,
        edit_mode_stats: false,
        edit_mode_videos: false,
        edit_mode_avatar: false,

        show_add_stat: false,

        stat_update_mode: false,

        show_upload_button: false,
        stats: null,

        stat_to_be_edited: null,
      }
    },
    components: {
      AddStat,
      Stat
    },
    mounted () {
      this.mounted();
    },
    methods: {

      mounted() {
        this.player_id = this.$route.params.player_id;
        this.getPlayerInfoByID(this.player_id);
        this.setAvatarURL();
        this.getStatsByPlayerID(this.player_id);
      },
      /*
      Info
       */
      editInfo () {
        this.edit_mode_info = true;
        this.player_revert = JSON.parse(JSON.stringify(this.player))
      },
      revertInfo () {
        this.edit_mode_info = false;
        this.player = JSON.parse(JSON.stringify(this.player_revert))
      },
      saveInfo () {
        this.edit_mode_info = false;
        this.updatePlayerInfoByID(this.player, this.player_id)
      },

      /*
      About
       */
      editAbout () {
        this.edit_mode_about = true;
        this.player_revert = JSON.parse(JSON.stringify(this.player))
      },
      revertAbout () {
        this.edit_mode_about = false;
        this.player = JSON.parse(JSON.stringify(this.player_revert))
      },
      saveAbout () {
        this.edit_mode_about = false;
        this.updatePlayerInfoByID(this.player, this.player_id)
      },

      /*
      Stats
       */
      editStats () {
        this.edit_mode_stats = true;
      },
      saveStats () {
        this.edit_mode_stats = false;
      },
      addNewStat () {
        this.stat_update_mode = false;
        this.show_add_stat = true;
      },
      editExistingStat (stat) {
        this.stat_to_be_edited = stat;
        this.stat_update_mode = true;
        this.show_add_stat = true;
      },
      deleteStat () {},
      async getStatsByPlayerID (player_id) {
        const response = await StatsService.getStatsByPlayerID(player_id);
        this.stats = response.data.stats;
      },

      /*
      Videos
       */
      editVideos () {
        this.edit_mode_videos = true;
      },
      saveVideos () {
        this.edit_mode_videos = false;
      },
      async addYoutubeLink() {
        let url = this.added_youtube_link.replace("watch?v=", "embed/");
        let youtube_links = this.player.youtube_links;
        youtube_links.push(url);
        let send_json = {
          youtube_links: youtube_links
        };
        await PlayersService.updatePlayer(send_json, this.player_id);
      },
      async removeYoutubeLink(index) {
        let youtube_links = this.player.youtube_links;
        youtube_links.splice(index, 1);
        let send_json = {
          youtube_links: youtube_links
        };
        await PlayersService.updatePlayer(send_json, this.player_id);
      },

      /*
      Avatar
       */

      editAvatar () {
        this.edit_mode_avatar = true;
      },
      dismissAvatar () {
        this.edit_mode_avatar = false;
      },
      onFileChanged (event) {
        this.selected_file = event.target.files[0];
        this.show_upload_button = true;
      },
      setAvatarURL() {this.avatar_url = "http://localhost:8081/player/" + this.player_id + "/avatar";},
      async uploadAvatar() {
        const formData = new FormData();
        formData.append('avatar', this.selected_file, this.selected_file.name);
        await PlayersService.uploadAvatar(formData, this.player_id);
        this.mounted();
      },

      /*
      Other
       */
      showFullCountry (code_input) {
        let countries =  require("../assets/countries");
        for (let i = 0; i < countries.length; i++){
          if (countries[i].code == code_input){
            return countries[i].name
          }
        }
        return "null"
      },
      async getPlayerInfoByID (player_id) {
        const response = await PlayersService.getPlayer(player_id);
        this.player = response.data;
      },
      async updatePlayerInfoByID (player, player_id) {
        const response = await PlayersService.updatePlayer(player, player_id);
        console.log(response);
      }
    }
  }

</script>

<style scoped>

  .preserve-line-breaks {
    white-space:pre-wrap;
  }

  .fa-edit:hover {
    color: #9b0204;
  }

  .fa-plus:hover {
    color: #176500;
  }

  .fa-undo:hover {
    color: #9b0204;
  }

  .fa-check:hover {
    color: #176500;
  }

  hr {
    display: block;
    position: relative;
    padding: 0;
    margin: 8px auto;
    height: 0;
    width: 100%;
    max-height: 0;
    font-size: 2px;
    line-height: 0;
    clear: both;
    border: none;
    border-top: 1px solid #303030;
    border-bottom: 1px solid #303030;
  }

  .pos-rel {
    position: relative;
  }

  .edit-icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .line-left {
    border-left: 2px solid #303030;
    padding-left: 10px;
  }

  .img-container {
    background-size: cover;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative; /* If you want text inside of it */
  }

</style>