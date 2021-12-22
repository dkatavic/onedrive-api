# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.2]

- Correct [wrong warning syntax](https://github.com/dkatavic/onedrive-api/issues/42).

## [1.0.1]

- Handle OData special charachters in the filename `'` and `(`

## [1.0.0]

- Migrate to `got` since `request` [was deprecated](https://github.com/request/request/issues/3142). See more reason on this migration [here](https://github.com/dkatavic/onedrive-api/issues/30).
- Update `mocha` version and test cases to cover all API.

### Breaking

- Only support NodeJS version `10.x` or greater.
- All APIs are now implement with `promise`/`async` except `download()` API - it returns a `ReadableStream`. Other APIs should be used with `async/await`.
- `delete()` API now return `boolean` value instead. `true` for deleting successfully.
- Failure requests now should be handled with `try/catch`.

## [0.5.0]

- Added new api: `partialDownload()`.
- Fixing `README.md`: Change `share` and `user` in `params` => `drive` and `driveId` according to `v0.4.0`

## [0.4.0]

- Added progress callback to uploadSession
- Added option to use any drive (me, users, groups, drives, sites)
- Added option to call custom endpoints. Ex. '/groups/{groupId}/drives'

## [0.3.2]

- Added sync endpoint

## [0.3.1]

- Fixed uploadSession with provided `parentPath` parameter

## [0.3.0]

- Added `oneDrive.items.uploadSession` function for uploading large files

## [0.2.1]

- Resolved package vulnerabilities

## [0.2.0]

### Added

- Support for accessing shared files

## [0.1.0]

### Breaking

- Since version 0.1 this repo is using `graph.microsoft.com` API instead of `api.onedrive.com` to support enterprise accounts too. You should verify that you are authorizing against `graph.microsoft.com`. All of the API's are working indentically
