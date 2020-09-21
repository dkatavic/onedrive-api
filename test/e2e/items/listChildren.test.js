//listChildren.test.js

const { expect } = require("chai");
var faker = require('faker');

describe('listChildren', function(){

  var folderName1 = "test-" + faker.random.word(),
      folderName2 = "test-" + faker.random.word(),
      createdFolder1,
      createdFolder2;

  before(function(done) {

    //create folder and file for asserts
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: folderName1
    }).then(function(_folder){
      createdFolder1 = _folder;
      return oneDrive.items.createFolder({
        accessToken: accessToken,
        rootItemId: "root",
        name: folderName2
      })
    }).then(function(_folder) {
      createdFolder2 = _folder
      done();
    }).catch(done);

  })

  after(function(done){
    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFolder1.id
    }).then(function(_item){
      return oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFolder2.id
      })
    }).then(function (){
      done()
    }).catch(errorHandler(done));
  })

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

  it('should list children of root drive with Odata params', function(done){

    oneDrive.items.listChildren({
      accessToken: accessToken,
      itemId: "root",
      query: '?top=1'
    }).then(function(childrens){

      expect(childrens).to.be.a('Object');
      expect(childrens.value).to.have.lengthOf(1);
      expect(childrens.value.length).toE
      childrens.value.forEach(function(item){
        expect(item.name).to.be.a('String');
        expect(item).to.have.any.keys('folder', 'file');
      });
      done();

    }).catch(errorHandler(done));

  });

});
