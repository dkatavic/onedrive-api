var config = require('../../config.js'),
  request = require('request-promise');

/**
 * @function delete
 * @description Delete item (file or folder)
 *
 * @params {Object} params
 * @params {String} params.accessToken OneDrive access token
 * @params {String} params.itemId Item id
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

  var options = {
    method: 'DELETE',
    uri: appConfig.apiUrl + 'drive/items/' + params.itemId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  return request(options);
  
}

module.exports = _delete;
