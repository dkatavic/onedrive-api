// download.js
const request = require("request");
const got = require("got");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

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
 * @return {Object} Readable stream with item's content
 */

function download(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  var userPath = userPathGenerator(params);

  var options = {
    method: "GET",
    uri: appConfig.apiUrl + userPath + "items/" + params.itemId + "/content",
    headers: {
      Authorization: "Bearer " + params.accessToken,
    },
  };

  return request(options);
}

/**
 * @function download
 * @description Download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId item id
 * @param {function} params.progress a callback return the current download process
 * 
 * @return {Object} Readable stream with item's content
 */

async function got_download(params) {
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
  });

  const streamFile = gotExtend.stream(URI);
  
  if(params.progress) {
    streamFile.on('downloadProgress', params.progress);
  }

  return await streamFile;
}

module.exports = got_download;
