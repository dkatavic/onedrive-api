var request = require('request-promise');
var userPathGenerator = require('../helpers/pathHelper');

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
    method: 'POST',
    uri: appConfig.apiUrl + userPath + 'drive/items/' + params.rootItemId + '/children',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    body: {
      name: params.name,
      folder: {}
    },
    json: true
  };

  return request(options);
  
}

module.exports = createFolder;
