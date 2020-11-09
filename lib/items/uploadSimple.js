// uploadSimple.js
const path = require("path");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");
const got = require("got");
const { Readable } = require("stream");

/**
 * @function uploadSimple
 * @description Create file with simple upload
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.filename File name
 * @param {String} [params.parentId=root] Parent id
 * @param {String} [params.parentPath] Parent path
 * @param {NodeJS.ReadableStream} params.readableStream Readable Stream with file's content
 *
 * @return {Promise<Object>} Item
 */
async function uploadSimple(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.filename) {
    throw new Error("Missing params.filename");
  }

  if (!params.readableStream) {
    throw new Error("Missing params.readableStream");
  }

  params.parentId = params.parentId === undefined ? "root" : params.parentId;
  const userPath = userPathGenerator(params);
  let uri = appConfig.apiUrl + userPath + "items/" + params.parentId + "/children/" + params.filename + "/content";
  if (params.parentPath !== undefined && typeof params.parentPath === "string") {
    uri = appConfig.apiUrl + userPath + "root:/" + path.join(params.parentPath, params.filename) + ":/content";
  }

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    responseType: gotConfig.responseJSON,
    body: new Readable().wrap(params.readableStream),
  });

  const response = await gotExtend.put(uri);
  return response.body;
}

module.exports = uploadSimple;
