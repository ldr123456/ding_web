<template>
  <div class="tele">
    <el-dialog title="添加成员" :visible.sync="teleVisable" width="500px" @close="closed">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="成员姓名" prop="person_name">
          <el-input v-model="ruleForm.person_name" placeholder="请输入成员姓名（2~5位汉字）"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="number">
          <el-input v-model="ruleForm.number" placeholder="请输入手机号（11位数字）"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closed">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addTele } from "../api/index";
export default {
  name: "addTele",
  inject: ["reload"],
  data() {
    return {
      teleVisable: true,
      ruleForm: {
        robot_id: localStorage.getItem('robot_id'),
        number: "",
        person_name: "",
      },
      TeleData: {},
      rules: {
        person_name: [
          { required: true, message: "姓名格式有误或已存在", min: 2, max: 5, pattern: '^[\u4e00-\u9fa5]{0,}$', trigger: "blur" },
        ],
        number: [
          { required: true, message: "手机号格式有误或已存在", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 关闭弹窗
    closed() {
      this.$router.push("/addPer");
    },
    // 确认添加成员
    submit() {
      this.TeleData.person_name = this.ruleForm.person_name;
      this.TeleData.number = this.ruleForm.number;
      this.TeleData.robot_id = this.ruleForm.robot_id;
      //字段验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await addTele(this.TeleData);
          if (res.code == '200') {
            this.$message.success("添加成员成功");
            this.$router.push("/addPer");
            this.reload();
          } else if (res.code == '417') {
            this.$message.error('该成员已存在')
            return false;
          } else if (res.code == '416') {
            this.$message.error('电话号码或者人名已经存在')
            return false;
          }
        } else {
          this.$message.error("添加失败，请查看信息是否正确");
          return false;
        }
      });
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
