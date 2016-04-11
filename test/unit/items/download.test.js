// download.test.js

var faker = require('faker'),
    stringStream = require('string-stream');

describe("download", function(){
  
  var filename, readableStream, fileContent, createdFile;
  
  before(function(done){
    
    filename = "test-download-" + faker.random.word();
    fileContent = faker.lorem.paragraphs();
    readableStream = new stringStream(fileContent);
    
    oneDrive.items.uploadSimple({
      accessToken: accessToken,
      filename: filename,
      readableStream: readableStream
    }).then(function(item){
      createdFile = item;
      done();
    }).catch(errorHandler(done));
    
  });
  
  after(function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFile.id
    }).then(function(_item){
      done();
    }).catch(errorHandler(done));
    
  })
  
  it("Should download Simple file using Stream", function(done){
    
    var fileStream = oneDrive.items.download({
      accessToken: accessToken,
      itemId: createdFile.id
    });
    
    fileStream.on('data', function(data){
      expect(data.toString()).to.be.equal(fileContent);
      done();
    });
    
    fileStream.on('error', function(err){
      errorHandler(done)(err);
    });
    
  });
  
});