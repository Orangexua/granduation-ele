<template>
  <el-menu
    style="width: 200px; height: 100%"
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <MenuItem v-for="item in list" :key="item.path" :routerInfo="item" />
  </el-menu>
</template>

<script>
import MenuItem from "../MenuItem";
import { RouterList } from "../../router/index";

export default {
  data() {
    return {
      list: RouterList
    };
  },
  components: {
    MenuItem
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style></style>
