<template>
  <div class="layout">
    <el-container style="width: 100%; height: 100%">
      <el-header style="display: flex; justify-content: space-between">
        <h3>电费管理系统</h3>
        <h5 @click="logout" style="cursor: pointer">退出登录</h5>
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
  mounted() {
    this.getUser();
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
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
}

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
