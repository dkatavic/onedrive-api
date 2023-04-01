const got = import("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function delete
 * @description Delete item (file or folder)
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {String} params.itemPath Item path
 *
 * @return {Promise<void>} throwing error if cannot delete.
 */
async function _delete(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId && !params.itemPath) {
    throw new Error("Missing both params.itemId and params.itemPath");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + (params.itemId ? ("items/" + params.itemId) : itemPathFormatter(params.itemPath));

  const gotExtend = (await got).got.extend({
    method: "DELETE",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  await gotExtend(URI);
}

module.exports = _delete;
