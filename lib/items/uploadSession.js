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
 * @param {String} params.filePath Files absolute path
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

  return new Promise(function(resolve, reject){

    params.parentId = params.parentId === undefined ? "root" : params.parentId;
    var uri = appConfig.apiUrl + 'drive/items/' + params.parentId + ":/" + params.filename + ":/createUploadSession";
    if (params.parentPath !== undefined && typeof(params.parentPath) === 'string')
      uri = appConfig.apiUrl + 'drive/root:/' + path.join(params.parentPath, params.filename) + ":/createUploadSession";

    request.post({
      url: uri,
      headers: {
        'Authorization': "Bearer " + params.accessToken,
        'Content-Type': "application/json",
      },
      body: '{"item": {"@microsoft.graph.conflictBehavior": "rename", "name": "' + params.filename + '"}}',
    }, function(err, res, bo) {
      if(err)
        return reject(err);
      async.eachSeries(getparams(params.filePath), function(st, callback){
          setTimeout(function() {
              fs.readFile(params.filePath, function read(e, f) {
                  request.put({
                      url: JSON.parse(bo).uploadUrl,
                      headers: {
                          'Content-Length': st.clen,
                          'Content-Range': st.cr,
                      },
                      body: f.slice(st.bstart, st.bend + 1),
                  }, function(err, res, body) {
                    if(err)
                      return reject(err);
                    if(res.statusCode == 201 || res.statusCode == 200)
                      resolve(body);
                  });
              });
              callback();
          }, st.stime);
      });
    });
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

module.exports = uploadSession;
