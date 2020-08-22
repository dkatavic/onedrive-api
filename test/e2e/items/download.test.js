// download.test.js

const faker = require("faker");
const stringStream = require("string-to-stream");

describe("download", function () {
  var filename, readableStream, fileContent, createdFile;

  before(function (done) {
    filename = "test-download-" + faker.random.word();
    fileContent = faker.lorem.paragraphs();
    readableStream = stringStream(fileContent);

    oneDrive.items
      .uploadSimple({
        accessToken: accessToken,
        filename: filename,
        readableStream: readableStream,
      })
      .then(function (item) {
        createdFile = item;
        done();
      })
      .catch(errorHandler(done));
  });

  after(function (done) {
    oneDrive.items
      .delete({
        accessToken: accessToken,
        itemId: createdFile.id,
      })
      .then(function (_item) {
        done();
      })
      .catch(errorHandler(done));
  });

  it("Should download Simple file using Stream", function (done) {
    var partialString = "";
    var fileStream = oneDrive.items.download({
      accessToken: accessToken,
      itemId: createdFile.id,
    });

    fileStream.on("data", function (data) {
      partialString += data.toString();
    });

    fileStream.on("end", function () {
      expect(partialString).to.be.equal(fileContent);
      done();
    });

    fileStream.on("error", function (err) {
      errorHandler(done)(err);
    });
  });
});
