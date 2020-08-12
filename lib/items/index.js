// lib/items/index.js  

var listChildren = require('./listChildren'),
    createFolder = require('./createFolder'),
    uploadSimple = require('./uploadSimple'),
    uploadSession = require('./uploadSession'),
    update = require('./update'),
    getMetadata = require('./getMetadata'),
    download = require('./download'),
    sync = require('./sync'),
    customEndpoint = require('./customEndpoint'),
    _delete = require('./delete');

module.exports = {
  
  listChildren: listChildren,
  createFolder: createFolder,
  uploadSimple: uploadSimple,
  uploadSession: uploadSession,
  update: update,
  getMetadata: getMetadata,
  download: download,
  sync: sync,
  customEndpoint: customEndpoint,
  delete: _delete
  
};
