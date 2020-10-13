// lib/index.js

const items = require("./items");
const config = require("./config");

global.appConfig = config;

module.exports = {
  items: items,
};
