const request = require("request-promise");
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
 * @return {undefined} (204 No content)
 */

function _delete(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  var userPath = userPathGenerator(params);

  var options = {
    method: "DELETE",
    uri: appConfig.apiUrl + userPath + "items/" + params.itemId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken,
    },
    json: true,
  };

  return request(options);
}

async function got_delete(params) {
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

  try {
    const response = await gotExtend(URI);

    return response.body === '' ? undefined : false;
  } catch (err) {
    // => 'Internal server error ...'
    // TODO: throw error here
    console.error(err);
    return false;
  }
}

module.exports = got_delete;
