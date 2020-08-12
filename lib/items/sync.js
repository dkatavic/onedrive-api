var request = require('request-promise');
var userPathGenerator = require('../helpers/pathHelper');

/**
 * @function listChildren
 * @description List childrens
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.next] nextLink (or deltaLink returned from last session).
 *
 * @return {Array} Array of changes since last sync. Use nextLink until deltaLink comes up.
 */

function listChildren(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  params.itemId = params.itemId === undefined ? "root" : params.itemId;
  var userPath = userPathGenerator(params);

  var options = {
    method: 'GET',
    uri: params.next ? params.next : appConfig.apiUrl + userPath + 'root/delta',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  return request(options);

}

module.exports = listChildren;
