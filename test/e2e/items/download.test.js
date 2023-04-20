// download.test.js

const faker = require("faker"),
  stringStream = require("string-to-stream");

describe("download", function () {
  let filename, readableStream, fileContent, createdFile;

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
    let partialString = "";
    const promise = oneDrive.items.download({
      accessToken: accessToken,
      itemId: createdFile.id,
    });

    promise
    .then((fileStream) => {
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
    })
    .catch((error) => {
      errorHandler(done)(error);
    });
  });

  it("Should download Simple file via path", function (done) {
    let partialString = "";
    const promise = oneDrive.items.download({
      accessToken: accessToken,
      itemPath: filename,
    });

    promise
      .then((fileStream) => {
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
      })
  })
});
