module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "comma-dangle": 0,
    // "comma-dangle": [2, "never"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        // 行尾逗号,默认none,可选 none|es5|all
        // es5 包括es5中的数组、对象
        // all 包括函数对象等所有可选
        trailingComma: "none"
      }
    ]
  }
};
