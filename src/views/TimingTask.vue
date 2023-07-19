<template>
  <div class="task">
    <el-dialog
      title="定时任务"
      :visible.sync="sendVisable"
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
        <el-form-item label="机器人姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入机器人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="@成员" prop="person_names">
          <el-select
            v-model="ruleForm.person_names"
            placeholder="请选择@成员"
            multiple
            filterable
            @change="valueChange"
          >
            <el-option value="无"></el-option>
            <el-option value="所有人" v-if="isShowAll"></el-option>
            <template v-if="isShowAll">
              <el-option
                v-for="item in names"
                :value="item.person_name"
                :key="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="重复" prop="repeate_time">
          <el-col :span="11">
            <el-select
              v-model="ruleForm.repeate_time"
              placeholder="请选择"
              @change="changeWay"
            >
              <el-option value="仅发送一次"></el-option>
              <el-option value="立即发送"></el-option>
              <el-option value="周重复"></el-option>
              <el-option value="月重复"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-cascader
              v-model="ruleForm.detail_time"
              :options="repeatWay === 'week' ? options : options2"
              :props="props"
              :disabled="repeatWay === 'one' || repeatWay === 'now'"
              clearable
              placeholder="请选择重复日期"
            >
            </el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="发送时间" prop="value1" v-if="repeatWay !== 'now'">
          <div v-if="repeatWay !== 'now'">
            <el-date-picker
              v-model="ruleForm.value1"
              type="datetime"
              placeholder="选择日期时间"
              v-if="repeatWay === 'one'"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <el-time-picker
              v-model="ruleForm.value1"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59',
              }"
              placeholder="任意时间点"
              value-format="HH:mm:ss"
              v-else
            >
            </el-time-picker>
          </div>
        </el-form-item>
        <el-form-item
          label="任务名"
          prop="task_name"
          v-if="repeatWay !== 'now'"
        >
          <el-input
            v-model="ruleForm.task_name"
            placeholder="请填写任务名"
          ></el-input>
        </el-form-item>
        <el-form-item label="发送内容" prop="message">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.message"
          >
          </el-input>
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
import { getAddPerson, addTask } from "../api/index";
export default {
  name: "Task",
  data() {
    return {
      sendVisable: true,
      ruleForm: {
        name: "",
        person_names: "",
        repeate_time: "仅发送一次",
        detail_time: "",
        task_name: "",
        message: "",
        value1: "",
      },
      isShowAll: true,
      sendData: {},
      rules: {
        name: [
          { required: true, message: "请输入机器人姓名", trigger: "blur" },
        ],
        repeate_time: [
          { required: true, message: "请选择发送规则", trigger: "blur" },
        ],
        person_names: [
          { required: true, message: "请选择要@的人", trigger: "blur" },
        ],
        value1: [
          { required: true, message: "请选择发送时间", trigger: "blur" },
        ],
        task_name: [
          { required: true, message: "请输入任务名", trigger: "blur" },
        ],
        message: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      names: {},
      text: "",
      repeatWay: "one",
      props: { multiple: true },
      options: [
        { value: "1", label: "周一" },
        { value: "2", label: "周二" },
        { value: "3", label: "周三" },
        { value: "4", label: "周四" },
        { value: "5", label: "周五" },
        { value: "6", label: "周六" },
        { value: "0", label: "周日" },
      ],
      options2: [],
      sendTime: [],
      value1: "",
      robot_id: "",
    };
  },
  async mounted() {
    for (let i = 0; i < 31; i++) {
      this.options2[i] = { value: i + 4, label: i + 1 + "号" };
    }
    const params = {
      robot_id: this.$route.query.robot_id,
    };
    this.robot_id = params.robot_id;
    if (params.robot_id) {
      const res = await getAddPerson(params);
      this.ruleForm.name = res.data.robotname;
      this.names = res.data.numbers;
    }
  },
  methods: {
    changeWay(value) {
      if (value === "仅发送一次") {
        this.repeatWay = "one";
      } else if (value === "周重复") {
        this.repeatWay = "week";
      } else if (value === "立即发送") {
        this.repeatWay = "now";
      } else {
        this.repeatWay = "month";
      }
    },
    closed() {
      this.$router.push("/home");
    },
    submit() {
      this.sendData.robot_id = this.robot_id;
      this.sendData.person_names = this.ruleForm.person_names;
      this.sendData.task_name = this.ruleForm.task_name;
      this.sendData.message = this.ruleForm.message;
      //定时规则
      this.sendData.repeate_time = this.ruleForm.repeate_time;
      if (this.ruleForm.detail_time) {
        this.ruleForm.detail_time.forEach((element) => {
          this.sendData.repeate_time += "/" + element;
        });
      }
      //发送时间
      this.sendData.detail_time = this.ruleForm.value1;
      //字段验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (
            !this.ruleForm.detail_time &&
            this.repeatWay !== "one" &&
            this.repeatWay !== "now"
          ) {
            this.$message.error("设置失败，请设置重复日期");
          } else {
            this.$message.success("设置定时任务成功");
            const res = await addTask(this.sendData);
            this.$router.push("/home");
          }
        } else {
          this.$message.error("设置失败，请查看信息是否完整");
          return false;
        }
      });
    },
    valueChange() {
      if (this.ruleForm.person_names.includes("无")) {
        this.isShowAll = false;
        this.ruleForm.person_names = this.ruleForm.person_names.filter(
          (item) => {
            return item === "无";
          }
        );
      } else {
        this.isShowAll = true;
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
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
