import Vue from 'vue'
import Router from 'vue-router'
import Players from '@/components/Players'
import AddPlayer from '@/components/AddPlayer'
import EditPlayer from '@/components/EditPlayer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Players',
      component: Players
    },
    {
      path: '/add',
      component: AddPlayer,
      name: 'addplayer'
    },
    {
      path: '/players/:id/edit',
      component: EditPlayer,
      name: 'editplayer'
    }
  ]
})
