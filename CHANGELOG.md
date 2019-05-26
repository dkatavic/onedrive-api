# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
