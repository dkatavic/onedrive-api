// preview.js
const got = import("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function preview
 * @description Embeddable URL for a temporary preview
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {String} params.itemPath Item path
 * @param {String} params.body Request body
 *
 * @return {Promise<object>} object with embeddable url
 */
async function preview(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId && !params.itemPath) {
    throw new Error("Missing both params.itemId and params.itemPath");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + (params.itemId ? ("items/" + params.itemId) : itemPathFormatter(params.itemPath)) + "/preview";

  const gotExtend = (await got).got.extend({
    method: "POST",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON
  });

  const response = await gotExtend(URI, {
    json: params.body
  });

  return response.body
}

module.exports = preview;
