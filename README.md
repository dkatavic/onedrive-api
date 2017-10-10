# onedrive-api

[![CircleCI](https://circleci.com/gh/dkatavic/onedrive-api/tree/master.svg?style=svg&circle-token=0410ac864820f55930f276a46fa955a788b03eee)](https://circleci.com/gh/dkatavic/onedrive-api/tree/master)

OneDrive API module for Node.js. It's built with pure functional programing, there are no unnecessary objects.

It's built for internal project so it supports only basic CRUD operations needed for project (for now). I will accept any pull requests.

### Breaking change from 0.1

- Since version 0.1 this repo is using `graph.microsoft.com` API instead of `api.onedrive.com` to support enterprise accounts too. You should verify that you are authorizing against `graph.microsoft.com`. All of the API's are working indentically

# Install

```sh
npm install onedrive-api
```

# API

### Items

  - [createFolder](#itemscreatefolder)
  - [delete](#itemsdelete)
  - [download](#itemsdownload)
  - [getMetadata](#itemsgetmetadata)
  - [listChildren](#itemslistchildren)
  - [update](#itemsupdate)
  - [uploadSimple](#itemsuploadsimple)

# Examples

### Require module

```javascript
var oneDriveAPI = require('onedrive-api');
```
  
### items.createFolder

Create Folder

**Returns**: <code>Object</code> - folder object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  |  |
| params.accessToken | <code>String</code> |  | OneDrive access token |
| [params.rootItemId] | <code>String</code> | <code>root</code> | Item id |
| params.name | <code>String</code> |  | New folder name |


```javascript
oneDriveAPI.items.createFolder({
  accessToken: accessToken,
  rootItemId: "root",
  name: "Folder name"
}).then((item) => {
// console.log(item)
// returns body of https://dev.onedrive.com/items/create.htm#response
})
```

### items.delete

Delete item (file or folder)

**Returns**: <code>undefined</code> - (204 No content)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.accessToken | <code>String</code> | OneDrive access token |
| params.itemId | <code>String</code> | Item id |


```javascript
oneDriveAPI.items.delete({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then(() => {
})
```

### items.download

Download item content

**Returns**: <code>Object</code> - Readable stream with item's content  


| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.accessToken | <code>String</code> | OneDrive access token |
| params.itemId | <code>String</code> | item id |  

```javascript
var fileStream = oneDriveAPI.items.download({
  accessToken: accessToken,
  itemId: createdFolder.id
});
fileStream.pipe(SomeWritableStream);
```

### items.getMetadata

Get items metadata (file or folder)

**Returns**: <code>Object</code> - Item's metadata  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.accessToken | <code>String</code> | OneDrive access token |
| params.itemId | <code>String</code> | Item id |


```javascript
oneDriveAPI.items.getMetadata({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then((item) => {
  // console.log(item);
  // returns body of https://dev.onedrive.com/items/update.htm#response
})
```

### items.listChildren

List childrens

**Returns**: <code>Array</code> - object of children items  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  |  |
| params.accessToken | <code>String</code> |  | OneDrive access token |
| [params.itemId] | <code>String</code> | <code>root</code> | Item id |


```javascript
oneDriveAPI.items.listChildren({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then((childrens) => {
// console.log(childrens);
// returns body of https://dev.onedrive.com/items/list.htm#response
})
```

### items.update

Update item metadata

**Returns**: <code>Object</code> - Item object  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.accessToken | <code>String</code> | OneDrive access token |
| params.itemId | <code>String</code> | Item id |
| params.toUpdate | <code>Object</code> | Object to update |


```javascript
oneDriveAPI.items.update({
  accessToken: accessToken,
  itemId: createdFolder.id,
  toUpdate: {
        name: "newFolderName"
      }
}).then((item) => {
// console.log(item);
// returns body of https://dev.onedrive.com/items/update.htm#response
})
```

### items.uploadSimple

Create file with simple upload

**Returns**: <code>Object</code> - Item  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  |  |
| params.accessToken | <code>String</code> |  | OneDrive access token |
| params.filename | <code>String</code> |  | File name |
| [params.parentId] | <code>String</code> | <code>root</code> | Parent id |
| [params.parentPath] | <code>String</code> |  | Parent path (if parentPath is defined, than parentId is ignored) |
| params.readableStream | <code>Object</code> |  | Readable Stream with file's content | 


```javascript
oneDriveAPI.items.uploadSimple({
  accessToken: accessToken,
  filename: filename,
  readableStream: readableStream
}).then((item) => {
// console.log(item);
// returns body of https://dev.onedrive.com/items/upload_put.htm#response
})
```

