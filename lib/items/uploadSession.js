// uploadSession.js
var request = require("request-promise");
var path = require("path");
var userPathGenerator = require("../helpers/pathHelper");

/**
 * @function uploadSession
 * @description Create file with session upload
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.filename File name
 * @param {String} [params.parentId=root] Parent id
 * @param {Object} params.readableStream Readable Stream with file's content
 * @param {Number} params.fileSize Size of file
 * @param {Number} [params.chunksToUpload=20] Number of chunks to upload at a time
 *
 * @return {Object} Item
 */

function uploadSession(params) {
  if (!params.accessToken) {
    throw new Error("Missing params.accessToken");
  }

  if (!params.filename) {
    throw new Error("Missing params.filename");
  }

  if (!params.readableStream) {
    throw new Error("Missing params.readableStream");
  }

  if (!params.fileSize) {
    throw new Error("Missing params.fileSize");
  }

  return new Promise(async (resolve, reject) => {
    params.parentId = params.parentId === undefined ? 'root' : params.parentId;
    var userPath = userPathGenerator(params);

    params.chunksToUpload = params.chunksToUpload === undefined ? 20 : params.chunksToUpload;

    var uri
    if (params.parentPath !== undefined && typeof params.parentPath === "string") {
      uri = appConfig.apiUrl + userPath + ' drive/root:/' + params.parentPath + ':/createUploadSession';
    } else if (params.parentId) {
      uri = appConfig.apiUrl + userPath + 'drive/items/' + params.parentId + ':/' + params.filename + ':/createUploadSession';
    } else {
      params.parentId = "root";
      uri = appConfig.apiUrl + userPath + 'drive/' + params.parentId + ':/' + params.filename + ':/createUploadSession';
    }

    var uploadedBytes = 0;
    var chunksToUploadSize = 0;
    var chunksToUpload = [];

    var urlResponse;
    try {
      urlResponse = await request({
        method: "POST",
        uri,
        headers: {
          Authorization: `Bearer ${params.accessToken}`
        },
        body: {
          "@microsoft.graph.conflictBehavior": "rename",
          fileSystemInfo: { "@odata.type": "microsoft.graph.fileSystemInfo" },
          name: params.filename
        },
        resolveWithFullResponse: true,
        json: true
      });
    } catch (err) {
      reject(err);
    }
    if (urlResponse.statusCode >= 400) {
      return reject(urlResponse.body);
    }

    params.readableStream.on("data", async chunk => {
      chunksToUpload.push(chunk);
      chunksToUploadSize += chunk.length;

      // upload only if we've 20 chunks in memory OR we're uploading the final chunk
      if (chunksToUpload.length === params.chunksToUpload || chunksToUploadSize + uploadedBytes === params.fileSize) {
        params.readableStream.pause();
        // make buffer from the chunks
        var data = Buffer.concat(chunksToUpload, chunksToUploadSize);

        var uploadResponse = await request({
          method: "PUT",
          uri: urlResponse.body.uploadUrl,
          headers: {
            "Content-Length": chunksToUploadSize,
            "Content-Range": 'bytes ' + uploadedBytes + '-' + (uploadedBytes + chunksToUploadSize - 1) + '/' + params.fileSize
          },
          body: data,
          resolveWithFullResponse: true
        }).catch(e => {
          return reject(e);
        });

        if (uploadResponse.statusCode >= 400) {
          return reject(uploadResponse.body);
        }

        // reset for next chunks
        uploadedBytes += chunksToUploadSize;
        chunksToUpload = [];
        chunksToUploadSize = 0;

        if (
          uploadResponse.statusCode === 201 ||
          uploadResponse.statusCode === 203 ||
          uploadResponse.statusCode === 200
        ) {
          resolve(JSON.parse(uploadResponse.body));
        }
        params.readableStream.resume();
      }
    });
  });
}

module.exports = uploadSession;
