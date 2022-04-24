<template>
  <div class="userBill">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input
          v-model="form.orderNum"
          placeholder="请输入订单编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="缴费金额">
        <el-input
          v-model="form.payPrice"
          placeholder="请输入缴费金额"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="orderNum" label="订单编号"> </el-table-column>
      <el-table-column prop="bid" label="设备id"> </el-table-column>
      <el-table-column prop="payPrice" label="缴费金额"> </el-table-column>
      <el-table-column prop="unitPrice" label="缴费单价"> </el-table-column>
      <el-table-column label="缴费时间">
        <template slot-scope="scope">
          {{ scope.row.pay_time | formatDateTime }}
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
  </div>
</template>

<script>
import { getBill } from "../../../api/bill";
export default {
  data() {
    return {
      tableData: [],
      form: {
        orderNum: "",
        payPrice: ""
      },
      loading: false,
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.getBillList();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getBillList();
    },
    getBillList() {
      this.loading = true;
      getBill({
        page: this.page,
        pageSize: this.pageSize,
        ...this.form
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    onSubmit() {
      console.log(this.form);
      this.getBillList();
    }
  }
};
</script>

<style></style>
