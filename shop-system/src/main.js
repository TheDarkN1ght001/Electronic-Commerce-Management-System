// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入Element-ui
import Element from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入myaxios
import myaxios from './assets/js/myaxios'

// 使用element
Vue.use(Element)
// 使用myaxios
Vue.use(myaxios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
