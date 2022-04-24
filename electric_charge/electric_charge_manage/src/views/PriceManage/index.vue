<template>
  <div class="pricemanage">
    <div class="price">
      目前新用户电费价格：<el-tag type="danger">{{this.newPrice1}}</el-tag>
    </div>
    <div style="margin-top:5px" class="price">
      目前老用户电费价格：<el-tag type="danger">{{this.oldPrice1}}</el-tag>
    </div>
    <el-form
      :model="form"
      :rules="formRules"
      ref="ruleForm"
      class="demo-form-inline"
      style="width: 360px;margin-top:120px"
    >
      <!-- <h4 class="price" style="margin-botom:5px">重新设置用户电费价格</h4> -->
      <el-form-item  label="修改新用户价格:" :label-width="'140px'" prop="newPrice">
        <el-input v-model="form.newPrice" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="修改老用户价格:" :label-width="'140px'" prop="oldPrice">
        <el-input v-model="form.oldPrice" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item :label-width="'160px'">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="price" style="margin-top:50px">
      <h4 style="color:#F7170F">价格修改注意事项：</h4>
      <h5>1.由于新用户有优惠活动，所以新用户价格设置不可高于老用户</h5>
      <h5>2.注册七天以内的算新用户，七天以外的算老用户</h5>
      <h5>3.管理员更改电费价格需仔细评判不同用户，根据企业方案进行价格配置</h5>
    </div>  
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
      newPrice1:"",
      oldPrice1: "",
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
       this.$confirm('此操作将会修改用户电量价格, 请谨慎选择', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          });          
        });
      
    },
    getCurrentPrice() {
      getPrice().then((res) => {
        this.form = res.data;
        this.newPrice1 = res.data.newPrice;
        this.oldPrice1 = res.data.oldPrice;
      });
    },
    cancel() {
      this.form.oldPrice = ''
      this.form.newPrice = ''
      this.getCurrentPrice()
    }
  }
};
</script>

<style>
.price{
  margin-left:30px;
  font-size: 15px;
}
  </style>
