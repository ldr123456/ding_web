<template>
  <div>
    <el-dialog
      title="编辑机器人"
      :visible.sync="sendVisable"
      width="500px"
      @close="closed"
    >
      <el-form
        :model="updateData"
        ref="updateData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="机器人姓名"
          prop="robot_name"
        >
          <el-input
            v-model="updateData.robot_name"
            placeholder="请输入机器人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="机器人密码"
          prop="robot_secret"
        >
          <el-input
            v-model="updateData.robot_secret"
            placeholder="请填写机器人密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <DialogView
        ref="myDialog"
        @userBehavior="changeData"
      ></DialogView>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closed()">取 消</el-button>
        <el-button
          @click="remove(updateData.robot_id,updateData.robot_name)"
          type="primary"
          size="medium"
        >删除
        </el-button>
        <el-button
          type="primary"
          @click="submit"
        >确认修改</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { removeRobot, editorRob } from "../api/index";
import DialogView from "../components/common/confirm.vue";
export default {
  name: "Task",
  data () {
    return {
      sendVisable: true,
      updateData: {
        id: parseInt(localStorage.getItem('ID')),
        robot_name: localStorage.getItem('robot_name'),
        robot_secret: localStorage.getItem('robot_secret'),
        robot_id: localStorage.getItem('robot_id')
      },
      names: {},
    };
  },
  components: {
    DialogView
  },
  methods: {
    closed () {
      this.$router.push("/home");
    },
    submit () {
      editorRob(this.updateData).then((res) => {
        localStorage.setItem('robot_name', res.data.new_robot_name)
        localStorage.setItem('robot_secret', res.data.new_robot_secret)
        this.updateData.robot_name = res.data.new_robot_name;
        this.updateData.robot_secret = res.data.new_robot_secret;
      })
      this.closed()
    },
    // 删除机器人
    async remove (robot_id, robot_name) {
      const id = robot_id;
      const name = robot_name;
      // 弹出提示框
      this.$refs.myDialog.show("确定删除机器人 " + name + " ?", {
        type: "confirm",
        confirmText: "确定",
        cancelText: "取消",
        titleText: "",
        data: { id: id, operate: "exchange" },
      });
    },
    changeData (type, data) {
      console.log("changeData", data);
      if (type === "clickConfirm") {
        if (data.operate === "exchange") {
          removeRobot({ robot_id: data.id }).then((res) => {
            this.closed();
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.el-form-item {
  text-align: left !important;
}

textarea {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif !important;
}

.el-select-dropdown__item {
  text-align: left !important;
}

.disablefirstlevel .hn-cascader-menu:first-of-type .hn-checkbox {
  display: none;
}

.addTime {
  display: inline-block;
  height: 40px;
  line-height: 40px;
}

.el-date-editor {
  display: inline-block;
}

.el-icon-circle-plus-outline {
  font-size: 25px;
  padding-left: 10px;
  color: rgb(196, 199, 207);
}

.el-date-editor {
  margin-bottom: 10px;
}

.el-icon-circle-close {
  display: inline-block;
  font-size: 20px;
  padding-left: 10px;
  color: rgb(196, 199, 207);
}
</style> 


