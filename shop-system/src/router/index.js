import Vue from 'vue'
import Router from 'vue-router'
// 引入路由对应的组件
import Login from '../components/login/login.vue'
import Useelement from '../components/useelement/useelement.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Roles from '../components/roles/roles.vue'
import Rights from '../components/right/rights.vue'
import Goods from '../components/goods/goods.vue'
import Categories from '../components/categories/categories.vue'
import Goodsadd from '../components/goodsadd/goodsadd.vue'
import Reports from '../components/reports/reports.vue'
import Params from '../components/params/params.vue'
import Orders from '../components/orders/orders.vue'
// 使用到 element-ui 中的一个插件：element-tree-grid
import userTreeGrid from '../components/useelement/userTreeGrid.vue'

// 在组件之外使用elment ui的message方法
import { Message } from 'element-ui'
Vue.use(Router)

let router = new Router({
  routes: [
    // element
    { path: '/useelement', name: 'useelement', component: Useelement },
    // 添加一个login路由
    { path: '/login', name: 'login', component: Login },
    // 使用到 element-ui 中的一个插件：element-tree-grid
    {
      path: '/userTreeGrid',
      component: userTreeGrid
    },
    // 添加主页home路由
    { path: '/', name: 'home', component: Home, children: [{ path: '/users', component: Users }, { path: '/roles', component: Roles }, { path: '/rights', component: Rights }, { path: '/goods', component: Goods }, { path: '/categories', component: Categories }, { path: '/goods/Add', component: Goodsadd }, { path: '/reports', component: Reports }, { path: '/orders', component: Orders }, { path: '/params', component: Params }] }

  ]
})
// 添加一个全局前置守卫
router.beforeEach(function (to, from, next) {
  // to：要取的路由对应的对象
  // from：离开的路由对应的对象
  // next：后续代码
  // 登录验证：判断localstorage中是否存在token
  // 判断请求的是否是login
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    // 判断：是否存在token（有一种情况不需要判断，当请求login时）
    if (!token) {
      // 跳转到login路由
      // this.$router.push('/login')//这种写法是在vue组件中写的 这个this指的是vue实例 此处不能这样写
      router.push('/login')
      Message.error('请先登录')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
