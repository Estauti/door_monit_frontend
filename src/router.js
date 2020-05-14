import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Redirect',
      redirect: function (to) {
        if (to.query.redirect) {
          var path = to.query.redirect
          delete to.query.redirect
          return {
            path: '/' + path,
            query: to.query
          }
        } else {
          return {
            path: '/home',
            query: to.query
          }
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      meta: { auth: false },
      component: () => import('./views/Users/Login.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      meta: { auth: false },
      component: () => import('./views/Users/SignUp.vue')
    },
    {
      path: '/home',
      name: 'Home',
      meta: { auth: true },
      component: () => import('./views/Home/Index.vue')
    },
    {
      path: '/devices',
      name: 'DevicesIndex',
      meta: { auth: true },
      component: () => import('./views/Devices/Index.vue')
    },
    {
      path: '/measurements',
      name: 'MeasurementsIndex',
      meta: { auth: true },
      component: () => import('./views/measurements/Index.vue')
    }
  ]
})

export default router;