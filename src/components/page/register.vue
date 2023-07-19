<template>
  <div class="login-wrap">
    <div class="dw-login">
      <div class="dw-title">钉钉机器人</div>
      <form :model="param" onsubmit="return false">
        <div class="dw-input">
          <input name="username" type="text" prop="username" required pattern="^[\u4e00-\u9fa5]{0,}$" v-model="param.username" autocomplete="off" placeholder="账号">
        </div>
        <div class="dw-input">
          <input name="password" type="password" prop="password" required v-model="param.password" autocomplete="off" placeholder="密码">
        </div>
        <div class="dw-input">
          <input name="password" type="password" prop="password" required v-model="param.re_password" autocomplete="off" placeholder="确认密码">
        </div>
        <div class="login-btn">
          <button type="primary" @click="getData"><span>注册</span></button>
        </div>
        <p class="login-tips" @click="goLogin">返回登录界面</p>
      </form>
    </div>
  </div>
</template>

<script>
// 通过axios进行与后台交互数据
import { setSignUp } from '../../api/index';
export default {
  name: 'register',
  data () {
    return {
      // 表单填入数据
      param: {
        username: '',
        password: '',
        re_password: '',
      },
      // 验证结束返回的数据返回的数据
      query: {
        id: "0",
        token: "",
        user_name: "",
      },
      code: 0,
      msg: '',
    }
  },
  methods: {
    // 获取数据
    getData () {
      // 通过 POST 请求数据，将返回的数据存储到对应的数组中
      setSignUp(this.param).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success('注册成功');
          this.$router.push('/login');
        } else if (res.code == 406) {
          this.$message.error('用户已存在');
        } else {
          this.$message.error('请正确填写信息');
        }
      });
    },
    // 表单验证
    submitForm () {
    },
    // 跳转回登录界面
    goLogin () {
      this.$router.push('/login');
    },
  },
}
</script>

<style scoped>
/* 导入登录注册页面的样式 */
@import '../../assets/css/login.css';
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
button:hover {
  background-color: #66b1ff;
}
button:active {
  background-color: blue;
}
/* 跳转登录页面 */
.login-tips {
  font-size: 16px;
  line-height: 30px;
  color: #000;
  cursor: pointer;
  text-align: left;
}
.login-tips:hover {
  color: #409eff;
}
</style>