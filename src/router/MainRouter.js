import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/pages/HomePage.vue'
import People from '../components/pages/People.vue'
import Planets from '../components/pages/Planets.vue'
import StarShips from '../components/pages/StarShips.vue'
import StarShip from '../components/StarShip.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/planets',
      name: 'planets',
      component: Planets
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/starships',
      name: 'starships',
      component: StarShips
    },
    {
      path: '/starships/:id',
      name: 'starship',
      component: StarShip
    }
  ]
})
