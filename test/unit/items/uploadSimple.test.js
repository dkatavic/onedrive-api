// uploadSimple.test.js

var faker = require('faker'),
    stringStream = require('string-stream'),
    fs = require('fs');

describe("uploadSimple", function(){
  
  var filename, readableStream, fileContent;
  
  before(function(){
    
    filename = "test-uploadSimple-" + faker.random.word();
    fileContent = faker.lorem.paragraphs();
    readableStream = new stringStream(fileContent);
    //readableStream = fs.createReadStream('./sample.txt');
    
  })
  
  it("Should upload Simple file using Stream", function(done){
    
    oneDrive.items.uploadSimple({
      accessToken: accessToken,
      filename: filename,
      readableStream: readableStream
    }).then(function(item){
      console.log(item);
      expect(item.id).to.be.a('String');
      expect(item.name).to.be.a('String');
      expect(item.size).to.be.a('Number');
      expect(item.size).to.be.at.least(1);
      expect(item.id).to.be.a('String');
      done();
    }).catch(errorHandler(done));
    
  })
  
  
  
});