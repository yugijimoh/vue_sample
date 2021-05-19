// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/graph'

Vue.config.productionTip = false
Vue.component('chart', ECharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: { poption: '' },
  components: { App },
  template: '<App/>'
})
