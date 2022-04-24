const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { SUCCESS_CODE } = require("../utils/code");
const { formatDate } = require("../utils/format");
const getUserInfo = require("../utils/getUserInfo");
const { query, execute } = require("../utils/mysql");

router.get("/bill", async function (req, res) {
  const userInfo = getUserInfo(req);
  const { page, pageSize, ...form } = req.query;
  let sql = `select * from el_bill`;
  let sqlArr = [];
  if (
    (form.orderNum && form.orderNum !== "") ||
    (form.payPrice && form.payPrice !== "")
  ) {
    sql += " where ";
    let i = 0;
    for (let key in form) {
      if (form[key] !== "") {
        if (i > 0) {
          sql += " and ";
        }
        sql += `${key}=? `;
        i++;
        sqlArr.push(form[key]);
      }
    }
  }
  if (userInfo.role === 0) {
    if (sql.includes("where")) {
      sql += ` and uid=${userInfo.id} `;
    } else {
      sql += ` where uid=${userInfo.id} `;
    }
  }
  sql += " limit ?,?";
  console.log(sql);
  const pageNum = +page || 1;
  const pageSize1 = +pageSize || 10;
  const limit = (pageNum - 1) * pageSize1;
  sqlArr.push(...[limit, pageSize1]);
  const billList = await query(sql, sqlArr);
  const count = await execute("select count(orderNum) total from el_bill");
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      pageNum,
      pageSize1,
      total: count[0].total,
      list: billList
    }
  });
});

module.exports = router;
