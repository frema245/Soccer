import Api from '@/services/Api'

export default {
  fetchStats () {
    return Api().get('stat')
  },

  getStatsByPlayerID (player_id) {
    return Api().get('stat/' + player_id)
  },

  addStat (params) {
    return Api().post('stat', params)
  },

  deleteStat (id) {
    return Api().delete('stat/' + id)
  },

  updateStat (id, params) {
    return Api().put('stat/' + id, params)
  }

}
