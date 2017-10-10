// uploadSimple.test.js

var faker = require('faker'),
    stringStream = require('string-stream');

describe("uploadSimple", function(){
  
  var filename, readableStream, fileContent, createdFile, folderName, createdFolder, createdFile2;
  
  before(function(done){
    
    filename = "test-uploadSimple-" + faker.random.word();
    fileContent = faker.lorem.paragraphs();
    readableStream = new stringStream(fileContent);
    folderName = "test-uploadSimpleFolder-" + faker.random.word();
    
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: folderName
    }).then(function(folder){
      createdFolder = folder;
      done();
    }).catch(done);
    
  });
  
  after(function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFile.id
    }).then(function(_item){
       return oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFile2.id
      });      
    })
    .then(function(){
      return oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFolder.id
      });
    }).then(function(_folder){
      done();
    }).catch(errorHandler(done));
    
  });
  
  it("Should upload Simple file using Stream", function(done){
    
    oneDrive.items.uploadSimple({
      accessToken: accessToken,
      filename: filename,
      readableStream: readableStream
    }).then(function(item){
      
      expect(item.id).to.be.a('String');
      expect(item.name).to.be.a('String');
      expect(item.size).to.be.a('Number');
      expect(item.size).to.be.at.least(1);
      expect(item.id).to.be.a('String');
      createdFile = item;
      done();
    }).catch(errorHandler(done));
    
  });
  
  it("Should upload Simple file using Stream and parentPath", function(done){
    
    oneDrive.items.uploadSimple({
      accessToken: accessToken,
      filename: filename,
      parentPath: folderName,
      readableStream: readableStream
    }).then(function(item){
      
      expect(item.id).to.be.a('String');
      expect(item.name).to.be.a('String');
      expect(item.size).to.be.a('Number');
      expect(item.size).to.be.at.least(1);
      expect(item.id).to.be.a('String');
      createdFile2 = item;
      done();
    }).catch(errorHandler(done));
    
  });
  
});