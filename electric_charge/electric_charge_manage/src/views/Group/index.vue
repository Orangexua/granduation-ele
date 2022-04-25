<template>
  <div class="group">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增设备</el-breadcrumb-item>   
    </el-breadcrumb>
    <el-card>
          <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="设备名称">
        <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="openModal"> 新增设备 </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="username" label="所属用户"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="剩余电量">
        <template slot-scope="scope">
          {{ scope.row.electric_total - scope.row.electric_use }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right:2px"
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; flex-direction: row-reverse">
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="10"
        :total="total"
      >
      </el-pagination>
    </div>
    </el-card>
    <el-dialog
      :title="dialogType === 'add' ? '新增设备' : '修改设备'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="groupForm" :rules="groupFormRules" ref="groupForm">
        <el-form-item
          style="width: 400px"
          label="设备名称"
          prop="name"
          :label-width="'120px'"
        >
          <el-input v-model="groupForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          style="width: 400px"
          label="设备电量"
          prop="electric_total"
          :label-width="'120px'"
        >
          <el-input
            v-model.number="groupForm.electric_total"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          style="width: 400px"
          label="归属用户"
          prop="uid"
          :label-width="'120px'"
        >
          <el-select v-model="groupForm.uid" placeholder="请选择用户">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :value="item.id"
              :label="item.username"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEquipment,
  addEquipment,
  editEquipment,
  delEquipment
} from "@/api/equipment";
import { getUserList } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
      form: {
        name: "",
        phone: ""
      },
      groupForm: {
        name: "",
        electric_total: 0,
        uid: undefined
      },
      groupFormRules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        electric_total: [
          { required: true, message: "请输入设备电量", trigger: "blur" }
        ],
        uid: [{ required: true, message: "请选择用户", trigger: "blur" }]
      },
      dialogFormVisible: false,
      total: 0,
      page: 1,
      pageSize: 10,
      userList: [],
      dialogType: "add"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getEquipment({
        page: this.page,
        pageSize: this.pageSize,
        ...this.form
      }).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
    getUser() {
      getUserList().then((res) => {
        this.userList = res.data.list;
      });
    },
    handleClick(row) {
      this.dialogType = "edit";
      this.groupForm = {
        id: row.id,
        name: row.name,
        electric_total: row.electric_total,
        uid: row.uid
      };
      this.getUser();
      this.dialogFormVisible = true;
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delEquipment(id)
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      });
    },
    handleSubmit() {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === "add") {
            addEquipment(this.groupForm)
              .then(() => {
                this.$message.success("添加设备成功");
                this.getList();
                this.dialogFormVisible = false;
              })
              .catch((err) => {
                console.log(err);
                this.$message.error(err);
              });
          } else {
            editEquipment(this.groupForm, this.groupForm.id)
              .then(() => {
                this.$message.success("修改设备成功");
                this.getList();
                this.dialogFormVisible = false;
              })
              .catch((err) => {
                console.log(err);
                this.$message.error(err);
              });
          }
        }
      });
    },
    openModal() {
      this.dialogFormVisible = true;
      this.dialogType = "add";
      this.getUser();
    }
  }
};
</script>

<style></style>
