<template>
  <div class="container">
    <player v-for="player in players" :player="player">

    </player>
  </div>
</template>

<script>
  import PlayerService from '@/services/PlayersService'
  import Player from './Player.vue'

  export default {
    name: 'players',
    data () {
      return {
        players: []
      }
    },
    components: {
      Player
    },
    mounted () {
      this.getPlayers()
    },
    methods: {
      async getPlayers () {
        console.log('Get players');
        console.log(this.$route.query);
        console.log(this.$route);
        const response = await PlayerService.fetchPlayers(this.$route.fullPath);
        this.players = response.data.players
      }

      /*
      ,
      async deletePlayer (id) {
        const $this = this
        $this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function () {
          PlayerService.deletePlayer(id)
          $this.$router.go({
            path: '/'
          })
        })
      }

      */

    }
  }
</script>

<style scoped>

</style>