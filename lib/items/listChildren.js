const got = import("got");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const gotConfig = require("../helpers/gotHelper");
const isQueryStringUrlEncoded = require("../helpers/isQueryStringUrlEncoded");

/**
 * @function listChildren
 * @description List childrens
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} [params.itemId=root] Item id
 * @param {String} params.itemPath Item path
 * @param {String} [params.queryParameters] OData system query options.
 * @param {String} [params.query] OData system query options. - Deprecated: Use queryParameters instead for consistency.
 *
 * @return {Promise<Object>} object of children items
 */
async function listChildren(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  params.queryParameters = params.queryParameters || params.query || "";
  const itemAddress = params.itemId ? ("items/" + params.itemId) : (params.itemPath ? itemPathFormatter(params.itemPath) : "items/root")
  const userPath = userPathGenerator(params);

  if (params.queryParameters && !isQueryStringUrlEncoded(params.queryParameters)) {
    console.warn("Query string (" + params.queryParameters + ") doesn't look url encoded. You should url encode query string");
  }
  const URI = appConfig.apiUrl + userPath +  itemAddress + "/children" + params.queryParameters;

  const gotExtend = (await got).got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
    method: "GET",
  });

  const response = await gotExtend(URI);
  return response.body;
}

module.exports = listChildren;
