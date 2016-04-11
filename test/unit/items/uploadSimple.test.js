// uploadSimple.test.js

var faker = require('faker'),
    stringStream = require('string-stream');

describe("uploadSimple", function(){
  
  var filename, readableStream, fileContent, createdFile;
  
  before(function(){
    
    filename = "test-uploadSimple-" + faker.random.word();
    fileContent = faker.lorem.paragraphs();
    readableStream = new stringStream(fileContent);
    
  });
  
  after(function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFile.id
    }).then(function(_item){
      done();
    }).catch(errorHandler(done));
    
  })
  
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
    
  })
  
  
  
});