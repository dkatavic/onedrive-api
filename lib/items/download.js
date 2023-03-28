// download.js
const got = require("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function download
 * @description Download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {String} params.itemPath Item path
 * @param {String} params.format converts item to specified format
 *
 * @return {ReadableStream} Readable stream with item's content
 */
function download(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId && !params.itemPath) {
    throw new Error("Missing both params.itemId and params.itemPath");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + (params.itemId ? ("items/" + params.itemId) : itemPathFormatter(params.itemPath)) + "/content" + (params.format ? `?format=${params.format}` : "");

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
  });
  return gotExtend.stream(URI);
}

module.exports = download;
