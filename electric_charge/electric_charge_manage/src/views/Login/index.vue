<template>
  <div class="login">
    <el-card style="width: 40vw; height: 35vw" class="box-card">
      <h3 style="text-align: center; margin-bottom: 50px">电费管理系统</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item style="width: 500px" label="手机号" prop="phone">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 500px" label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div v-if="type === 'login'">
          <el-form-item style="">
            <el-button
              style="margin-right: 20px"
              type="primary"
              @click="submitForm('ruleForm')"
            >
              登录
            </el-button>
            <el-link type="primary" @click="type = 'register'"> 注册 </el-link>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item style="width: 500px" label="用户昵称" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 500px" label="小区" prop="house">
            <el-select v-model="ruleForm.house">
              <el-option
                v-for="item in houseList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                placeholder="请选择房源"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 500px" label="详细地址" prop="address">
            <el-input
              type="text"
              v-model="ruleForm.address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="">
            <el-button
              style="margin-right: 20px"
              type="primary"
              @click="submitForm('ruleForm')"
            >
              注册
            </el-button>
            <el-link type="primary" @click="type = 'login'"> 去登录 </el-link>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getHouse } from "../../api/house";
import { login, register } from "../../api/user";
import { setStore } from "../../utils/storage";
export default {
  data() {
    return {
      ruleForm: {
        phone: "",
        password: "",
        username: "",
        house: undefined,
        address: ""
      },
      type: "login",
      rules: {
        phone: [{ required: true, message: "请输入手机号", blur: "trigger" }],
        password: [
          { required: true, message: "请输入秘密啊", blur: "trigger" }
        ],
        username: [
          { required: true, message: "请输入用户昵称", blur: "trigger" }
        ],
        house: [
          {
            required: true,
            type: "number",
            message: "请选择房源",
            blur: "trigger"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", blur: "trigger" }
        ]
      },
      houseList: []
    };
  },
  watch: {
    type(newVal) {
      this.$refs.ruleForm.resetFields();
      if (newVal === "register") {
        this.getHouseList();
      }
    }
  },
  methods: {
    getHouseList() {
      getHouse().then((res) => {
        this.houseList = res.data.list;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === "register") {
            register(this.ruleForm)
              .then(() => {
                this.$message.success("注册用户成功");
                this.type = "login";
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else {
            login(this.ruleForm)
              .then((res) => {
                setStore("token", res.data.token);
                this.$message.success("登录成功～欢迎回来");
                this.$router.push("/");
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
