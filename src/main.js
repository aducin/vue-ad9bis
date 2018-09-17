// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import VueRx from 'vue-rx'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Polyfill from './polyfill.js'

import { store } from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleDown, faArrowCircleRight, faArrowCircleUp, faFile, faList, faListAlt, faMinusCircle,
  faNewspaper, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/common.css'
import './filters/filters'

library.add([faArrowCircleDown, faArrowCircleRight, faArrowCircleUp, faFile, faList, faListAlt, faMinusCircle,
  faNewspaper, faPlusCircle, faTrash])

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

require('vue2-animate/dist/vue2-animate.min.css')

Promise.prototype.finally = Polyfill

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(Vuelidate)
Vue.use(VueRx)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
