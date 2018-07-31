import Vue from 'vue'
import Router from 'vue-router'
import Players from '@/components/Players'
import addplayer from '@/components/AddPlayer'
import editplayer from '@/components/EditPlayer'

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
      path: '/players/add',
      component: addplayer,
      name: 'addplayer'
    },
    {
      path: '/players/:id/edit',
      component: editplayer,
      name: 'editplayer'
    }
  ]
})
