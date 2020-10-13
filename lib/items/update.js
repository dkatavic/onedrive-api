// update.js
const isEmptyObject = require("is-empty-object");
const userPathGenerator = require("../helpers/pathHelper");
const got = require("got");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function update
 * @description update item metadata
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {Object} params.toUpdate Object to update
 *
 * @return {Promise<Object>} Item object
 */
async function update(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  if (!params.toUpdate || isEmptyObject(params.toUpdate)) {
    throw new Error("params.toUpdate should not be empty");
  }

  const userPath = userPathGenerator(params);
  const URI = appConfig.apiUrl + userPath + "items/" + params.itemId;

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
    method: "PATCH",
  });

  const response = await gotExtend(URI, {
    json: params.toUpdate
  })
  return response.body;
}

module.exports = update;
