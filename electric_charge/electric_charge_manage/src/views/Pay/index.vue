<template>
  <div class="pay">
    <div v-if="userInfo.role === 0">
      <el-button type="primary" @click="dialogFormVisible = true">
        充值
      </el-button>
      <div v-for="item in list" :key="item.id">
        <h1 style="margin: 50px 0">{{ item.name }}电费剩余</h1>
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="
            (1 - item.electric_use / item.electric_total).toFixed(2) * 100
          "
        ></el-progress>
      </div>
    </div>
    <el-table v-else :data="tableData" style="width: 100%">
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
            style="margin-right: 20px"
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
          >
            缴费
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="充值缴费" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="formRules" ref="payForm">
        <el-form-item label="充值金额" prop="payPrice" :label-width="'120px'">
          <el-input v-model.number="form.payPrice" autocomplete="off">
            <template slot="append">¥</template>
          </el-input>
        </el-form-item>
        <el-form-item
          v-show="userInfo.role === 0"
          label="当前价格"
          :label-width="'120px'"
        >
          <el-input disabled v-model="form.unitPrice" />
        </el-form-item>
        <el-form-item
          v-show="userInfo.role === 0"
          prop="id"
          label="设备"
          :label-width="'120px'"
        >
          <el-select v-model="form.id" placeholder="请选择要充值的设备">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </div>
    </el-dialog>
    <div style="float:right;margin-top:10px">
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="10"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserEquipment, getEquipment } from "../../api/equipment";
import { userPayPrice, pay, payByAdmin } from "../../api/pay";
import { getStore } from "../../utils/storage";
export default {
  data() {
    return {
      form: {
        id: undefined,
        payPrice: "",
        unitPrice: ""
      },
      formRules: {
        payPrice: [
          { required: true, message: "请输入要充值的金额", trigger: "blur" }
        ],
        id: [{ required: true, message: "请选择要充值的设备", trigger: "blur" }]
      },
      dialogFormVisible: false,
      list: [],
      tableData: [],
      userInfo: {},
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.getUserPrice();
    this.userInfo = JSON.parse(getStore("userInfo"));
    if (this.userInfo.role === 1) {
      this.getTableList();
    } else {
      this.getList();
    }
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getTableList();
    },
    getTableList() {
      getEquipment({
        page: this.page,
        pageSize: this.pageSize
      }).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    getUserPrice() {
      userPayPrice().then((res) => {
        this.form.unitPrice = res.data.unitPrice;
      });
    },
    getList() {
      getUserEquipment().then((res) => {
        this.list = res.data.list;
      });
    },
    handleClick(row) {
      this.form.id = row.id;
      this.form.uid = row.uid;
      this.dialogFormVisible = true;
    },
    handleSubmit() {
      this.$refs.payForm.validate((valid) => {
        if (valid) {
          if (this.userInfo.role === 0) {
            pay(this.form)
              .then(() => {
                this.getList();
                this.$message.success("预缴费成功");
                this.dialogFormVisible = false;
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else {
            payByAdmin(this.form)
              .then(() => {
                this.getTableList();
                this.$message.success("缴费成功");
                this.dialogFormVisible = false;
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        }
      });
    }
  }
};
</script>

<style></style>
