import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueLodash from 'vue-lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import HighCharts from 'highcharts-vue'
import Dropdown from 'bp-vuejs-dropdown';

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(VueAxios, axios)
Vue.use(HighCharts)
Vue.use(Dropdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
