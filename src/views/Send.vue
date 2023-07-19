<template>
  <div class="add-box">
    
    <form>
      <label>
        <p>机器人姓名：</p><input placeholder="请尽量将名字命名为要发送的群聊名" prop="robot_name" v-model="robotmessage.robot_name">
      </label>
      <label>
        <p>所要发送内容：</p><input placeholder="请输入要发送的内容" prop="message" v-model="robotmessage.message">
      </label>
      <label>
        <p>需要@的成员：</p>
        <select placeholder="请输入要发送的内容" prop="person_names" v-model="robotmessage.person_name">
          <option v-for="(item,i) in this.person_names" :key="i" :value="item">{{ item }}</option>
        </select>
      </label>
      <label>
        <p>发送消息规则：</p><input prop="detail_time" v-model="robotmessage.detail_time">
      </label>
      <label>
        <p>任务名：</p><input prop="task_name" v-model="robotmessage.task_name" placeholder="起一个形象的名字(#^.^#)">
      </label>
      <p><button @click="send()">确认发送</button><button @click="cancel()">取消发送</button></p>
    </form>
  </div>
</template>
<script>
import { getTele, sendmessage } from '@/api';
export default {
  created() {
    this.getPer();
  },
  data () {
    return {
      // 发送的机器人信息
      robotmessage: {
        robot_name: localStorage.getItem('robot_name'),
        robot_id: localStorage.getItem('robot_id'),
        message: "",
        person_name: '',
        detail_time: "",
        task_name: "",
        token: localStorage.getItem('token'),
      },
      // 成员备选项
      person_names: ["无", "全体成员"],
      // 接收数据
      messagee: {
        message: ""
      },
      msg: '',
      aletMsg: '',
      displayStsates: 'none',
    }
  },
  methods: {
    send () {
      console.log(this.robotmessage);
      // sendmessage(this.robotmessage).then(res => {
      //   console.log(res);
      //   this.code = res.code
      //   this.msg = res.msg
      //   this.messagee = res.data
      //   this.submit()
      // })
    },
    cancel () {
      localStorage.removeItem('robot_name')
      localStorage.removeItem('robot_id')
      this.$router.push('/home')
    },
    getPer(){
      getTele(this.robotmessage.robot_id).then(res => {
        console.log(res);
      })
    },
  }
}
</script>
<style scoped>
/* 导入表单统一样式 */
@import '../assets/css/input.css';
</style>