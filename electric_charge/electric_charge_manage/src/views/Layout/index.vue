<template>
  <div class="layout">
    <el-container style="width: 100%; height: 100%">
      <el-header style="display: flex; justify-content: space-between">
        <div class="div1" style="width: 200px;height: 100%;">
          <img src="../../assets/1.jpg" alt="handsome" style="width: 100%; height: 100%">
        </div> 
        <h1 style="font-size:30px;color:#E5EAE9">电费管理系统</h1>
        <h4 @click="logout" style="cursor: pointer;margin-right:10px;color:#E5EAE9">{{nowDate}}  {{nowTime}}  {{nowWeek}}|退出登录</h4>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import { getUserDetail } from "../../api/user";
import { getStore, removeStore, setStore } from "../../utils/storage";
export default {
  components: {
    Menu
  },
  data(){
   return {    
		timer: null,    
		nowWeek: '',    
		nowDate: '',    
		nowTime: ''  
	  }
  },
  mounted() {
    this.getUser();
    this.timer = setInterval(() => {    
	 this.setNowTimes()  
},10)
  },
  methods: {
    getUser() {
      getUserDetail().then((res) => {
        if (getStore("userInfo")) return;
        setStore("userInfo", JSON.stringify(res.data));
        this.$store.dispatch("getUserInfo", res.data);
        window.location.reload();
      });
    },
    logout() {
      removeStore("token");
      removeStore("userInfo");
      this.$router.push("/login");
    },
    setNowTimes () {  
		//获取当前时间
		let myDate = new Date()  
		let wk = myDate.getDay()  
		let yy = String(myDate.getFullYear())  
		let mm = myDate.getMonth() + 1  
		let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())  
		let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())  
		let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())  
		let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())  
		let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		let week = weeks[wk]  
		this.nowDate = yy + '-' + mm + '-' + dd  
		this.nowTime = hou + ':' + min + ':' + sec  
		this.nowWeek = week
	},
}
}
</script>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
}

.el-header {
  background-color: #1C2E3A;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0;
}
.time {
  height: 20px;
}
</style>
