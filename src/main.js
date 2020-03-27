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

Vue.config.productionTip = false
Vue.use(BootstrapVue)

library.add(fas)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.router = router

const moment = require('moment')
require('moment/locale/pt')

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
