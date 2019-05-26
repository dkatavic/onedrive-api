// uploadSimple.test.js

const faker = require("faker");
const stringStream = require("string-to-stream");

describe("uploadSession", function () {
  describe("Should upload Session 1kB file using Stream in root directory", function () {
    var createdFile

    it("Should upload Session 1kB file using Stream in root directory", function (done) {
      const filename = "test-uploadSession-" + faker.random.word();
      // 1Kb
      const fileContent = 'a'.repeat(1 * 1024)
      const readableStream = stringStream(fileContent);

      oneDrive.items.uploadSession({
        accessToken: accessToken,
        filename: filename,
        readableStream: readableStream,
        fileSize: fileContent.length
      }).then(function (item) {
        expect(item.id).to.be.a('String');
        expect(item.name).to.be.a('String');
        expect(item.size).to.be.a('Number');
        expect(item.size).to.be.at.least(1);
        expect(item.id).to.be.a('String');
        createdFile = item;
        done();
      }).catch((err) => {
        console.error('Error Handled')
        console.error(err)
        errorHandler(done)
      }
      );

    });

    after(function (done) {

      oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFile.id
      }).then(function (_folder) {
        done();
      }).catch(errorHandler(done));

    });

  })

  describe("Should upload Session 10MB file using Stream", function () {
    var createdFile

    it("Should upload Session 10MB file using Stream", function (done) {
      const filename = "test-uploadSession-" + faker.random.word();
      // 10MB
      const fs = require("fs");
      const path = require("path");
      const exampleFilePath = path.join(__dirname, "../../example-data//10MB_file.txt");
      const readableStream = fs.createReadStream(exampleFilePath);
      const fsStat = fs.statSync(exampleFilePath);
      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fsStat.size
        })
        .then(function (item) {
          expect(item.id).to.be.a("String");
          expect(item.name).to.be.a("String");
          expect(item.size).to.be.a("Number");
          expect(item.size).to.be.equal(fsStat.size);
          expect(item.id).to.be.a("String");
          createdFile = item;
          done();
        })
        .catch(err => {
          errorHandler(done);
        });
    });
    after(function (done) {

      oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFile.id
      }).then(function (_folder) {
        done();
      }).catch(errorHandler(done));

    });
  })

  describe("Should upload Session 1kb file inside a folder using parentId", function () {

    var filename, readableStream, fileContent, folderName, createdFolder;

    before(function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      fileContent = "a".repeat(1 * 1024);
      readableStream = new stringStream(fileContent);
      folderName = "test-uploadSessionFolder-" + faker.random.word();

      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          rootItemId: "root",
          name: folderName
        })
        .then(function (folder) {
          createdFolder = folder;
          done();
        })
        .catch(done);
    });

    it("Should upload Session 1kb file inside a folder using parentId", function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      // 1Kb

      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fileContent.length,
          parentId: createdFolder.id
        })
        .then(function (item) {
          expect(item.id).to.be.a("String");
          expect(item.name).to.be.a("String");
          expect(item.size).to.be.a("Number");
          expect(item.size).to.be.at.least(1);
          expect(item.id).to.be.a("String");
          createdFile = item;
          done();
        })
        .catch(err => {
          console.error(err);
          errorHandler(done);
        });
    });

    after(function (done) {

      oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFile.id
      }).then(function () {
        return oneDrive.items.delete({
          accessToken: accessToken,
          itemId: createdFolder.id
        });
      }).then(function (_folder) {
        done();
      }).catch(errorHandler(done));

    });

  })

  describe("Should upload Session 1kb file inside a folder using parentPath", function () {

    var filename, readableStream, fileContent, folderName, createdFolder;

    before(function (done) {
      filename = "test-uploadSession-" + faker.random.word();
      fileContent = "a".repeat(1 * 1024);
      readableStream = new stringStream(fileContent);
      folderName = "test-uploadSessionFolder-" + faker.random.word();

      oneDrive.items
        .createFolder({
          accessToken: accessToken,
          rootItemId: "root",
          name: folderName
        })
        .then(function (folder) {
          createdFolder = folder;
          done();
        })
        .catch(done);
    });

    it("Should upload Session 1kb file inside a folder using parentPath", function (done) {
      oneDrive.items
        .uploadSession({
          accessToken: accessToken,
          filename: filename,
          readableStream: readableStream,
          fileSize: fileContent.length,
          parentPath: folderName
        })
        .then(function (item) {
          expect(item.id).to.be.a("String");
          expect(item.name).to.be.a("String");
          expect(item.size).to.be.a("Number");
          expect(item.size).to.be.at.least(1);
          expect(item.id).to.be.a("String");
          createdFile = item;
          done();
        })
        .catch(err => {
          console.error(err)
          errorHandler(done);
        });
    });

    after(function (done) {

      oneDrive.items.delete({
        accessToken: accessToken,
        itemId: createdFile.id
      }).then(function () {
        return oneDrive.items.delete({
          accessToken: accessToken,
          itemId: createdFolder.id
        });
      }).then(function (_folder) {
        done();
      }).catch(errorHandler(done));

    });

  })
});
