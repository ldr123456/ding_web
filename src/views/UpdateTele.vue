<template>
  <div class="editPer">
    <el-dialog
      title="修改成员"
      :visible.sync="updateVisable"
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
          label="成员姓名"
          prop="new_person_name"
        >
          <el-input
            v-model="ruleForm.new_person_name"
            placeholder="请输入新的成员姓名（2~5位汉字）"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="new_number"
        >
          <el-input
            v-model="ruleForm.new_number"
            placeholder="请输入新的手机号（11位数字）"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closed">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateTele } from '../api/index'
export default {
  name: 'updateTele',
  inject: ["reload"],
  data () {
    return {
      updateVisable: true,
      ruleForm: {
        id: 0,
        new_number: "",
        new_person_name: "",
      },
      UpdateData: { robet_id: '1', },
      rules: {
        new_person_name: [
          { required: true, message: "格式有误，请输入2~5位汉字", min: 2, max: 5, pattern: '^[\u4e00-\u9fa5]{0,}$', trigger: "blur" },
        ],
        new_number: [
          { required: true, message: "格式有误，请输入11位数字", trigger: "blur" },
        ],
      },
    }
  },
  async mounted () {
    const params = {
      id: this.$route.query.id,
      name: this.$route.query.name,
      number: this.$route.query.number,
    };
    this.ruleForm.id = Number(params.id);
    this.ruleForm.new_person_name = params.name;
    this.ruleForm.new_number = params.number;
  },
  methods: {
    // 关闭弹窗
    closed () {
      this.$router.push("/addPer");
    },
    // 确认添加成员
    submit () {
      this.UpdateData.new_person_name = this.ruleForm.new_person_name;
      this.UpdateData.new_number = this.ruleForm.new_number;
      this.UpdateData.id = this.ruleForm.id;
      //字段验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await updateTele(this.UpdateData);
          if (res.code == '200') {
            this.$message.success("修改成员成功");
            this.$router.push("/addPer");
            this.reload();
          } else if (res.code == '417') {
            this.$message.error('该成员已存在')
            return false;
          } else {
            this.$message.error('未知错误')
            return false;
          }
        } else {
          this.$message.error("添加失败，请查看信息是否正确");
          return false;
        }
      });
    },
  },
}
</script>