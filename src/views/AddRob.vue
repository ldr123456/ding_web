<template>
  <div class="add-box">
    <el-dialog
      title="添加机器人"
      :visible.sync="RobVisable"
      width="500px"
      @close="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称"
          prop="rob_name"
        >
          <el-input
            v-model="ruleForm.robot_name"
            placeholder="请输入机器人的名称（推荐使用群聊作为机器人名）"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="机器人ID"
          prop="rob_id"
        >
          <el-input
            v-model="ruleForm.robot_id"
            placeholder="请输入机器人的ID……"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="rob_secret"
        >
          <el-input
            v-model.number="ruleForm.robot_secret"
            placeholder="请输入机器人的密码……"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="add"
          >确认</el-button>
          <el-button @click="closed">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addRobot } from "@/api";
export default {
  data () {
    return {
      RobVisable: true,
      robotdata: {
        robot_name: "",
        robot_id: "",
        robot_secret: "",
      },
      ruleForm: {
        robot_name: "",
        robot_id: "",
        robot_secret: "",
      },
      rules: {
        robot_name: [
          { required: true, message: "请输入机器人名称", trigger: "blur" },
        ],
        robot_id: [
          { required: true, message: "请输入机器人ID", trigger: "blur" },
        ],
        robot_secret: [
          { required: true, message: "请输入机器人密码", trigger: "blur" },
        ],
      },
      // 接收数据
      rdata: {},
      code: '',
    };
  },
  methods: {
    // 添加机器人
    add () {
      addRobot(this.ruleForm).then((res) => {
        console.log(this.ruleForm);
        this.code = res.code;
        this.rdata = res.data;
        console.log(res);
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.code == 200){
              this.$message.success('添加成功')
              this.$router.push("/");
            }else{
              this.$message.error('数据不合法，请检查ID和密码');
            }
          } else {
            this.$message.error("请填写完整信息");
          }
        });
      });
    },
    // 取消
    closed () {
      this.$router.push('/')
    },
  },
};
</script>
<style scoped>

</style>

