<template>
  <div>
    <div class="check-top">
      <span> {{ this.tasks.robot_name }} </span>已有任务界面
      <button @click="cancel()">cancel</button>
    </div>
    <DialogView ref="myDialog" @userBehavior="changeData"></DialogView>
    <div class="robot-task">
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'font-size': '18px' }" :cell-style="{ 'font-size': '16px' }">
        <el-table-column prop="task_name" label="任务名称" width="270">
        </el-table-column>
        <el-table-column prop="detail_time_for_user" label="发送规则" width="300">
        </el-table-column>
        <el-table-column prop="person_names" label="所@成员" width="280">
        </el-table-column>
        <el-table-column prop="message" label="任务内容" width="290">
        </el-table-column>
        <el-table-column label="操作" min-width="240">
          <template v-slot="scope">
            <el-button @click="remove(scope.row)" type="danger" size="medium">删除该任务</el-button>
            <el-switch v-model="scope.row.DeletedAt" @change="changeSwitch(scope.row)" active-color="green" inactive-color="gray">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { checktask, removetask, stoptask, restarttask } from '@/api';
import DialogView from "../components/common/confirm.vue";
export default {
  inject: ['reload'],
  data () {
    return {
      tasks: {
        robot_id: localStorage.getItem('robot_id'),
        robot_name: localStorage.getItem('robot_name'),
      },
      task: {},
      tableData: [],
      item: {
        value: ''
      },
      value1: ''
    }
  },
  // 挂载弹窗组件
  components: {
    DialogView
  },
  mounted () {
    this.getMessage();
  },
  methods: {
    getMessage () {
      checktask(this.tasks).then(res => {
        this.tableData = res.data;
        this.tableData.forEach((item, index) => {
          if (item.DeletedAt != null) {
            item.DeletedAt = false;
          } else {
            item.DeletedAt = true;
          }
        })
      })
    },
    cancel () {
      this.$router.push('/home')
    },
    async remove (item) {
      const id = item.task_id;
      const name = item.task_name;
      // 弹出提示框
      this.$refs.myDialog.show("确定删除任务 " + name + " ?", {
        type: "confirm",
        confirmText: "确定",
        cancelText: "取消",
        titleText: "",
        data: { id: id, operate: "exchange" },
      });
    },
    changeData (type, data) {
      // console.log("changeData", data);
      if (type === "clickConfirm") {
        if (data.operate === "exchange") {
          removetask({ task_id: data.id }).then((res) => {
            this.getMessage();
          });
        }
      }
    },
    async changeSwitch (item) {
      if (!item.DeletedAt) {
        const res = await stoptask({
          task_id: item.task_id
        });
      } else {
        const res = await restarttask({
          ID: Number(item.ID)
        });
        this.$message.success(res.data.data)
      }
      this.getMessage();
    }
  }
}
</script>
<style scoped>
@import url('//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css');

.check-top {
  background-color: rgb(102,177,255);
  padding: 10px;
  color: white;
  font-size: 18px;
  position: relative;
}

.check-top button {
  position: absolute;
  padding: 3px;
  right: 70px;
}

#tasklist {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

#tasklist button {
  margin-right: 20px;
  padding: 3px;
}

>>>.el-switch__core,
.el-switch__input {
  width: 50px !important;
  margin-left: 20px;
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
</style>