const gotConfig = require("../helpers/gotHelper");
const got = import("got");

/**
 * @function customEndpoint
 * @description Custom Endpoint
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.url Ex. 'groups/{groupId}/drives'
 * @param {Object} [params.body] Request body
 * @param {Object} [params.method] Request method
 *
 * @return {Promise<Object>} any
 */
async function customEndpoint(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.url) {
    throw new Error("Missing params.url");
  }

  const uri = appConfig.apiUrl + params.url;
  const extendConfig = {
    method: params.method || "POST",
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
  };

  if (params.body) extendConfig.body = params.body;
  const gotExtend = (await got).got.extend(extendConfig);

  const response = await gotExtend(uri);
  return response.body;
}

module.exports = customEndpoint;
