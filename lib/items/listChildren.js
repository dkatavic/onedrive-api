var request = require('request-promise');
var userPathGenerator = require('../helpers/pathHelper');

/**
 * @function listChildren
 * @description List childrens
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.itemId=root] Item id
 * @param {Boolean} [params.shared] A flag to indicated whether this files is owned by the user or shared from another user. If true params.user has to be set.
 * @param {String} [params.user] The user who shared the file. Must be set if params.shared is true.
 *
 * @return {Array} object of children items
 */

function listChildren(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  params.itemId = params.itemId === undefined ? "root" : params.itemId;
  var userPath = userPathGenerator(params);

  var options = {
    method: 'GET',
    uri: appConfig.apiUrl + userPath + 'drive/items/' + params.itemId + '/children',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  return request(options);

}

module.exports = listChildren;
