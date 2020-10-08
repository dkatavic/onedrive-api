const got = require("got");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function delete
 * @description Delete item (file or folder)
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 *
 * @return {Promise<boolean>} true for successfully deleting the file.
 */
async function _delete(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId;

  const gotExtend = got.extend({
    method: "DELETE",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  const response = await gotExtend(URI);
  return response.body === "";
}

module.exports = _delete;
