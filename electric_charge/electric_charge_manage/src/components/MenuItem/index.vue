<template>
  <el-menu-item
    v-if="!(routerInfo.children && routerInfo.children.length > 0)"
    :index="routerInfo.path"
  >
    <span slot="title">{{ routerInfo.meta.title }}</span>
  </el-menu-item>
  <el-submenu v-else :index="routerInfo.path">
    <template slot="title">
      <span>{{ routerInfo.meta.title }}</span>
    </template>
    <menu-item
      v-for="item in routerInfo.children"
      :key="item.path"
      :routerInfo="item"
    />
  </el-submenu>
</template>

<script>
export default {
  props: {
    routerInfo: Object
  },
  name: "MenuItem",
  mounted() {}
};
</script>

<style></style>
