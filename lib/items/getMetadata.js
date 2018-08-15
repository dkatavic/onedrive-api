var request = require('request-promise');
var userPathGenerator = require('../helpers/pathHelper');

/**
 * @function getMetadata
 * @description Get items metadata (file or folder)
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId Item id
 *
 * @return {Object} Item's metadata
 */

function getMetadata(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }

  var userPath = userPathGenerator(params);

  var options = {
    method: 'GET',
    uri: appConfig.apiUrl + userPath + 'drive/items/' + params.itemId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  return request(options);

}

module.exports = getMetadata;
