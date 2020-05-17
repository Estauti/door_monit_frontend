import router from '@/router'
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { api_url } from '@/helpers/api_url.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import ActionCableVue from 'actioncable-vue';
import Paginate from 'vuejs-paginate'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('paginate', Paginate)

library.add(fas)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.router = router

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = api_url + '/api/';

Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: { url: api_url + '/api/auth/sign_in', method: 'POST', redirect: '/home', fetchUser: true },
    logoutData: { redirect: '/login' },
    parseUserData: function (data) {
      return data || {}
    },
    rolesVar: 'roles',
    fetchData: { url: 'auth/get_by_token', method: 'GET' },
    refreshData: { url: 'auth/refresh', method: 'GET', atInit: false },
    registerData: { url: 'auth', method: 'POST' },
    tokenStore: ['localStorage', 'cookie']
});

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: () => {
    let token = localStorage.getItem('default_auth_token')
    return `ws://localhost:3000/api/cable?jwt=${token}`
  },
  connectImmediately: true
});

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 3000,
  // wordWrap: true,
  width: '150px'
})

const moment = require('moment')
require('moment/locale/pt')

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
