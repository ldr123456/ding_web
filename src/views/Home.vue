<template>
  <div>
    <div>
      <div class="op">
        <router-view> </router-view>
      </div>
      <!-- 使用弹窗组件 -->
      <DialogView ref="myDialog" @userBehavior="changeData"></DialogView>
      <div class="r-main">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{ 'font-size': '18px' }"
          :cell-style="{ 'font-size': '16px' }"
        >
          <el-table-column prop="robot_name" label="机器人名称" width="280">
          </el-table-column>
          <el-table-column prop="CreatedAt" label="创建时间" width="280">
          </el-table-column>
          <el-table-column label="操作" min-width="700">
            <template v-slot="scope">
              <el-button
                @click="test(scope.row.robot_id)"
                type="primary"
                size="medium"
                >测试</el-button
              >
              <el-button
                @click="addper(scope.row.robot_id)"
                type="primary"
                size="medium"
                >成员列表</el-button
              >
              <el-button
                @click="check(scope.row.robot_name, scope.row.robot_id)"
                type="primary"
                size="medium"
                >查看已有任务</el-button
              >
              <el-button
                @click="
                  editorRob(
                    scope.row.robot_name,
                    scope.row.robot_id,
                    scope.row.secret,
                    scope.row.ID
                  )
                "
                type="primary"
                size="medium"
                >编辑机器人</el-button
              >
              <el-button @click="send(scope.row)" type="primary" size="medium"
                >新建定时任务</el-button
              >
              <el-button @click="remove(scope.row)" type="danger" size="medium"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div @click="addRob" class="add-robot">请点击添加机器人</div>
    <!-- 添加定时任务 -->
    <!-- <TimingTask :robot_id="robot_id" :sendVisabled="sendVisable"></TimingTask> -->
  </div>
</template>
<script>
import { getRobotList, testRobot, removeRobot } from "../api/index";
import DialogView from "../components/common/confirm.vue";
export default {
  name: "Home",
  // 引用vue reload方法
  inject: ["reload"],
  data() {
    return {
      name: "祥瑞",
      displayStsates: "false",
      token: localStorage.getItem("token"),
      content: "调用成功",
      sendVisable: false,
      RobVisable: false,
      robot_id: "",
      tableData: [],
    };
  },
  // 挂载弹窗组件
  components: {
    DialogView,
  },
  watch: {
    //监控路由变换
    $route(to, from) {
      this.getRobotMessage();
    },
  },
  // 对在组件中自定义的属性进行监听，从本地存储中获取用户名。如果能够获取到值，则使用该值作为用户名，否则使用 data 中的 name
  computed: {
    username() {
      let username = localStorage.getItem("username");
      return username ? username : this.name;
    },
  },
  mounted() {
    this.getRobotMessage();
  },
  //缓存页面，进入页面再获取一下数据
  activated() {
    this.getRobotMessage();
  },
  methods: {
    async getRobotMessage() {
      const res = await getRobotList();
      this.tableData = res.data.response.map((item) => {
        return {
          ...item,
          CreatedAt: this.dateFormat("YYYY-mm-dd HH:MM", item.CreatedAt),
        };
      });
    },
    // 添加机器人
    async addRob() {
      this.RobVisable = true;
      this.$router.push("/home/addRob");
    },
    // 删除机器人
    remove(i) {
      const id = i.robot_id;
      const name = i.robot_name;
      // 弹出提示框
      this.$refs.myDialog.show("确定删除机器人 " + name + " ?", {
        type: "confirm",
        confirmText: "确定",
        cancelText: "取消",
        titleText: "",
        data: { id: id, operate: "exchange" },
      });
    },
    changeData(type, data) {
      console.log("changeData", data);
      if (type === "clickConfirm") {
        if (data.operate === "exchange") {
          removeRobot({ robot_id: data.id }).then((res) => {
            // 刷新页面
            this.reload();
          });
        }
      }
    },
    // 添加成员
    addper(robot_id) {
      localStorage.setItem("robot_id", robot_id);
      this.$router.push("/addPer");
    },
    // 发送消息
    async send(robot) {
      this.sendVisable = true;
      this.robot_id = {
        robot_id: robot.robot_id,
      };
      this.$router.push({
        path: "/home/task",
        query: this.robot_id,
      });
    },
    //查看已有任务
    check(robot_name, robot_id) {
      localStorage.setItem("robot_name", robot_name);
      localStorage.setItem("robot_id", robot_id);
      this.$router.push("/check");
    },
    //编辑机器人功能
    editorRob(robot_name, robot_id, robot_secret, ID) {
      localStorage.setItem("robot_name", robot_name);
      localStorage.setItem("robot_id", robot_id);
      localStorage.setItem("robot_secret", robot_secret);
      localStorage.setItem("ID", ID);
      this.$router.push({ path: "/home/editor" });
    },
    loginout() {
      // 清除本地储存的数据
      localStorage.clear();
      this.$router.push("/login");
    },
    // 控制菜单显隐
    change() {
      this.displayStsates = !this.displayStsates;
    },
    //测试
    async test(robot_id) {
      console.log(robot_id);
      const data = {
        robot_id: robot_id,
      };
      const res = await testRobot(data);
      this.$message.success(res.data);
    },
    dateFormat(fmt, date) {
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
  },
};
</script>
<style scoped>

/* 头部栏 */
.r-welcome {
  width: 100%;
  height: 50px;
  margin: 0 auto;

  color: white;
  font-size: 18px;
  line-height: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

/* 欢迎语 */
.welcome {
  left: 50%;
  transform: translateX(-50%);
}

/* 页面名称 */
.r-welcome .title {
  margin-left: 30px;
}

/* 头像框 */
.r-welcome .userstatus {
  width: 100px;
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

li {
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

.action button:nth-child(3) {
  width: 76px;
}

.action button {
  width: 70px;
  padding: 1px;
  margin-right: 20px;
}

/* 添加机器人 */
.add-robot {
  width: 330px;
  height: 53px;
  background-color: rgb(248, 248, 206);
  line-height: 53px;
  position: absolute;
  font-size: 19px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
}
</style>
