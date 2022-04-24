<template>
  <div class="login">
    <el-card style="width: 30vw" class="box-card">
      <h3
        style="
          font-size: 3vw;
          color: #0084ff;
          text-align: center;
          display: block;
          margin-top: 30px;
        "
      >
        电管
      </h3>
      <div class="tip">注册电管，发现更大的世界</div>
      <div class="con"></div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item style="width: 24vw" label="手机号" prop="phone">
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
            v-on:keyup.enter="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 24vw" label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            v-on:keyup.enter="submitForm('ruleForm')"
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
          <el-form-item style="width: 20vw" label="用户昵称" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 26vw" label="小区" prop="house">
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
          <el-form-item style="width: 25vw" label="详细地址" prop="address">
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
  background-image: url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png);
  background-size: 100% 100%;
  .tip {
    color: #0084ff;
    text-align: center;
    font-size: 22px;
    margin-top: 15px;
  }
  .con {
    width: 25vw;
    height: 24px;
    border-bottom: 1px solid #ebebeb;
    margin-left: 18px;
    margin-bottom: 30px;
  }
}
</style>
