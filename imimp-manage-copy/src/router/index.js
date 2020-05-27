import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)//Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/',
      name: 'Info',
      component: resolve => require(['../components/page/Info.vue'], resolve)
    },
    {
      path: '/homePage',
      name:'HomePage',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/table',
          component: resolve => require(['../components/common/BaseTable.vue'], resolve),
          meta: { title: '基础表格' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['../components/common/BaseCharts.vue'], resolve),
          meta: { title: 'schart图表' }
        }

      ]
    }
  ]
})
