const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { SUCCESS_CODE } = require("../utils/code");
const { formatDate, formatDateTime } = require("../utils/format");
const getUserInfo = require("../utils/getUserInfo");
const { query, execute } = require("../utils/mysql");

const checkArr = [
  check("id").notEmpty().isNumeric(),
  check("payPrice").notEmpty().isFloat()
];

router.post("/pay", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  const userInfo = getUserInfo(req);
  const timestamp = new Date().getTime();
  const days = Math.floor(
    (timestamp - new Date(userInfo.create_time).getTime()) / (1000 * 3600 * 24)
  );
  const priceList = await query("select * from el_price order by id desc");
  if (priceList.length <= 0) return;
  let unitPrice = priceList[0].oldPrice;
  if (days <= 7) unitPrice = priceList[0].newPrice;
  const { id, payPrice } = req.body;
  const electricDegree = (payPrice / unitPrice).toFixed(2);
  await execute(
    "update el_box set electric_total=electric_total+? where id=? and uid=?",
    [electricDegree, id, userInfo.id]
  );
  res.send({
    code: SUCCESS_CODE,
    msg: "缴费成功"
  });
  setTimeout(() => {
    execute(
      "insert into el_bill(orderNum,payPrice,unitPrice,pay_time,bid,uid) values(?,?,?,?,?,?)",
      [
        timestamp,
        payPrice,
        unitPrice,
        formatDateTime(timestamp),
        id,
        userInfo.id
      ]
    );
  }, 0);
});

router.post("/payByAdmin", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  // const userInfo = getUserInfo(req);
  const user = await query("select * from el_user where id=?", [req.body.uid]);
  const userInfo = user[0];
  const timestamp = new Date().getTime();
  const days = Math.floor(
    (timestamp - new Date(userInfo.create_time).getTime()) / (1000 * 3600 * 24)
  );
  const priceList = await query("select * from el_price order by id desc");
  if (priceList.length <= 0) return;
  let unitPrice = priceList[0].oldPrice;
  if (days <= 7) unitPrice = priceList[0].newPrice;
  const { id, payPrice } = req.body;
  const electricDegree = (payPrice / unitPrice).toFixed(2);
  await execute(
    "update el_box set electric_total=electric_total+? where id=? and uid=?",
    [electricDegree, id, userInfo.id]
  );
  res.send({
    code: SUCCESS_CODE,
    msg: "缴费成功"
  });
  setTimeout(() => {
    execute(
      "insert into el_bill(orderNum,payPrice,unitPrice,pay_time,bid,uid) values(?,?,?,?,?,?)",
      [
        timestamp,
        payPrice,
        unitPrice,
        formatDateTime(timestamp),
        id,
        userInfo.id
      ]
    );
  }, 0);
});

router.get("/pay/userPrice", async function (req, res) {
  const userInfo = getUserInfo(req);
  const timestamp = new Date().getTime();
  const days = Math.floor(
    (timestamp - new Date(userInfo.create_time).getTime()) / (1000 * 3600 * 24)
  );
  const priceList = await query("select * from el_price order by id desc");
  if (priceList.length <= 0) return;
  let unitPrice = priceList[0].oldPrice;
  if (days <= 7) unitPrice = priceList[0].newPrice;

  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      unitPrice
    }
  });
});

module.exports = router;
