//listChildren.test.js

describe('listChildren', function(){
  
  it('should list children of root drive', function(done){
    
    oneDrive.items.listChildren({
      accessToken: accessToken,
      itemId: "root"
    }).then(function(childrens){
      
      expect(childrens).to.be.a('Object');
      expect(childrens.value).to.be.a('Array');
      childrens.value.forEach(function(item){
        expect(item.name).to.be.a('String');
        expect(item).to.have.any.keys('folder', 'file');
      });
      done();
      
    }).catch(errorHandler(done));
    
  });
  
});
