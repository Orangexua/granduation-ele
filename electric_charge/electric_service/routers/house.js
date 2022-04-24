const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { SUCCESS_CODE } = require("../utils/code");
const { query, execute } = require("../utils/mysql");

const checkArr = [
  check("name").notEmpty(),
  check("unit").notEmpty().isNumeric(),
  check("floor").notEmpty().isNumeric()
];

router.get("/house", async function (req, res) {
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 10;
  const limit = (page - 1) * pageSize;
  let sql = `select * from el_house`;
  if (req.query.name && req.query.name !== "") {
    sql += ` where name like '%${req.query.name}%'`;
  }
  sql += " limit ?,?";
  const list = await query(sql, [limit, pageSize]);
  const count = await execute("select count(id) total from el_house");
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data: {
      page,
      pageSize,
      total: count[0].total,
      list
    }
  });
});

router.post("/house", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  const { name, unit, floor } = req.body;
  await execute("insert into el_house(name,unit,floor) values(?,?,?)", [
    name,
    unit,
    floor
  ]);
  res.send({
    code: SUCCESS_CODE,
    msg: "添加房源成功"
  });
});

router.put("/house/:id", checkArr, async function (req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new Error("Invalid value");
  }
  const { name, unit, floor } = req.body;
  await execute(
    `update el_house set name=?,unit=?,floor=? where id=${req.params.id}`,
    [name, unit, floor]
  );
  res.send({
    code: SUCCESS_CODE,
    msg: "修改房源成功"
  });
});

router.delete("/house/:id", async function (req, res) {
  await execute(`delete from el_house where id=${req.params.id}`);
  res.send({
    code: SUCCESS_CODE,
    msg: "删除房源成功"
  });
});

module.exports = router;
