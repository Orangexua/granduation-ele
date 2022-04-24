const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const {
  SUCCESS_CODE,
  INVALID_PARAMS,
  USER_NULL,
  PASSWORD_ERR,
  USER_HAVE
} = require("../utils/code");
const { query, execute } = require("../utils/mysql");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../utils/jwtKey");
const { formatDate } = require("../utils/format");
const getUserInfo = require("../utils/getUserInfo");

router.post(
  "/login",
  [
    check("phone")
      .notEmpty()
      .withMessage("手机号不能为空")
      .isMobilePhone()
      .withMessage("手机号格式不正确"),
    check("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("密码长度需要在6-20之间")
  ],
  async function (req, res) {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.send({
        code: INVALID_PARAMS,
        msg: errors[0].msg
      });
      return;
    }
    const { phone, password } = req.body;
    const user = await query("select * from el_user where phone=?", [phone]);
    if (user.length === 0) {
      res.send({
        code: USER_NULL,
        msg: "用户不存在"
      });
      return;
    }
    if (user[0].password !== password) {
      res.send({
        code: PASSWORD_ERR,
        msg: "密码不正确"
      });
      return;
    }
    const token = jwt.sign({ ...user[0] }, privateKey);
    res.send({
      code: SUCCESS_CODE,
      msg: "ok",
      data: {
        token
      }
    });
  }
);

router.post(
  "/register",
  [
    check("phone")
      .notEmpty()
      .withMessage("手机号不能为空")
      .isMobilePhone()
      .withMessage("手机号格式不正确"),
    check("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("密码长度需要在6-20之间"),
    check("password").notEmpty(),
    check("house").notEmpty(),
    check("address").notEmpty()
  ],
  async function (req, res) {
    const { errors, ...err } = validationResult(req);
    if (errors.length > 0) {
      res.send({
        code: INVALID_PARAMS,
        msg: errors[0].msg
      });
      return;
    }
    const { phone, password, username, address } = req.body;
    const userList = await query("select * from el_user where phone=?", [
      phone
    ]);
    if (userList.length > 0) {
      res.send({
        code: USER_HAVE,
        msg: "手机号已存在"
      });
      return;
    }
    await execute(
      "insert into el_user(username,password,phone,address,role,create_time) values(?,?,?,?,?,?)",
      [username, password, phone, address, 0, formatDate(new Date())]
    );
    res.send({
      code: SUCCESS_CODE,
      msg: "注册用户成功"
    });
  }
);

router.get("/user", async function (req, res) {
  const list = await query("select * from el_user where role=0");
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      list
    }
  });
});

router.get("/user/detail", async function (req, res) {
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: getUserInfo(req)
  });
});

module.exports = router;
