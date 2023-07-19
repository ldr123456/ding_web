import axios from 'axios';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  timeout: 5000 // 请求超时时间
});
// request 请求拦截器
service.interceptors.request.use(

  config => {
    // let token= localStorage.getItem("token")
    // token && (config.headers.Authorization = 'Bearer ' + JSON.parse(token));
    // if (getToken()) {
    //   config.headers['x-token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    config.headers['Content-Type'] = 'application/json'
    // config.headers['Content-Type'] = 'x-token/json';

    config.headers = config.headers || {}
    // 验证token,把token赋给headers
    if (localStorage.getItem('token')) {
      // console.log(localStorage.getItem('token'));
      // config.headers['Bearer-token'] = localStorage.getItem('token') || "";
      //此处的Bearer的后面需要一个空格，后端需要按照这种格式去解析token 
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') || ""
    }
    // config.headers['app'] = false;
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 返回拦截器
service.interceptors.response.use(
  response => {
    // console.log(response);
    const code = response.status;
    if (code < 200 || code > 300) {
      // Notification.error({
      //   title: response.msg
      // });
      return Promise.reject('error');
    } else {

      // 如果为undefined 说明为下载接口，无code // 本项目中该处拦截可能存在问题，TODO
      if (!response.data.code) {
        return response.data;
      }
      if (response.data.code === 'undefined') {
        return response.data;
      } else if (response.data.code !== 0) {
        return response.data;
        // Notification.error({
        //   title: response.data.msg
        // });
        // return Promise.reject('error');

      }
      return response.data;
    }
  },
  error => {
    let code = 0;
    try {
      code = error.response.data.status;
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 5000
        });
        return Promise.reject(error);
      }
    }
    if (code) {
      if (code === 401) {
        // store.dispatch('LogOut').then(() => {
        //   // 用户登录界面提示
        //   Cookies.set('point', 401);
        //   location.reload();
        // });
      } else if (code === 403) {
        // router.push({ path: '/401' });
      } else {
        const errorMsg = error.response.data.message;
        if (errorMsg !== 'undefined') {
          Notification.error({
            title: errorMsg,
            duration: 5000
          });
        }
      }
    } else {
      // Notification.error({
      //   title: '服务器异常,请重试!',
      //   duration: 5000
      // });
    }
    return Promise.reject(error);
  }
);

export default service;
