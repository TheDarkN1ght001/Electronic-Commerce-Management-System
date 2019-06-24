import Vue from 'vue'
import Router from 'vue-router'
// 引入路由对应的组件
import Login from '../components/login/login.vue'
import Useelement from '../components/useelement/useelement.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Roles from '../components/roles/roles.vue'
import Right from '../components/right/right.vue'
Vue.use(Router)

let router = new Router({
  routes: [
    // element
    { path: '/useelement', name: 'useelement', component: Useelement },
    // 添加一个login路由
    { path: '/login', name: 'login', component: Login },
    // 添加主页home路由
    { path: '/', name: 'home', component: Home, children: [{ path: '/users', component: Users }, { path: '/roles', component: Roles }, { path: '/right', component: Right }] }

  ]
})

export default router
