// getMetadata.test.js
var faker = require('faker');

describe('getMetadata', function () {

  var folderName = "test-getmedatada-" + faker.random.word();

  var createdFolder;

  before(function (done) {

    //create folder and files inside
    oneDrive.items.createFolder({
      accessToken: accessToken,
      rootItemId: "root",
      name: folderName
    }).then(function (_folder) {
      createdFolder = _folder;
      done();
    }).catch(done);

  });

  after(function (done) {

    oneDrive.items.delete({
      accessToken: accessToken,
      itemId: createdFolder.id
    }).then(function (_item) {
      done();
    }).catch(errorHandler(done));

  });

  it("Should get metadata of folder", function (done) {

    oneDrive.items.getMetadata({
      accessToken: accessToken,
      itemId: createdFolder.id
    }).then(function (item) {
      expect(item).to.be.a('object');
      done();
    }).catch(errorHandler(done));

  });

});
