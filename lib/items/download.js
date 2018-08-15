// download.js
var request = require('request');
var userPathGenerator = require('../helpers/pathHelper');

/**
 * @function download
 * @description Download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.itemId item id
 *
 * @return {Object} Readable stream with item's content
 */

function download(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }
  
  if (!params.itemId) {
    throw new Error("Missing params.itemId");
  }


  var userPath = userPathGenerator(params);
  
  var options = {
    method: 'GET',
    uri: appConfig.apiUrl + userPath + 'drive/items/' + params.itemId + "/content",
    headers: {
      Authorization: "Bearer " + params.accessToken
    },
  };
  
  return request(options);
  
}

module.exports = download;
