const router = require("express").Router();
const { SUCCESS_CODE } = require("../utils/code");
const { formatDateTime } = require("../utils/format");
const { query, execute } = require("../utils/mysql");
const { check, validationResult } = require("express-validator");

router.get("/price", async function (req, res) {
  const result = await query("select * from el_price order by id desc");
  const data =
    Array.isArray(result) && result.length > 0
      ? {
          ...result[0]
        }
      : null;
  res.send({
    code: SUCCESS_CODE,
    msg: "ok",
    data
  });
});

router.post(
  "/price",
  [check("newPrice").notEmpty(), check("oldPrice").notEmpty()],
  async function (req, res) {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      throw new Error("Invalid value");
    }
    await execute(
      "insert into el_price(newPrice,oldPrice,update_time) values(?,?,?)",
      [
        req.body.newPrice,
        req.body.oldPrice,
        formatDateTime(new Date().getTime())
      ]
    );
    res.send({
      code: SUCCESS_CODE,
      msg: "修改价格成功"
    });
  }
);

module.exports = router;
