// partialDownload.js
const getMetadata = require("./getMetadata");
const got = import("got");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function partialDownload
 * @description partially download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.graphDownloadURL The URL string from `@microsoft.graph.downloadUrl`
 * @param {String} params.itemId item id. If `graphDownloadURL` is provided, this parameter will be ignored
 * @param {String} params.itemPath item path
 * @param {Number} params.bytesFrom the starting byte to stream
 * @param {Number} params.bytesTo the ending byte of the stream
 *
 * @return {Promise<NodeJS.ReadableStream>} A promise with the result is a `Readable stream` with partial item's content
 */

async function partialDownload(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.graphDownloadURL && !params.itemId && !params.itemPath) {
    throw new Error("Missing all of params.graphDownloadURL, params.itemId and params.itemPath");
  }

  if (!params.bytesFrom) {
    params.bytesFrom = 0;
  }

  if (!params.bytesTo) {
    throw new Error("Missing params.bytesTo");
  }

  const headersRequest = {
    Range: `bytes=${params.bytesFrom}-${params.bytesTo}`,
  };
  let URI = params.graphDownloadURL;

  const gotExtend = (await got).got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: headersRequest,
    isStream: true,
    method: "GET",
  });

  if (!URI) {
    const metaItem = await getMetadata(params);
    URI = metaItem["@microsoft.graph.downloadUrl"];
    if (!URI) {
      throw new Error("Item does not have @microsoft.graph.downloadUrl field");
    }
  }
  return gotExtend.stream(URI);
}

module.exports = partialDownload;
