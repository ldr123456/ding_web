<template>
  <div style="width: 100%;height: 100%;overflow-y: scroll;">
    <div>
      <div class="r-welcome">
        <div class="title">钉钉机器人管理</div>
        <div class="welcome">管理员大人&nbsp;!&nbsp;&nbsp;欢迎回来&nbsp;&nbsp;(*^▽^*)</div>
        <div class="userstatus" @click="change">
          <div class="header_img">头像
            <img src="" alt="">
          </div>
          <div class="menu" v-show='!displayStsates'>
            <div>查看信息</div>
            <div @click="loginout">退出登录</div>
          </div>
        </div>
      </div>
      <div class="r-main">
        <table id="robotlist">
          <div>
            <tr>
              <th>用户名</th>
              <th>机器人</th>
              <th>XXX</th>
            </tr>
            <tr v-for="(item,i) in this.list" :key="i">
              <td>{{item.Username}}</td>
              <td>{{item.Token}}</td>
              <td>XXX</td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { getUsers } from '../api/index';
export default {
  data () {
    return {
      displayStsates: 'false',
      list: [],
    }
  },
  created () {
    this.getUser();
  },
  methods: {
    // 退出登录
    loginout () {
      // 清除本地储存的数据
      localStorage.clear();
      this.$router.push('/login')
    },
    // 控制菜单显隐
    change () {
      this.displayStsates = !this.displayStsates;
    },
    getUser () {
      getUsers().then(res => {
        this.list = res.data.response;
        console.log(this.list);
      })
    },
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* 头部栏 */
.r-welcome {
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background-color: rgb(252, 83, 83);
  color: white;
  font-size: 18px;
  line-height: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

/* 欢迎语 */
.welcome {
  transform: translateX(-10%);
}

/* 页面名称 */
.r-welcome .title {
  margin-left: 30px;
}

/* 头像框 */
.r-welcome .userstatus {
  width: 100px;
  background-color: #000;
}

/* 菜单 */
.menu {
  position: absolute;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
}

.menu div {
  cursor: pointer;
  height: 50px;
}

.menu div:hover {
  background-color: #eee;
}

/* 所有机器人 */
#robotlist {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

th {
  height: 30px;
  background-color: rgb(239, 209, 171);
  width: 1519px;
  line-height: 30px;
}

td {
  list-style: none;
  height: 40px;
  line-height: 40px;
  background-color: rgba(252, 67, 67, 0.7);
  border-bottom: 1px solid white;
  color: white;
}

/* 操作按钮 */
.action button:nth-child(1) {
  width: 90px;
}

.action button {
  width: 70px;
  padding: 1px;
  margin-right: 20px;
}
</style>
