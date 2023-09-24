import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDo from '../views/ToDo.vue'
import Familiar from '../views/Familiar.vue'
import Quest from '../views/Quest.vue'
import Weapon from '../views/Weapon.vue'
import Stats from '../views/Stats.vue'
import Battle from '../views/Battle.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'add',
  //   component: () => import('../components/UserCreate'),
  // },
  // {
  //   path: '/list',
  //   name: 'list',
  //   component: () => import('../components/UserList'),
  // },
  // {
  //   path: '/edit/:id',
  //   name: 'edit',
  //   component: () => import('../components/UserEdit'),
  // },
  {
    path: '/',
    name: 'Stats',
    component: Stats,
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
  },
  {
    path: '/familiar',
    name: 'Familiar',
    component: Familiar,
  },
  {
    path: '/quest',
    name: 'Quest',
    component: Quest,
  },
  {
    path: '/battle',
    name: 'Battle',
    component: Battle,
  },
  {
    path: '/weapon',
    name: 'Weapon',
    component: Weapon,
  },
  {
    path: '/todo/edit/:id',
    name: 'EditNote',
    component: () => import('../components/EditNote'),
  },
  {
    path: '/weapon/details/:id',
    name: 'WeaponDetails',
    component: () => import('../views/WeaponDetails'),
  },
  {
    path: '/familiar/details/:id',
    name: 'FamiliarDetails',
    component: () => import('../views/FamiliarDetails'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
