<template>
  <div class="layout">
    <el-container style="height: 100%">
      <!-- 导航头区域 -->
      <el-header>
        <!-- <div class="div1" style="width: 200px;height: 100%;">
          <img src="../../assets/1.jpg" alt="handsome" style="width: 100%; height: 100%">
        </div>  -->
        <div>
            <img src="../../assets/logo.png" alt="" class="one">
            <span>电力计量计费管理系统</span>  
          </div>
        <!-- <h1 style="font-size:30px;color:#E5EAE9">电力计量计费管理系统</h1> -->
        <h4 style="cursor: pointer;margin-right:10px;color:#E5EAE9">{{nowDate}}  {{nowTime}}  {{nowWeek}}</h4>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside style="width:230px; height: 100%;">
          <div class="toggle-button">|||</div>
          <Menu />
        </el-aside>
        <el-main >
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
		nowTime: '',
    // 是否折叠
    isCollapse: false,
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
    // 点击按钮切换菜单折叠和展开
    toggleCollapse() {
      this.isCollapse =! this.isCollapse
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
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    height: 661px;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
.time {
  height: 20px;
}
.one {
    height: 40px;
    width: 40px;
  }
</style>
