const express = require("express");
const app = express();
require("express-async-errors");
const userRouter = require("./routers/user");
const priceRouter = require("./routers/price");
const houseRouter = require("./routers/house");
const equipmentRouter = require("./routers/equipment");
const payRouter = require("./routers/pay");
const billRouter = require("./routers/bill");
const {
  ERROR_CODE,
  INVALID_PARAMS,
  NOT_VERIFY,
  TOKEN_EXPIRE
} = require("./utils/code");
const jwt = require("jsonwebtoken");
const { privateKey } = require("./utils/jwtKey");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path);
  if (
    req.path !== "/login" &&
    req.path !== "/register" &&
    req.path !== "/house"
  ) {
    const token = req.headers.authorization;
    if (token) {
      try {
        const tokenErr = jwt.verify(token.split(" ")[1], privateKey);
        next();
      } catch (err) {
        res.status(403).json({
          code: TOKEN_EXPIRE,
          msg: "登录已过期"
        });
      }
    } else {
      res.status(401).json({
        code: NOT_VERIFY,
        msg: "请登录"
      });
    }
  } else {
    next();
  }
});

app.use(
  "/",
  userRouter,
  priceRouter,
  houseRouter,
  equipmentRouter,
  payRouter,
  billRouter
);

app.use(function errorHandler(err, req, res, next) {
  console.log(err.message);
  if (err.message === "Invalid value") {
    res.send({
      code: INVALID_PARAMS,
      msg: "参数验证错误"
    });
  } else {
    res.status(500).json({
      code: ERROR_CODE,
      msg: "服务器错误"
    });
  }
  next(err);
});

app.listen(9001, () => console.log("server running~~9001"));
