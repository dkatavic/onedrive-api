const got = import("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function createFolder
 * @description Create Folder
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.itemId=root] Item id
 * @param {String} [params.rootItemId=root] Root Item id - Deprecated: Use itemId instead for consistency
 * @param {String} params.itemPath Item path
 * @param {String} params.name New folder name
 *
 * @return {Promise<object>} folder meta object.
 */
async function createFolder(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.name) {
    throw new Error("Missing params.name");
  }

  const itemAddress = (params.itemId || params.rootItemId) ? ("items/" + (params.itemId || params.rootItemId)) : (params.itemPath ? itemPathFormatter(params.itemPath) : "items/root")

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + itemAddress + "/children";

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
      name: params.name,
      folder: {},
    },
  });

  return response.body;
}

module.exports = createFolder;
