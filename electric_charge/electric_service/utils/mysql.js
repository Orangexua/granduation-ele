const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "electric_manage",
  password: "czx0510.",
  waitForConnections: true, //连接超额是否等待
  connectionLimit: 10, //一次创建的最大连接数
  queueLimit: 0 //可以等待的连接的个数
});

const query = async function (sql, params) {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (err) {
    throw err;
  }
};

const execute = async function (sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  query,
  execute
};
