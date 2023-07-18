// createLink.js
const got = import("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function createLink
 * @description Sharing link for item
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {String} params.itemPath Item path
 * @param {"view" | "edit" | "embed"} params.type Type of sharing link
 * @param {String} params.body Request body
 *
 * @return {Promise<object>} Object including share link
 */
async function createLink(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId && !params.itemPath) {
    throw new Error("Missing both params.itemId and params.itemPath");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + (params.itemId ? ("items/" + params.itemId) : itemPathFormatter(params.itemPath)) + "/createLink";

  const gotExtend = (await got).got.extend({
    method: "POST",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  const response = await gotExtend(URI, {
    json: {
      type: params.type || "embed",
      ...(params.body ? params.body : {})
    }
  });
  return response.body
}

module.exports = createLink;
