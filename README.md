# onedrive-api
OneDrive API module for Node.js. It's built with pure functional programing, there are no unnecessary objects.

It's built for internal project so it supports only basic CRUD operations needed for project (for now). I will accept any pull requests.

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
  
### items.createFolder

Create Folder

**Returns**: <code>Object</code> - folder object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  |  |
| params.accessToken | <code>String</code> |  | OneDrive access token |
| [params.itemId] | <code>String</code> | <code>root</code> | Item id |
| params.name | <code>String</code> |  | New folder name |

```javascript
var oneDriveAPI = require('onedrive-api');

oneDriveApi.items.createFolder({
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

Delete item (file or folder)
```javascript
oneDriveApi.items.delete({
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
oneDriveApi.items.download({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then((fileStream) => {
  fileStream.pipe(SomeWritableStream);
})
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
oneDriveApi.items.getMetadata({
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
oneDriveApi.items.listChildren({
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
oneDriveApi.items.update({
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
| params.readableStream | <code>Object</code> |  | Readable Stream with file's content | 

```javascript
oneDriveApi.items.uploadSimple({
  accessToken: accessToken,
  filename: filename,
  readableStream: readableStream
}).then((item) => {
// console.log(item);
// returns body of https://dev.onedrive.com/items/upload_put.htm#response
})
```

