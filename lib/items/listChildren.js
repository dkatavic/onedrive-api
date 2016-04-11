var request = require('request-promise');

/**
 * @function listChildren
 * @description List childrens
 *
 * @params {Object} params
 * @params {String} params.accessToken OneDrive access token
 * @params {String} [params.itemId=root] Item id
 *
 * @return {Array} object of children items
 */

function listChildren(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  params.itemId = params.itemId === undefined ? "root" : params.itemId;

  var options = {
    method: 'GET',
    uri: appConfig.apiUrl + 'drive/items/' + params.itemId + '/children',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  return request(options);
  
}

module.exports = listChildren;
