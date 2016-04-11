// delete.test.js
var faker = require('faker');

describe("delete", function(){
  
  var folderName = "test-" + faker.random.word(),
      fileName1 = "test-" + faker.random.word();
  
  var createdFolder;
  
  before(function(done){
    
    //create folder and files inside
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: folderName
    }).then(function(_folder){
      createdFolder = _folder;
      done();
    }).catch(done);
    
  });
  
  it("Should delete empty folder", function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFolder.id
    }).then(function(_item){
      //delete returns 204 No Contentđ
      expect(_item).to.be.equal(undefined);
      done();
    }).catch(errorHandler(done));
    
  })
  
});