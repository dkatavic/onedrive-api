// update.js
var request = require('request-promise'),
  isEmptyObject = require('is-empty-object'),
  userPathGenerator = require('../helpers/pathHelper');

/**
 * @function update
 * @description update item metadata
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 * @param {Object} params.toUpdate Object to update
 *
 * @return {Object} Item object
 */

function update(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  if (!params.toUpdate || isEmptyObject(params.toUpdate)) {
    throw new Error("params.toUpdate should not be empty");
  }

  var userPath = userPathGenerator(params);

  var options = {
    method: 'PATCH',
    uri: appConfig.apiUrl + userPath + 'drive/items/' + params.itemId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    body: params.toUpdate,
    json: true
  };

  return request(options);

}

module.exports = update;
