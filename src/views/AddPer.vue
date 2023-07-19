<template>
  <div>
    <!-- 次级路由 -->
    <div class="addPer">
      <router-view></router-view>
    </div>
    <!-- 成员列表 -->
    <div class="Persons">
      <!-- 返回 -->
      <el-page-header @back="goBack" content="成员列表">
      </el-page-header>
      <el-button type="primary" size="medium" @click="addTele" style="margin:20px">添加新成员</el-button>
      <el-table :data="tableData" border style="width:100%">
        <el-table-column prop="person_name" label="姓名" width="280"></el-table-column>
        <el-table-column prop="number" label="手机号" width="280"></el-table-column>
        <el-table-column label="操作" min-width="500">
          <template slot-scope="scope">
            <el-button @click="removeVisable = true;removeId(scope.row.ID)" type="danger" size="medium">删除</el-button>
            <el-button @click="editTele(scope.row.ID,scope.row.number,scope.row.person_name)" type="primary"
              size="medium">编辑</el-button>
            <!-- 删除弹框 -->
            <el-dialog title="删除" :visible.sync="removeVisable" width="20%" :key="scope.row.ID">
              <span>是否确认删除该成员</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="removeVisable = false">取 消</el-button>
                <el-button type="primary" @click="removeVisable = false;removePer()">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
var arr = JSON.parse(localStorage.getItem("person_name") || "[]")
import { getTele, removeTele } from '@/api';

export default {
  name: "addPer",
  inject: ["reload"],
  data() {
    return {
      query: 0,
      remove_id: 0,
      teleVisable: false,
      updateVisable: false,
      removeVisable: false,
      robot_id: localStorage.getItem('robot_id'),
      tableData: [],
    }
  },

  mounted() {
    this.getTeleMessage();
  },
  //缓存页面，进入页面再获取一下数据
  activated() {
    this.getTeleMessage();
  },
  created() { // 创建vm实例后执行
    // 浏览器控制按钮前进后退触发函数
    window.addEventListener('popstate', this.goBack, false);
  },
  destroyed() { // 销毁vm组件
    // 避免堆栈溢出，多次创建、多次触发
    window.removeEventListener('popstate', this.goBack, false);
  },
  methods: {
    // 返回首页
    goBack() {
      this.$router.push('/home');
    },
    // 获取成员信息
    async getTeleMessage() {
      const res = await getTele(this.robot_id);
      this.tableData = res.data.numbers.map((item) => {
        return {
          ...item,
        };
      });
    },
    // 添加新成员
    async addTele() {
      this.teleVisable = true;
      this.$router.push({
        path: "/addPer/addTele",
      });
    },
    // 删除成员
    removeId(ID) {
      this.remove_id = ID;
    },
    removePer() {
      this.remove();
    },
    async remove() {
      const id = this.remove_id;
      const res = await removeTele({ id: id });
      if (res.code == 200) {
        this.$message.success("删除成功");
        this.reload();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 编辑该成员
    editTele(ID, number, name) {
      this.updateVisable = true;
      this.query = {
        id: ID,
        number: number,
        name: name,
      };
      this.$router.push({
        path: "/addPer/updateTele",
        query: this.query,
      })
    },
  },
}
</script>

<style scoped>

</style>