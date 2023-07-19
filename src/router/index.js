import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //这个表示的是根目录，即一进入的页面
      path: '/',
      //设置重定向，将 home 组件设为默认路由组件
      redirect: '/home',
    },
    {
      // 设置对应组件将需要的组件通过箭头函数直接挂载
      path: '/home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: '主页面'
      },
      children: [
        {
          path: 'task',
          component: () => import('../views/TimingTask.vue'),
          meta: { title: '新建定时任务' },
        },
        {
          path: 'editor',
          component: () => import('../views/EditorRob.vue'),
          meta: { title: '编辑机器人' },
        },
        {
          path: 'addRob',
          component: () => import('../views/AddRob.vue'),
          meta: { title: '添加机器人' },
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/Administrator.vue'),
      meta: { title: '管理员页面' },
    },
    {
      path: '/addPer',
      component: () => import('../views/AddPer.vue'),
      meta: { title: '成员列表' },
      children: [
        {
          path: 'addTele',
          component: () => import('../views/AddTele.vue'),
          meta: { title: '添加成员' },
        },
        {
          path: 'updateTele',
          component: () => import('../views/UpdateTele.vue'),
          meta: { title: '编辑成员' },
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/register',
      component: () => import('../components/page/register.vue'),
      meta: { title: '注册' },
    },
    {
      path: '/check',
      component: () => import('../views/Check.vue'),
      meta: { title: '查看已有任务' },
    },
  ]
})


// 解决路由跳转错误
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

