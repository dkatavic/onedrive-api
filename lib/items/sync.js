const got = import("got");
const {userPathGenerator} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function sync
 * @description Sync
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.next] nextLink (or deltaLink returned from last session).
 *
 * @return {Promise<Object>} Array of changes since last sync. Use nextLink until deltaLink comes up.
 */
async function sync(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  const userPath = userPathGenerator(params);
  const URI = params.next ? params.next : appConfig.apiUrl + userPath + "root/delta";

  const gotExtend = (await got).got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    method: "GET",
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  const response = await gotExtend(URI);
  return response.body;
}

module.exports = sync;
