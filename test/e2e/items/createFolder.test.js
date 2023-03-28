// createFolder.test.js
const faker = require("faker");

describe("createFolder", function () {

  describe("should create random folder at root drive", function() {
    let createdFolder;

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFolder.id,
        })
        .then(function (_item) {
          done();
        })
        .catch(errorHandler(done));
    });

    it("should create random folder at root drive", function (done) {
      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          rootItemId: "root",
          name: "test" + faker.random.word(),
        })
        .then(function (folder) {
          expect(folder).to.be.a("Object");
          expect(folder.name).to.be.a("String");
          expect(folder.folder).to.be.a("Object");
          expect(folder.folder.childCount).to.be.equal(0);
          expect(folder.id).to.be.a("String");
          createdFolder = folder;
          done();
        })
        .catch(errorHandler(done));
    });
  })

  describe("should create random folder at path/to/folder", function () {
    let createdFolder, createdParentFolder;

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdFolder.id,
        })
        .then(function (_item) {
          done();
        })
        .catch(errorHandler(done));
    });

    after(function (done) {
      oneDrive.items
        .delete({
          accessToken: accessToken,
          itemId: createdParentFolder.id,
        })
        .then(function (_item) {
          done();
        })
        .catch(errorHandler(done));
    });

    it("should create random folder at path/to/folder", function (done) {
      const pathToFolder = "test" + faker.random.word()
      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          itemPath: pathToFolder,
          name: "folder",
        })
        .then(function (folder) {
          expect(folder).to.be.a("Object");
          expect(folder.name).to.be.a("String");
          expect(folder.folder).to.be.a("Object");
          expect(folder.folder.childCount).to.be.equal(0);
          expect(folder.id).to.be.a("String");
          expect(folder.parentReference.path).to.include(pathToFolder)
          createdFolder = folder;
          createdParentFolder = {id: folder.parentReference.id}
          done();
        })
        .catch(errorHandler(done));
    })
  })
});
