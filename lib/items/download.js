// download.js
var request = require('request');

/**
 * @function download
 * @description Download item content
 *
 * @params {Object} params
 * @params {String} params.accessToken OneDrive access token
 * @params {String} params.itemId item id
 *
 * @return {Object} Item
 */

function download(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }
  
  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }
  
  var options = {
    method: 'GET',
    uri: appConfig.apiUrl + 'drive/items/' + params.itemId + "/content",
    headers: {
      Authorization: "Bearer " + params.accessToken
    },
  };
  
  return request(options);
  
}

module.exports = download;
