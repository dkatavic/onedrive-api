// uploadSession.js
const request = require("request-promise");
const path = require("path");
const userPathGenerator = require("../helpers/pathHelper");
const got = require("got");
const gotConfig = require("../helpers/gotHelper");

/**
 * @function uploadSession
 * @description Create file with session upload
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.filename File name
 * @param {String} [params.parentId=root] Parent id
 * @param {String} [params.parentPath] Parent id
 * @param {Object} params.readableStream Readable Stream with file's content
 * @param {Number} params.fileSize Size of file
 * @param {Number} [params.chunksToUpload=20] Number of chunks to upload at a time
 * @param {Function} progress Get uploaded bytes callback
 *
 * @return {Object} Item
 */

function uploadSession(params, progress = () => {}) {
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

  return new Promise(function (resolve, reject) {
    params.parentId = params.parentId === undefined ? "root" : params.parentId;
    var userPath = userPathGenerator(params);

    params.chunksToUpload = params.chunksToUpload === undefined ? 20 : params.chunksToUpload;

    var uri;
    if (params.parentPath !== undefined && typeof params.parentPath === "string") {
      uri =
        appConfig.apiUrl +
        userPath +
        "root:/" +
        path.join(params.parentPath, params.filename) +
        ":/createUploadSession";
    } else if (params.parentId) {
      uri = appConfig.apiUrl + userPath + "items/" + params.parentId + ":/" + params.filename + ":/createUploadSession";
    } else {
      params.parentId = "root";
      uri = appConfig.apiUrl + userPath + params.parentId + ":/" + params.filename + ":/createUploadSession";
    }
    // total uploaded bytes
    var uploadedBytes = 0;
    // size of the chunks that are going to be uploaded
    var chunksToUploadSize = 0;
    // chunks we've accumulated in memory that we're going to upload
    var chunks = [];

    var urlResponse;

    request({
      method: "POST",
      uri,
      headers: {
        Authorization: "Bearer " + params.accessToken,
      },
      body: {
        "@microsoft.graph.conflictBehavior": "rename",
        fileSystemInfo: { "@odata.type": "microsoft.graph.fileSystemInfo" },
        name: params.filename,
      },
      resolveWithFullResponse: true,
      json: true,
    })
      .then(function (_urlResponse) {
        urlResponse = _urlResponse;
        if (urlResponse.statusCode >= 400) {
          return reject(urlResponse.body);
        }
        params.readableStream.on("data", function (chunk) {
          chunks.push(chunk);
          chunksToUploadSize += chunk.length;

          // upload only if we've specified number of chunks in memory OR we're uploading the final chunk
          if (chunks.length === params.chunksToUpload || chunksToUploadSize + uploadedBytes === params.fileSize) {
            params.readableStream.pause();
            // make buffer from the chunks
            var payload = Buffer.concat(chunks, chunksToUploadSize);
            var uploadResponse;
            request({
              method: "PUT",
              uri: urlResponse.body.uploadUrl,
              headers: {
                "Content-Length": chunksToUploadSize,
                "Content-Range":
                  "bytes " + uploadedBytes + "-" + (uploadedBytes + chunksToUploadSize - 1) + "/" + params.fileSize,
              },
              body: payload,
              resolveWithFullResponse: true,
            })
              .then(function (_uploadResponse) {
                uploadResponse = _uploadResponse;
                if (uploadResponse.statusCode >= 400) {
                  return reject(uploadResponse.body);
                }

                // update uploaded bytes
                uploadedBytes += chunksToUploadSize;
                progress(uploadedBytes);

                // reset for next chunks
                chunks = [];
                chunksToUploadSize = 0;

                if (
                  uploadResponse.statusCode === 201 ||
                  uploadResponse.statusCode === 203 ||
                  uploadResponse.statusCode === 200
                ) {
                  resolve(JSON.parse(uploadResponse.body));
                }
                params.readableStream.resume();
              })
              .catch(reject);
          }
        });
      })
      .catch(reject);
  });
}

async function got_uploadSession(params, progress = () => {}) {
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

  params.parentId = params.parentId === undefined ? "root" : params.parentId;
  const userPath = userPathGenerator(params);
  params.chunksToUpload = params.chunksToUpload === undefined ? 20 : params.chunksToUpload;

  let URI;
  if (params.parentPath !== undefined && typeof params.parentPath === "string") {
    URI =
      appConfig.apiUrl + userPath + "root:/" + path.join(params.parentPath, params.filename) + ":/createUploadSession";
  } else if (params.parentId) {
    URI = appConfig.apiUrl + userPath + "items/" + params.parentId + ":/" + params.filename + ":/createUploadSession";
  } else {
    params.parentId = "root";
    URI = appConfig.apiUrl + userPath + params.parentId + ":/" + params.filename + ":/createUploadSession";
  }

  // total uploaded bytes
  let uploadedBytes = 0;
  // size of the chunks that are going to be uploaded
  let chunksToUploadSize = 0;
  // chunks we've accumulated in memory that we're going to upload
  let chunks = [];

  let urlResponse;

  const gotExtend = got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
    method: "POST",
  });
  
  return new Promise(function (resolve, reject) {
    request({
      method: "POST",
      uri: URI,
      headers: {
        Authorization: "Bearer " + params.accessToken,
      },
      body: {
        "@microsoft.graph.conflictBehavior": "rename",
        fileSystemInfo: { "@odata.type": "microsoft.graph.fileSystemInfo" },
        name: params.filename,
      },
      resolveWithFullResponse: true,
      json: true,
    })
      .then(function (_urlResponse) {
        urlResponse = _urlResponse;
        if (urlResponse.statusCode >= 400) {
          return reject(urlResponse.body);
        }
        params.readableStream.on("data", function (chunk) {
          chunks.push(chunk);
          chunksToUploadSize += chunk.length;

          // upload only if we've specified number of chunks in memory OR we're uploading the final chunk
          if (chunks.length === params.chunksToUpload || chunksToUploadSize + uploadedBytes === params.fileSize) {
            params.readableStream.pause();
            // make buffer from the chunks
            var payload = Buffer.concat(chunks, chunksToUploadSize);
            var uploadResponse;
            request({
              method: "PUT",
              uri: urlResponse.body.uploadUrl,
              headers: {
                "Content-Length": chunksToUploadSize,
                "Content-Range":
                  "bytes " + uploadedBytes + "-" + (uploadedBytes + chunksToUploadSize - 1) + "/" + params.fileSize,
              },
              body: payload,
              resolveWithFullResponse: true,
            })
              .then(function (_uploadResponse) {
                uploadResponse = _uploadResponse;
                if (uploadResponse.statusCode >= 400) {
                  return reject(uploadResponse.body);
                }

                // update uploaded bytes
                uploadedBytes += chunksToUploadSize;
                progress(uploadedBytes);

                // reset for next chunks
                chunks = [];
                chunksToUploadSize = 0;

                if (
                  uploadResponse.statusCode === 201 ||
                  uploadResponse.statusCode === 203 ||
                  uploadResponse.statusCode === 200
                ) {
                  resolve(JSON.parse(uploadResponse.body));
                }
                params.readableStream.resume();
              })
              .catch(reject);
          }
        });
      })
      .catch(reject);
  });
}

module.exports = uploadSession;
