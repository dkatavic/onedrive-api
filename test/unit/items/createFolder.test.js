// createFolder.test.js
var faker = require('faker');

describe('createFolder', function(){
  
  var createdFolder;
  
  after(function(done){
    
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFolder.id
    }).then(function(_item){
      done();
    }).catch(errorHandler(done));
    
  })
  
  it('should create random folder at root drive', function(done){
    
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: "test" + faker.random.word()
    }).then(function(folder){
      
      expect(folder).to.be.a('Object');
      expect(folder.name).to.be.a('String');
      expect(folder.folder).to.be.a('Object');
      expect(folder.folder.childCount).to.be.equal(0);
      expect(folder.id).to.be.a('String');
      createdFolder = folder;
      done();
      
    }).catch(errorHandler(done));
    
  });
  
});
