<template>
  <div class="houseManage">
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/pay' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>房源管理</el-breadcrumb-item>
        <el-breadcrumb-item>房源列表</el-breadcrumb-item>   
    </el-breadcrumb>
    <el-card> 
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="小区名称：">
        <el-input v-model="form.name" placeholder="请输入小区名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="openModal" style="margin-bottom:20px">新增房源</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="小区名称"> </el-table-column>
      <el-table-column prop="unit" label="小区单元数"> </el-table-column>
      <el-table-column prop="floor" label="小区楼层数"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right: 10px"
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
        layout="total, prev, pager, next"
        @current-change="pageChange"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
    </div>
    </el-card>
    <el-dialog
      :title="dialogType === 'add' ? '新增房源' : '修改房源'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="groupForm" :rules="groupFormRules" ref="groupForm">
        <el-form-item
          style="width: 400px"
          label="小区名称"
          prop="name"
          :label-width="'120px'"
        >
          <el-input v-model="groupForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          style="width: 400px"
          label="小区单元数"
          prop="unit"
          :label-width="'120px'"
        >
          <el-input v-model.number="groupForm.unit" autocomplete="off" />
        </el-form-item>
        <el-form-item
          style="width: 400px"
          label="小区楼层数"
          prop="floor"
          :label-width="'120px'"
        >
          <el-input v-model.number="groupForm.floor" autocomplete="off" />
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
import { getHouse, addHouse, editHouse, delHouse } from "../../api/house";
export default {
  data() {
    return {
      tableData: [],
      form: {
        name: ""
      },
      groupForm: {
        name: "",
        floor: undefined,
        unit: undefined
      },
      groupFormRules: {
        name: [{ required: true, message: "请输入小区名称", trigger: "blur" }],
        unit: [
          { required: true, message: "请输入小区单元数量", trigger: "blur" }
        ],
        floor: [{ required: true, message: "请输入楼层数量", trigger: "blur" }]
      },
      dialogFormVisible: false,
      page: 1,
      pageSize: 10,
      total: 0,
      dialogType: "add"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getHouse({
        page: this.page,
        pageSize: this.pageSize,
        ...this.form
      }).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        console.log(res.data)
      });
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
    openModal() {
      this.dialogFormVisible = true;
      this.dialogType = "add";
    },
    handleSubmit() {
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === "add") {
            addHouse(this.groupForm)
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
            editHouse(this.groupForm, this.groupForm.id)
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
    handleClick(row) {
      this.dialogType = "edit";
      this.groupForm = {
        id: row.id,
        name: row.name,
        unit: row.unit,
        floor: row.floor
      };
      this.dialogFormVisible = true;
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除该房源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delHouse(id)
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
    }
  }
};
</script>

<style></style>
