import Api from '@/services/Api'

export default {
  fetchLeagues () {
    return Api().get('league')
  },

  addLeague (params) {
    return Api().post('league', params)
  },
  getLeague (id) {
    return Api().get('league/' + id)
  },
  deleteLeague (id) {
    return Api().delete('league/' + id)
  }
}
