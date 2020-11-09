const got = require("got");
const gotConfig = require("../helpers/gotHelper");
const userPathGenerator = require("../helpers/pathHelper");

/**
 * @function getMetadata
 * @description Get items metadata (file or folder)
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 *
 * @return {Promise<Object>} Item's metadata
 */
async function getMetadata(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId;

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
    method: "GET",
  });

  const response = await gotExtend(URI);
  return response.body;
}

module.exports = getMetadata;
