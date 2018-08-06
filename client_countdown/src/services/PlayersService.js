import Api from '@/services/Api'

export default {
  fetchPlayers (query) {
    return Api().get('player' + query)
  },

  addPlayer (params) {
    return Api().post('add_player', params)
  },

  updatePlayer (params) {
    return Api().put('player/' + params.id, params)
  },

  getPlayer (params) {
    return Api().get('player/' + params.id)
  },

  deletePlayer (id) {
    return Api().delete('player/' + id)
  }
}
