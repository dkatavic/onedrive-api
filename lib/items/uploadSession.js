// uploadSimple.js
var request = require('request');
var path = require('path');
var fs = require('fs');
var async = require('async');

/**
 * @function uploadSimple
 * @description Create file with simple upload
 *
 * @param {Object} params
 * @param {String} params.accessToken OneDrive access token
 * @param {String} params.filename File name
 * @param {String} [params.parentId=root] Parent id
 * @param {Object} params.filePath Files absolute path
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

  if (!params.filePath) {
    throw new Error("Missing params.filePath");
  }

  /*return new Promise(function(resolve, reject){

    params.parentId = params.parentId === undefined ? "root" : params.parentId;

    var uri = appConfig.apiUrl + 'drive/items/' + params.parentId + "/children/" + params.filename + "/content";

    if (params.parentPath !== undefined && typeof(params.parentPath) === 'string')
      uri = appConfig.apiUrl + 'drive/root:/' + path.join(params.parentPath, params.filename) + ":/content";

    var options = {
      method: 'PUT',
      uri: uri,
      headers: {
        Authorization: "Bearer " + params.accessToken
      },
      json: true
    };

    params.readableStream.pipe(request(options, function (err, res, body){

      if (err)
        return reject(err);
      else if (res.statusCode >= 400)
        return reject(body);
      resolve(body);

    }));
  });*/

  return new Promise(function(resolve, reject){

    params.parentId = params.parentId === undefined ? "root" : params.parentId;
    var uri = appConfig.apiUrl + 'drive/items/' + params.parentId + "/children/" + params.filename + "/createUploadSession";
    if (params.parentPath !== undefined && typeof(params.parentPath) === 'string')
    uri = appConfig.apiUrl + 'drive/root:/' + path.join(params.parentPath, params.filename) + ":/createUploadSession";

    request.post({
      url: uri,
      headers: {
        'Authorization': "Bearer " + params.accessToken,
        'Content-Type': "application/json",
      },
      body: '{"item": {"@microsoft.graph.conflictBehavior": "rename", "name": "' + params.filename '"}}',
    }, function(er, re, bo) {
      uploadFile(JSON.parse(bo).uploadUrl, params.filePath); //modify for resolve, reject callback
    });
  });
}

function uploadFile(uploadUrl, filePath) { // Here, it uploads the file by every chunk.
    async.eachSeries(getparams(filePath), function(st, callback){
        setTimeout(function() {
            fs.readFile(filePath, function read(e, f) {
                request.put({
                    url: uploadUrl,
                    headers: {
                        'Content-Length': st.clen,
                        'Content-Range': st.cr,
                    },
                    body: f.slice(st.bstart, st.bend + 1),
                }, function(er, re, bo) {//resolve, reject callback call goes here (still need to implement)
                    console.log(bo);
                });
            });
            callback();
        }, st.stime);
    });
}

function getparams(filePath){
    var allsize = fs.statSync(filePath).size;
    var sep = allsize < (60 * 1024 * 1024) ? allsize : (60 * 1024 * 1024) - 1;
    var ar = [];
    for (var i = 0; i < allsize; i += sep) {
        var bstart = i;
        var bend = i + sep - 1 < allsize ? i + sep - 1 : allsize - 1;
        var cr = 'bytes ' + bstart + '-' + bend + '/' + allsize;
        var clen = bend != allsize - 1 ? sep : allsize - i;
        var stime = allsize < (60 * 1024 * 1024) ? 5000 : 10000;
        ar.push({
            bstart : bstart,
            bend : bend,
            cr : cr,
            clen : clen,
            stime: stime,
        });
    }
    return ar;
}

module.exports = uploadSimple;
