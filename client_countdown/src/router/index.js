import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Smart Sports Recruitment',
      component: Home
    }

    /*

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

    */

  ]
})
