import Vue from 'vue'
import { Switch,Dialog } from 'element-ui';
import App from './App.vue'
import service from './utils/service'
import router from './router';

Vue.use(Switch).use(Dialog);
Vue.prototype.service = service
Vue.config.productionTip = false;
// 引入 Element UI
import ElementUI from 'element-ui';
// 单独引入样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 设置路由守卫：通过跳转或取消的方式守卫导航
//这个守卫方法会接受三个参数：
// to：Route ：即将要去往的路由对象，通过这个参数来设置路由的去处。
// from：Route ：当前导航正要离开的路由，通过这个参数来设置路由的出发处。
// next：Function ：这个方法是必须要进行调用的，通过这个参数来resolve这个钩子函数
// next()：进行下一个钩子，也就是下一个应该去跳转的路由
// next(false)：中断当前导航。
// next('/')：跳转到一个不同的地址，当前导航中断，进行新的导航
// next(error)：终止该导航，并将错误传递给router.onError()注册的回调。

router.beforeEach((to, from, next) => {
  // 对页面的标题进行设置，获取路由元信息中的title
  document.title = `${to.meta.title} | DingDing`;
  // 获取本地存储的用户名
  const token = localStorage.getItem('token');
  // 判断是否存在 token 以及下一个钩子是否跳转到'/login'
  if (!token && to.path !== '/login' && to.path !== '/register' && to.path !== '/admin') {
    // 跳转到'/login'
    next('/login');
  } else {
    next();
  }
});

// 实例化 Vue
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

