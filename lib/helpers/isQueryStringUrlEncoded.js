/**
 * @function isQueryStringUrlEncoded
 * @description Best estimate of checking is query string already encoded
 *
 * @param {String} queryString query string
 *
 * @return {Boolean} isQueryStringUrlEncoded
 */
function isQueryStringUrlEncoded(queryString) {
  if (queryString.indexOf("%") !== -1) {
    return true;
  }
  return queryString === encodeURI(queryString);
}

module.exports = isQueryStringUrlEncoded;
