import Vue from 'vue'
import Router from 'vue-router'
import Players from '@/components/Players'
import AddPlayer from '@/components/AddPlayer'
import EditPlayer from '@/components/EditPlayer'
import Leagues from '@/components/Leagues'
import Stats from '@/components/Stats'

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'players',
      component: Players
    },
    {
      path: '/add',
      component: AddPlayer,
      name: 'addplayer'
    },
    {
      path: '/leagues',
      component: Leagues,
      name: 'leagues'
    },
    {
      path: '/stats',
      component: Stats,
      name: 'stats'
    },
    {
      path: '/players/:id/edit',
      component: EditPlayer,
      name: 'editplayer'
    }
  ]
})
