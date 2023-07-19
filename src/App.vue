<template>
  <div id="app">
    <el-container v-if="!isLogin">
      <el-header>
        <div class="header">
          <div class="title">
            钉钉机器人管理<a
              href="https://blog.csdn.net/sunriseYJP/article/details/126764043"
              target="_blank"
              >查看说明</a
            >
          </div>
          <div class="welcome">你好&nbsp;!&nbsp;&nbsp;欢迎回来</div>
          <div class="userstatus" @click="change">
            <div class="header_img" @click="loginout">
              退出登录
              <img src="" alt="" />
            </div>
            <!-- <div class="menu" v-show="!displayStsates">
              <div>查看信息</div>
              <div @click="loginout">退出登录</div>
            </div> -->
          </div>
        </div>
      </el-header>
      <el-main>
        <keep-alive include="Home">
          <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
      </el-main>
    </el-container>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import vHome from "./views/Home";
import vAdmin from "./views/Administrator";

export default {
  name: "App",
  components: {
    // 挂载Home组件
    vHome,
    vAdmin,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      displayStsates: "false",
      isLogin: false,
    };
  },
  // 对在组件中自定义的属性进行监听，从本地存储中获取用户名。如果能够获取到值，则使用该值作为用户名，否则使用 data 中的 name
  computed: {
    username() {
      let username = localStorage.getItem("username");
      return username ? username : this.name;
    },
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.path);
      if (this.$route.path === "/login" || this.$route.path === "/register") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
  },
  cread() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
        console.log("刷新");
      });
    },
    // 退出登录
    loginout() {
      // 清除本地储存的数据
      localStorage.clear();
      this.$router.push("/login");
    },
    // 控制菜单显隐
    change() {
      this.displayStsates = !this.displayStsates;
    },
  },
};
</script>

<style>
@import "./assets/css/main.css";
.el-container {
  height: 100%;
}
.el-header {
  width: 100%;
  position: fixed;
  background-color: rgb(102, 177, 255);
  z-index: 100;
}
.header {
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  color: white;
  font-size: 20px;
}
.header_img {
  font-size: 17px;
  cursor: pointer;
}
.el-header div {
  line-height: 60px;
}
.userstatus {
  width: 100px;
  margin-right: 20px;
  background-color: rgb(77, 76, 76);
}
/* 菜单 */
.menu {
  position: absolute;
  width: 100px;
  background-color: rgba(255, 255, 255);
  color: #000;
  right: 36px;
  font-size: 16px;
  z-index: 1000;
  right: 90px;
}

.menu div {
  cursor: pointer;
  height: 50px;
}

.menu div:hover {
  background-color: #eee;
}
.el-main {
  width: 95%;
  height: calc(100%-60px);
  margin: 20px auto;
  margin-top: 80px;
  padding: 20px;
  background-color: rgba(255, 255, 255);
  box-shadow: 0 0 5px #cccccc;
  border-radius: 10px;
}
a {
  margin-left: 40px;
}
</style>
