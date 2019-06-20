import Vue from 'vue'
import Router from 'vue-router'
// 引入路由对应的组件
import Login from '../components/login/login.vue'
import Useelement from '../components/useelement/useelement.vue'
import Home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // element
    {path: '/useelement', name: 'useelement', component: Useelement},
    // 添加一个login路由
    {path: '/login', name: 'login', component: Login},
    //添加主页home路由
    {path: '/', name: 'home', component: Home}
  ]
})
