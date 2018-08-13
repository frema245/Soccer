import Api from '@/services/Api'

export default {
  fetchStats () {
    return Api().get('stat')
  },

  addStat (params) {
    return Api().post('stat', params)
  }
}
