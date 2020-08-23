// partialDownload.js
var request = require('request');
var getMetadata = require('./getMetadata');

/**
 * @function partialDownload
 * @description partially download item content
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.graphDownloadURL The URL string from `@microsoft.graph.downloadUrl`
 * @param {String} params.itemId item id. If `graphDownloadURL` is provided, this parameter will be ignored
 * @param {Number} params.bytesFrom the starting byte to stream
 * @param {Number} params.bytesTo the ending byte of the stream
 *
 * @return {Promise} A promise with the result is a `Readable stream` with partial item's content
 */

function partialDownload(params) {

	if (!params.accessToken) {
		throw new Error("Missing params.accessToken");
	}

	if (!params.graphDownloadURL && !params.itemId) {
		throw new Error("Missing both params.graphDownloadURL and params.itemId");
	}

	if (!params.bytesFrom) {
		params.bytesFrom = 0;
	}

	if (!params.bytesTo) {
		throw new Error("Missing params.bytesTo");
	}

	var headersRequest = {
		Authorization: "Bearer " + params.accessToken,
		Range: `bytes=${params.bytesFrom}-${params.bytesTo}`,
	};

	var uri = params.graphDownloadURL;
	if (uri) {
		const options = {
			method: 'GET',
			uri: uri,
			headers: headersRequest,
		};
		return Promise.resolve(request(options));
	}

	return getMetadata(params).then(meta => {
		const downloadURL = meta["@microsoft.graph.downloadUrl"];
		if (!downloadURL) {
			throw new Error("Item does not have @microsoft.graph.downloadUrl field")
		}

		var options = {
			method: 'GET',
			uri: downloadURL,
			headers: headersRequest,
		}
		return request(options);
	})
}

module.exports = partialDownload;
