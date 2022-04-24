const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { SUCCESS_CODE } = require("../utils/code");
const getUserInfo = require("../utils/getUserInfo");
const { query, execute } = require("../utils/mysql");

const checkArr = [
  check("uid").notEmpty().isNumeric(),
  check("electric_total").notEmpty().isFloat(),
  check("name").notEmpty()
];

router.get("/equipment", async function (req, res) {
  const { page, pageSize, ...form } = req.query;
  const pageNum = +page || 1;
  const size = +pageSize || 10;
  const limit = (pageNum - 1) * size;
  let where = "";
  let sql =
    "select b.*,u.username,u.phone from el_box b left join el_user u on uid=u.id ";
  let i = 0;
  let sqlArr = [];
  for (let key in form) {
    if (form[key] !== "") {
      if (i > 0) {
        where += " and ";
      }
      if (key === "name") {
        where += `b.name like '%${form["name"]}%' `;
      } else {
        where += `${key}=${form["phone"]} `;
      }

      console.log(where);
      i++;
    }
  }
  if (where !== "") sql += " where " + where;
  sql += "limit ?,?";
  sqlArr.push(...[limit, size]);
  console.log(sql);
  const list = await query(sql, sqlArr);
  const count = await execute("select count(id) total from el_box");
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      page: pageNum,
      pageSize: size,
      total: count[0].total,
      list
    }
  });
});

router.get("/equipment/user", async function (req, res) {
  const userInfo = getUserInfo(req);
  const list = await query(`select * from el_box where uid=?`, [userInfo.id]);
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      list
    }
  });
});

router.post("/equipment", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  const { electric_total, uid, name } = req.body;
  await execute(
    "insert into el_box(electric_total,electric_use,uid,name) values(?,?,?,?)",
    [electric_total, 0, uid, name]
  );
  res.send({
    code: SUCCESS_CODE,
    msg: "添加设备成功"
  });
});

router.put("/equipment/:id", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  const { electric_total, name, uid } = req.body;
  await execute(
    `update el_box set electric_total=?,uid=?,name=? where id=${req.params.id}`,
    [electric_total, uid, name]
  );
  res.send({
    code: SUCCESS_CODE,
    msg: "修改设备成功"
  });
});

router.delete("/equipment/:id", async function (req, res) {
  await execute(`delete from el_box where id=${req.params.id}`);
  res.send({
    code: SUCCESS_CODE,
    msg: "删除设备成功"
  });
});

module.exports = router;
