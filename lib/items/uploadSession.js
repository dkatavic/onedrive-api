// uploadSession.js
const path = require("path");
const {userPathGenerator, itemPathFormatter} = require("../helpers/pathHelper");
const got = import("got");
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
 * @param {('rename'|'fail'|'replace')} [params.conflictBehavior=rename] Determines how to deal with a conflict
 *
 * @return {Promise<Object>} Item
 */
async function uploadSession(params, progress = () => {}) {
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
      appConfig.apiUrl + userPath + itemPathFormatter(path.join(params.parentPath, params.filename)) + "/createUploadSession";
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

  const gotExtend = (await got).got.extend({
    hooks: {
      beforeRequest: gotConfig.beforeRequestHookGot(params.accessToken),
    },
    headers: gotConfig.headerJSON,
    responseType: gotConfig.responseJSON,
    method: "POST",
  });

  if(!(["rename", "fail", "replace"].includes(params.conflictBehavior)))
    params.conflictBehavior =  "rename";

  let urlResponse = await gotExtend(URI, {
    json: {
      "@microsoft.graph.conflictBehavior": params.conflictBehavior,
      fileSystemInfo: { "@odata.type": "microsoft.graph.fileSystemInfo" },
      name: params.filename,
    },
  });

  if (urlResponse.statusCode >= 400) {
    throw new Error(`${urlResponse.statusCode} - Response from server`);
  }
  let uploadResponse;

  return new Promise(function (resolve, reject) {
    params.readableStream.on("data", async function (chunk) {
      chunks.push(chunk);
      chunksToUploadSize += chunk.length;

      // upload only if we've specified number of chunks in memory OR we're uploading the final chunk
      if (chunks.length === params.chunksToUpload || chunksToUploadSize + uploadedBytes === params.fileSize) {
        params.readableStream.pause();
        // make buffer from the chunks
        const payload = Buffer.concat(chunks, chunksToUploadSize);

        const uploadGotExtended = (await got).got.extend({
          method: "PUT",
          headers: {
            "Content-Length": chunksToUploadSize,
            "Content-Range":
              "bytes " + uploadedBytes + "-" + (uploadedBytes + chunksToUploadSize - 1) + "/" + params.fileSize,
          },
          body: payload,
        });

        uploadResponse = await uploadGotExtended(urlResponse.body.uploadUrl);
        if (uploadResponse.statusCode >= 400) {
          params.readableStream.end();
          return reject(uploadResponse.body);
        }

        // update uploaded bytes
        uploadedBytes += chunksToUploadSize;
        if (progress) {
          progress(uploadedBytes);
        }

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
      }
    });
  });
}

module.exports = uploadSession;
