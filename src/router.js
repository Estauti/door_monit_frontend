import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/devices',
      name: 'DevicesIndex',
      component: () => import('./views/Devices/Index.vue')
    }
  ]
})

export default router;