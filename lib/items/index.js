// lib/items/index.js

const listChildren = require("./listChildren"),
  createFolder = require("./createFolder"),
  uploadSimple = require("./uploadSimple"),
  uploadSession = require("./uploadSession"),
  update = require("./update"),
  getMetadata = require("./getMetadata"),
  download = require("./download"),
  partialDownload = require("./partialDownload"),
  sync = require("./sync"),
  customEndpoint = require("./customEndpoint"),
  _delete = require("./delete"),
  thumbnails = require("./thumbnails"),
  preview = require("./preview"),
  createLink = require("./createLink");

module.exports = {
  listChildren: listChildren,
  createFolder: createFolder,
  uploadSimple: uploadSimple,
  uploadSession: uploadSession,
  update: update,
  getMetadata: getMetadata,
  download: download,
  partialDownload: partialDownload,
  sync: sync,
  customEndpoint: customEndpoint,
  delete: _delete,
  thumbnails: thumbnails,
  preview: preview,
  createLink: createLink
};
