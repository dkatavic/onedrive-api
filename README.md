# onedrive-api

[![CircleCI](https://circleci.com/gh/dkatavic/onedrive-api/tree/master.svg?style=svg&circle-token=0410ac864820f55930f276a46fa955a788b03eee)](https://circleci.com/gh/dkatavic/onedrive-api/tree/master)

OneDrive API module for NodeJS. This module handels operations with OneDrive API. For authenticating with OneDrive, we suggest using OS solutions like [simple-oauth2](https://github.com/lelylan/simple-oauth2). We are accepting pull requests for any missing features

# Install

```sh
npm install onedrive-api
```

# API

### Items

- [createFolder](#itemscreatefolder)
- [createLink](#itemscreatelink)
- [customEndpoint](#itemscustomendpoint)
- [delete](#itemsdelete)
- [download](#itemsdownload)
- [partialDownload](#itemspartialdownload)
- [getMetadata](#itemsgetmetadata)
- [listChildren](#itemslistchildren)
- [preview](#itemspreview)
- [sync](#itemssync)
- [thumbnails](#itemsthumbnails)
- [update](#itemsupdate)
- [uploadSimple](#itemsuploadsimple)
- [uploadSession](#itemsuploadsession)

# Examples

### Require module

```javascript
// JavaScript
const oneDriveAPI = require("onedrive-api")

// TypeScript
import oneDriveAPI from "onedrive-api";
```

```javascript
oneDriveAPI.items
  .listChildren({
    accessToken: accessToken,
    itemId: "root",
    drive: "me", // 'me' | 'user' | 'drive' | 'group' | 'site'
    driveId: "", // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
  })
  .then((childrens) => {
    // list all children of given root directory
    //
    // console.log(childrens);
    // returns body of https://dev.onedrive.com/items/list.htm#response
  });
```

### items.createFolder

Create Folder

**Returns**: <code>Promise\<Object></code> - folder meta object

| Param              | Type                | Default           | Description                                                                                     |
|--------------------| ------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| params             | <code>Object</code> |                   |                                                                                                 |
| params.accessToken | <code>String</code> |                   | OneDrive access token                                                                           |
| [params.itemId]    | <code>String</code> | <code>root</code> | Item id                                                                                         |
| params.itemPath    | <code>String</code> |                   | Item path (ignored if `itemId` is set)                                                          |
| params.name        | <code>String</code> |                   | New folder name                                                                                 |
| params.drive       | <code>String</code> | `'me'`            | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined`       | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |

```javascript
oneDriveAPI.items
  .createFolder({
    accessToken: accessToken,
    rootItemId: "root",
    name: "Folder name",
  })
  .then((item) => {
    // console.log(item)
    // returns body of https://dev.onedrive.com/items/create.htm#response
  });
```

### items.createLink

Get long-lived embeddable sharing-link

**Returns**: <code>Promise\<Object></code> - Items sharing link object

| Param              | Type                | Default     | Description                                                                                     |
|--------------------|---------------------|-------------|-------------------------------------------------------------------------------------------------|
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.itemId      | <code>String</code> |             | Item id                                                                                         |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| params.type        | <code>String</code> | `embed`     | The type of sharing link. Either `view`, `edit` or `embed`.                                     |
| params.body        | <code>Object</code> |             | Request body                                                                                    |

```javascript
oneDriveAPI.items
  .createLink({
    accessToken: accessToken,
    itemId: createdFile.id,
    type: "view",
    body: {
        password: "123"
    }
  })
  .then((linkObject) => {
    // console.log(linkObject);
  });
```

### items.customEndpoint

Call custom endpoint with JSON response.

**Returns**: <code>Promise\<Object></code> - JSON object.

| Param              | Type                | Description                                 |               |
| ------------------ | ------------------- | ------------------------------------------- | ------------- |
| params             | <code>Object</code> |                                             |               |
| params.accessToken | <code>String</code> | OneDrive access token                       |               |
| params.url         | <code>String</code> | Endpoint url. Ex. 'groups/{groupId}/drives' |               |
| params.body        | <code>Object</code> | <code>false</code>                          | Optional body |
| params.method      | <code>String</code> | Optional method                             |               |

```javascript
oneDriveAPI.items
  .customEndpoint({
    accessToken: accessToken,
    url: "me/drive/special/cameraroll",
    // method: 'GET'
    // body: {}
  })
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log(e);
  });
```

### items.delete

Delete item (file or folder)

**Returns**: <code>Promise\<void></code> - The promise will throw [HttpError](https://www.npmjs.com/package/got#errors) if the delete API fail.

| Param              | Type                | Default     | Description                                                                                     |
| ------------------ | ------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemId      | <code>String</code> |             | Item id                                                                                         |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |

```javascript
oneDriveAPI.items
  .delete({
    accessToken: accessToken,
    itemId: createdFolder.id,
  })
  .then(() => {
    // file is deleted
  })
  .catch((error) => {
    // error.response.statusCode => error code
    // error.response.statusMessage => error message
  });
```

### items.download

Download item content

**Returns**: <code>Promise<ReadableStream></code> - A promise with the result being a `Readable stream` with item's content

| Param              | Type                | Default     | Description                                                                                     |
|--------------------| ------------------- | ----------- |-------------------------------------------------------------------------------------------------|
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemId      | <code>String</code> |             | item id                                                                                         |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| params.format      | <code>String</code> | `undefined` | Converts the content to specified format. Format options: `'glb'`/`'html'`/`'jpg'`/`'pdf'`      |

```javascript
const promise = oneDriveAPI.items.download({
  accessToken: accessToken,
  itemPath: 'path/to/file/file.pdf',
});
promise.then((fileStream) => fileStream.pipe(SomeWritableStream));
```

### items.partialDownload

Download item content partially. You must either provide `graphDownloadURL` or the `itemId` to download the file.

If only the `itemId` is provided, the function will try to get the download URL for you with additional `getMetadata()` function call.

**Returns**: <code>Promise\<ReadableStream></code> - A promise with the result is a `Readable stream` with partial item's content

| Param                   | Type                | Default     | Description                                                                                                                                                                             |
| ----------------------- | ------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params                  | <code>Object</code> |             |                                                                                                                                                                                         |
| params.accessToken      | <code>String</code> |             | OneDrive access token                                                                                                                                                                   |
| params.graphDownloadURL | <code>String</code> |             | `@microsoft.graph.downloadUrl` of the item                                                                                                                                              |
| params.itemId           | <code>String</code> |             | item id. This parameter will be skipped if `graphDownloadURL` is provided.                                                                                                              |
| params.itemPath         | <code>String</code> |             | Item path (ignored if `itemId` or `graphDownloadURL` is set)                                                                                                                            |
| params.bytesFrom        | <code>Number</code> | `0`         | Starting download byte.                                                                                                                                                                 |
| params.bytesTo          | <code>Number</code> |             | Ending byte to download. Must be set                                                                                                                                                    |
| params.drive            | <code>String</code> | `'me'`      | Only be used if only `params.itemId` is set and `params.graphDownloadURL` is undefined. If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId          | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.                                                                                                       |

```javascript
const partialPromise = oneDriveAPI.items.partialDownload({
  accessToken: accessToken,
  bytesFrom: 0, // start byte
  bytesTo: 1034, // to byte
  graphDownloadURL: createdItem["@microsoft.graph.downloadUrl"],
  // optional params
  itemId: createdItem.id, // only be used when `graphDownloadURL` is NOT provided
  drive: "me", // only be used when only `itemId` is provided
  driveId: "me", // only be required when `drive` is provided
});
partialPromise.then((fileStream) => fileStream.pipe(SomeWritableStream));
```


### items.getMetadata

Get items metadata (file or folder)

**Returns**: <code>Promise\<Object></code> - Item's metadata

| Param              | Type                | Default     | Description                                                                                     |
| ------------------ | ------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.itemId      | <code>String</code> |             | Item id                                                                                         |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |

```javascript
oneDriveAPI.items
  .getMetadata({
    accessToken: accessToken,
    itemId: createdFolder.id,
  })
  .then((item) => {
    // console.log(item);
    // returns body of https://dev.onedrive.com/items/update.htm#response
  });
```

### items.listChildren

List childrens

**Returns**: <code>Promise\<Object></code> - object of children items

| Param                  | Type                | Default           | Description                                                                                     |
|------------------------| ------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| params                 | <code>Object</code> |                   |                                                                                                 |
| params.accessToken     | <code>String</code> |                   | OneDrive access token                                                                           |
| [params.itemId]        | <code>String</code> | <code>root</code> | Item id                                                                                         |
| params.itemPath        | <code>String</code> |                   | Item path (ignored if `itemId` is set)                                                          |
| params.drive           | <code>String</code> | `'me'`            | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId         | <code>String</code> | `undefined`       | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| params.queryParameters | <code>String</code> | `undefined`       | OData system query options.                                                                     |

```javascript
oneDriveAPI.items
  .listChildren({
    accessToken: accessToken,
    itemId: createdFolder.id,
    query: "?$filter=createdDateTime le 2020-07-07T12:56:51.577Z",
  })
  .then((childrens) => {
    // console.log(childrens);
    // returns body of https://dev.onedrive.com/items/list.htm#response
  });
```

### items.preview

Create short-lived embeddable preview url

**Returns**: <code>Promise\<Object></code> - object with embeddable url

| Param              | Type                | Default     | Description                                                                                     |
|--------------------|---------------------|-------------|-------------------------------------------------------------------------------------------------|
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.itemId      | <code>String</code> |             | Item id                                                                                         |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| params.body        | <code>Object</code> |             | Request body                                                                                    |

```javascript
oneDriveAPI.items
  .preview({
    accessToken: accessToken,
    itemId: createdFile.id,
    body: {
        zoom: 1
    }
  })
  .then((urlObject) => {
    // console.log(urlObject);
  });
```

### items.sync

Sync changes

**Returns**: <code>Promise\<Object></code> - Object represent the changes since last sync

| Param              | Type                | Description                                         |
| ------------------ | ------------------- | --------------------------------------------------- |
| params             | <code>Object</code> |                                                     |
| params.accessToken | <code>String</code> | OneDrive access token                               |
| params.next        | <code>String</code> | nextLink (or deltaLink returned from last session). |

```javascript
oneDriveAPI.items
  .sync({
    accessToken: accessToken,
    next: "https://graph.microsoft.com/v1.0/me/drive/delta(token=1230919asd190410jlka)",
  })
  .then((item) => {
    // console.log(item);
    // returns body of https://docs.microsoft.com/nb-no/onedrive/developer/rest-api/api/driveitem_delta?view=odsp-graph-online#response
  });
```

### items.thumbnails

Retrieve thumbnails for an item

**Returns**: <code>Promise\<Object></code> - object with thumbnail urls

| Param                  | Type                | Default     | Description                                                                                     |
|------------------------|---------------------|-------------|-------------------------------------------------------------------------------------------------|
| params                 | <code>Object</code> |             |                                                                                                 |
| params.accessToken     | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemPath        | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.itemId          | <code>String</code> |             | Item id                                                                                         |
| params.drive           | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId         | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| params.queryParameters | <code>String</code> |             | OData query parameters                                                                          |

```javascript
oneDriveAPI.items
  .preview({
    accessToken: accessToken,
    itemId: createdFile.id
  })
  .then((thumbnailsObject) => {
    // console.log(thumbnailsObject);
  });
```

### items.update

Update item metadata

**Returns**: <code>Promise\<Object></code> - Item meta object

| Param              | Type                | Default     | Description                                                                                     |
| ------------------ | ------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| params             | <code>Object</code> |             |                                                                                                 |
| params.accessToken | <code>String</code> |             | OneDrive access token                                                                           |
| params.itemId      | <code>String</code> |             | Item id                                                                                         |
| params.itemPath    | <code>String</code> |             | Item path (ignored if `itemId` is set)                                                          |
| params.toUpdate    | <code>Object</code> |             | Object to update                                                                                |
| params.drive       | <code>String</code> | `'me'`      | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId     | <code>String</code> | `undefined` | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |

```javascript
oneDriveAPI.items
  .update({
    accessToken: accessToken,
    itemId: createdFolder.id,
    toUpdate: {
      name: "newFolderName",
    },
  })
  .then((item) => {
    // console.log(item);
    // returns body of https://dev.onedrive.com/items/update.htm#response
  });
```

### items.uploadSimple

Create file with simple upload

**Returns**: <code>Promise\<Object></code> - Item

| Param                 | Type                | Default           | Description                                                                                     |
| --------------------- | ------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| params                | <code>Object</code> |                   |                                                                                                 |
| params.accessToken    | <code>String</code> |                   | OneDrive access token                                                                           |
| params.filename       | <code>String</code> |                   | File name                                                                                       |
| [params.parentId]     | <code>String</code> | <code>root</code> | Parent id                                                                                       |
| [params.parentPath]   | <code>String</code> |                   | Parent path (if parentPath is defined, than parentId is ignored)                                |
| params.readableStream | <code>Object</code> |                   | Readable Stream with file's content                                                             |
| params.drive          | <code>String</code> | `'me'`            | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId        | <code>String</code> | `undefined`       | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |

```javascript
oneDriveAPI.items
  .uploadSimple({
    accessToken: accessToken,
    filename: filename,
    readableStream: readableStream,
  })
  .then((item) => {
    // console.log(item);
    // returns body of https://dev.onedrive.com/items/upload_put.htm#response
  });
```

### items.uploadSession

Create a file with session upload. Use this for the files over 4MB. This is a synchronous wrapper around asynchronous method, which means that on the failed upload you can't resume the upload but need to retry the implementation. I am accepting PRs for asynchronous implementation.

**Returns**: <code>Promise\<Object></code> - Item

| Param                   | Type                  | Default           | Description                                                                                     |
| ----------------------- | --------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| params                  | <code>Object</code>   |                   |                                                                                                 |
| params.accessToken      | <code>String</code>   |                   | OneDrive access token                                                                           |
| params.filename         | <code>String</code>   |                   | File name                                                                                       |
| params.fileSize         | <code>Number</code>   |                   | Size of the file                                                                                |
| [params.parentId]       | <code>String</code>   | <code>root</code> | Parent id                                                                                       |
| [params.parentPath]     | <code>String</code>   |                   | Parent path (if parentPath is defined, than parentId is ignored)                                |
| params.readableStream   | <code>Object</code>   |                   | Readable Stream with file's content                                                             |
| params.drive            | <code>string</code>   | `'me'`            | If it's set to be either `'user'`/`'drive'`/`'group'`/`'site'`, `params.driveId` has to be set. |
| params.driveId          | <code>String</code>   | `undefined`       | The id of the drive that was shared to you. Must be set if `params.drive` is set.               |
| [params.chunksToUpload] | <code>Number</code>   | <code>20</code>   | Chunks to upload per request. More chunks per request requires more RAM                         |
| process                 | <code>function</code> |                   | A callback emit a variable represent the bytes that were transferred                            |

```javascript
oneDriveAPI.items
  .uploadSession(
    {
      accessToken: accessToken,
      filename: filename,
      fileSize: fileSize,
      readableStream: readableStream,
    },
    (bytesUploaded) => {
      console.log(bytesUploaded);
    },
  )
  .then((item) => {
    // console.log(item);
    // returns body of https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_createuploadsession?view=odsp-graph-online#http-response
  });
```

## [Changelog](./CHANGELOG.md)
