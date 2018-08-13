import Api from '@/services/Api'

export default {
  fetchLeagues (query) {
    return Api().get('league')
  },

  addLeague (params) {
    return Api().post('league', params)
  }
}
