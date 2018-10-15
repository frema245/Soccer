import Api from '@/services/Api'

export default {
  add (params) {
    return Api().post('api/users', params)
  },
}
