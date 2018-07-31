<template>
  <div class="players">
    <h1>players</h1>
    <div v-if="players.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'addplayer' }" class="">Add player</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="player in players">
          <td>{{ player.name_first }}</td>
          <td>{{ player.name_last }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'editplayer', params: { id: player._id } }">Edit</router-link> |
            <a href="#" @click="deleteplayer(player._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no players.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addplayer' }" class="add_player_link">Add player</router-link>
    </div>
  </div>
</template>

<script>
import PlayerService from '@/services/PlayersService'
export default {
  name: 'players',
  data () {
    return {
      players: []
    }
  },
  mounted () {
    this.getPlayers()
  },
  methods: {
    async getPlayers () {
      console.log('Get players')
      console.log(this.$route.query)
      console.log(this.$route)
      const response = await PlayerService.fetchPlayers(this.$route.fullPath)
      this.players = response.data.players
    },
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
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_players_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
