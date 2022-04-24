<template>
  <div class="pricemanage">
    <el-form
      :model="form"
      :rules="formRules"
      ref="ruleForm"
      class="demo-form-inline"
      style="width: 360px"
    >
      <el-form-item label="新用户价格" :label-width="'120px'" prop="newPrice">
        <el-input v-model="form.newPrice" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="老用户价格" :label-width="'120px'" prop="oldPrice">
        <el-input v-model="form.oldPrice" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item :label-width="'120px'">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePrice, getPrice } from "../../api/price";
export default {
  data() {
    return {
      form: {
        newPrice: "",
        oldPrice: ""
      },
      formRules: {
        oldPrice: [
          {
            required: true,
            message: "请输入老用户价格",
            trigger: "blur"
          }
        ],
        newPrice: [
          {
            required: true,
            message: "请输入新用户价格",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCurrentPrice();
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.newPrice > this.form.oldPrice) {
            this.$message.error("新用户价格不能比老用户高");
            return;
          }
          changePrice(this.form)
            .then(() => {
              this.$message.success("修改价格成功");
              this.getCurrentPrice();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCurrentPrice() {
      getPrice().then((res) => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style></style>
