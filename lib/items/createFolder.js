var request = require('request-promise');

/**
 * @function createFolder
 * @description Create Folder
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.itemId=root] Item id
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

  params.itemId = params.itemId === undefined ? "root" : params.itemId;

  var options = {
    method: 'POST',
    uri: appConfig.apiUrl + 'drive/items/' + params.itemId + '/children',
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
