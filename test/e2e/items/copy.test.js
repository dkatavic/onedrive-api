// copy.test.js
var faker = require('faker'),
    stringStream = require('string-stream');

describe.skip("copy", function(){
  
  var folderName = "test-copy-" + faker.random.word(),
      fileName1 = "test-" + faker.random.word();
  
  var createdFolder, createdFile, readableStream, fileContent;
  
  before(function(done){
    
    fileContent = faker.lorem.paragraphs();
    readableStream = new stringStream(fileContent);
    
    //create folder and files inside
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: folderName
    }).then(function(_folder){
      
      createdFolder = _folder;
      
      return oneDrive.items.uploadSimple({
        accessToken: accessToken,
        filename: fileName1,
        readableStream: readableStream
      });
    }).then(function(file){
      createdFile = file;
      return done();
    }).catch(done);
    
  });
  
  after(function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFolder.id
    }).then(function(_item){
      done();
    }).catch(errorHandler(done));
    
  });
  
  it("Should copy file inside folder with new name", function(done){
    
    oneDrive.items.copy({
      accessToken: accessToken,
      itemId: createdFile.id,
      parentId: createdFolder.id,
      name: faker.random.word()
    }).then(function(meta){
      //KOPIRANI FAJL VRATI RESPONSE DA SE KOPIRA
      // JA MORAN IZ HEDERA NAĆ HEDER LOCATION I VRATIT NJEGA
      // NA TOJ LOKACIJI ZAPRAVO MOŽEMO PRATITI DOWNLOAD
      expect(meta.location).to.be.a('String');
      done();
    }).catch(errorHandler(done));
    
  });
  
});