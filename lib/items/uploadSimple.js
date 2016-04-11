// uploadSimple.js
var request = require('request');

/**
 * @function uploadSimple
 * @description Delete item (file or folder)
 *
 * @params {Object} params
 * @params {String} params.accessToken OneDrive access token
 * @params {String} params.filename File name
 * @params {String} [params.parentId=root] Parent id
 * @params {Object} params.readableStream
 *
 * @return {Object} Item
 */

function uploadSimple(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }
  
  if (!params.filename) {
    throw new Error("Missing params.filename");
  }
  
  if (!params.readableStream) {
    throw new Error("Missing params.readableStream");
  }
  
  return new Promise(function(resolve, reject){
    
    params.parentId = params.parentId === undefined ? "root" : params.parentId;

    var options = {
      method: 'PUT',
      uri: appConfig.apiUrl + 'drive/items/' + params.parentId + "/children/" + params.filename + "/content",
      headers: {
        "Content-Type": "text/plain",
        Authorization: "Bearer " + params.accessToken
      },
      body: params.readableStream,
      json: true
    };

    request(options, function (err, res, body){
      
      if (err)
        return reject(err);
      else if (res.statusCode >= 400)
        return reject(body);
      resolve(body);
    });
  });
  
}

module.exports = uploadSimple;
