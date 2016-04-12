# onedrive-api
OneDrive API module for Node.js. It's built with pure functional programing, there are no unnecessary objects.

It's built for internal project so it supports only basic CRUD operations needed for project (for now). I will accept any pull requests.

# Install

```sh
npm install onedrive-api
```

# API

### Items

  - [createFolder](#createfolder)
  - [delete](#delete)
  - [download](#download)
  - [listChildren](#listchildren)
  - [update](#update)
  - [uploadSimple](#uploadsimple)

# Examples
  
### createFolder

Create Folder

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> [params.itemId=root] Item id  
**Params**: <code>String</code> params.name New folder name  
**Returns**: <code>Object</code> - folder object  

```node
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

### delete

Delete item (file or folder)

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> params.itemId Item id  
**Returns**: <code>undefined</code>

Delete item (file or folder)
```node
oneDriveApi.items.delete({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then(() => {
})
```

### download

Download item content

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> params.itemId item id  
**Returns**: <code>Object</code> - Readable stream with item's content  

```node
oneDriveApi.items.download({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then((fileStream) => {
fileStream.pipe(SomeWritableStream);
})
```

### listChildren

List childrens

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> [params.itemId=root] Item id
**Returns**: <code>Array</code> - object of children items

```node
oneDriveApi.items.listChildren({
  accessToken: accessToken,
  itemId: createdFolder.id
}).then((childrens) => {
// console.log(childrens);
// returns body of https://dev.onedrive.com/items/list.htm#response
})
```

### update

Update item metadata

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> params.itemId Item id  
**Params**: <code>Object</code> params.toUpdate Object to update that corresponds to item's metadata  
**Returns**: <code>Object</code> - Item object

```node
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

### uploadSimple

Create file with simple upload

**Params**: <code>Object</code> params  
**Params**: <code>String</code> params.accessToken OneDrive access token  
**Params**: <code>String</code> params.filename File name  
**Params**: <code>String</code> [params.parentId=root] Parent id  
**Params**: <code>Object</code> params.readableStream Readable Stream with file's
**Returns**: <code>Object</code> - Item  

```node
oneDriveApi.items.uploadSimple({
  accessToken: accessToken,
  filename: filename,
  readableStream: readableStream
}).then((item) => {
// console.log(item);
// returns body of https://dev.onedrive.com/items/upload_put.htm#response
})
```

