module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 13,
  },
  ignorePatterns: ["lib/index.d.ts"],
  rules: {},
};
