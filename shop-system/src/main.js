// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入Element-ui
import Element from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 element 的插件
import ElTreeGrid from 'element-tree-grid'

// 引入myaxios
import myaxios from './assets/js/myaxios'

// 引入富文本编辑框
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor /* { default global options } */)
// 使用element
Vue.use(Element)
// 使用myaxios
Vue.use(myaxios)
Vue.config.productionTip = false
// 将插件注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
