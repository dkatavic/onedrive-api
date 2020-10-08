// download.js
const got = require("got");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function download
 * @description Download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId item id
 *
 * @return {Promise<ReadableStream>} Readable stream with item's content
 */
async function download(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId + "/content";

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    isStream: true,
  });

  const streamFile = gotExtend.stream(URI);
  return streamFile;
}

module.exports = download;
