const got = require("got");
const request = require("request-promise");
const userPathGenerator = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function createFolder
 * @description Create Folder
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.rootItemId=root] Root Item id
 * @param {String} params.name New folder name
 *
 * @return {Object} folder object
 */

function createFolder(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.name) {
    throw new Error("Missing params.name");
  }

  params.rootItemId = params.rootItemId === undefined ? "root" : params.rootItemId;
  var userPath = userPathGenerator(params);

  var options = {
    method: "POST",
    uri: appConfig.apiUrl + userPath + "items/" + params.rootItemId + "/children",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken,
    },
    body: {
      name: params.name,
      folder: {},
    },
    json: true,
  };

  return request(options);
}
/**
 * @function createFolder
 * @description Create Folder
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.rootItemId=root] Root Item id
 * @param {String} params.name New folder name
 *
 * @return {Promise<object>} folder meta object.
 */
async function got_createFolder(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.name) {
    throw new Error("Missing params.name");
  }

  params.rootItemId = params.rootItemId === undefined ? "root" : params.rootItemId;
  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.rootItemId + "/children";

  const gotExtend = got.extend({
    method: "POST",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  });

  try {
    const response = await gotExtend(URI, {
      json: {
        name: params.name,
        folder: {},
      },
    });

    return response.body;
  } catch (err) {
    // => 'Internal server error ...'
    // TODO: throw error here
    console.error(err);
    return null;
  }
}

module.exports = got_createFolder;
