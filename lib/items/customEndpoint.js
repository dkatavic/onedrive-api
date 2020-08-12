var request = require('request-promise');

/**
 * @function customEndpoint
 * @description Custom Endpoint
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.url Ex. 'groups/{groupId}/drives'
 * @param {Object} [params.body] Request body
 *
 * @return {Object} any
 */

function customEndpoint(params) {

  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }
  
  if (!params.url) {
    throw new Error("Missing params.url");
  }

  var options = {
    method: 'POST',
    uri: appConfig.apiUrl + params.url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + params.accessToken
    },
    json: true
  };

  if (params.body) options.body = params.body

  return request(options);
  
}

module.exports = customEndpoint;
