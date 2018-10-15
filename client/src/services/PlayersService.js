import Api from '@/services/Api'

export default {
  fetchPlayers (query) {
    return Api().get('player' + query)
  },

  addPlayer (params) {
    return Api().post('add_player', params)
  },

  updatePlayer (params, id) {
    return Api().put('player/' + id, params)
  },

  getPlayer (id) {
    return Api().get('player/' + id)
  },

  deletePlayer (id) {
    return Api().delete('player/' + id)
  },

  uploadAvatar( file, id ) {
    return Api().post('player/' + id + '/avatar', file)
  }
}
