<template>
  <div class="login-wrap">
    <div class="dw-login">
      <div class="dw-title">钉钉机器人</div>
      <!-- onsubmit 关闭表单的自动提交 -->
      <form :model="param" onsubmit="return false">
        <div class="dw-input">
          <input name="username" type="text" prop="username" required pattern="^[\u4e00-\u9fa5]{0,}$" v-model="param.username" autocomplete="off" placeholder="账号" />
        </div>
        <div class="dw-input">
          <input name="password" type="password" prop="password" required pattern="^\d{6,12}$" v-model="param.password" autocomplete="off" placeholder="密码" />
        </div>
        <div class="login-btn">
          <button type="primary" @click="getData"><span>登录</span></button>
        </div>
        <p class="login-tips" @click="goReg">没有账号？点击注册</p>
      </form>
    </div>
  </div>
</template>

<script>
// 通过axios进行与后台交互数据
import { fetchData } from "../../api/index";
export default {
  name: "login",
  data () {
    return {
      // 表单填入数据
      param: {
        username: "",
        password: "",
      },
      // 验证结束返回的数据返回的数据
      query: {
        id: "0",
        token: "",
        user_name: "",
      },
      code: 0,
      msg: "",
    };
  },
  methods: {
    // 获取数据
    getData () {
      // 通过 POST 请求数据，将返回的数据存储到对应的数组中
      fetchData(this.param).then((res) => {
        // 拿到数据中的 code 和 msg
        this.code = res.code;
        this.msg = res.msg;
        this.query = res.data;
        this.submitForm();
      });
    },
    // 表单验证
    submitForm () {
      if (this.code == 200) {
        this.$message.success("登录成功");
        localStorage.setItem("username", this.param.username);
        localStorage.setItem("token", this.query.token);
        this.$router.push("/");
      } else {
        this.$message.error("账号或密码错误");
      }
    },
    // 跳转注册页面
    goReg () {
      this.$router.push("/register");
    },
  },
};
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
/* 跳转注册页面 */
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
  cursor: pointer;
}
.login-tips:hover {
  color: #409eff;
}
</style>
