import Vue from 'vue'
import Router from 'vue-router'
import Players from '@/components/Players'
import PlayerFull from '@/components/PlayerFull'
import AddPlayer from '@/components/AddPlayer'
import EditPlayer from '@/components/EditPlayer'
import Leagues from '@/components/Leagues'
import Stats from '@/components/Stats'
import Register from '@/components/Register'
import Empty from '@/components/Empty'

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
      path: '/register',
      component: Empty,
      children: [
        {
          path: "init",
          name: "register_init",
          component: Register
        },
        {
          path: 'player',
          name: 'register_player',
          component: AddPlayer
        },
      ],
      name: 'register'
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
      path: '/players/:player_id',
      component: PlayerFull,
      name: 'viewplayer',
      props: true
    },
    {
      path: '/players/:id/edit',
      component: EditPlayer,
      name: 'editplayer'
    }
  ]
})
