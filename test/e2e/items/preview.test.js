const faker = require("faker");

describe("preview", function () {
  let filename, createdFile;

  before(function (done) {
    const fs = require("fs")
    const path = require("path")
    const examplePdfPath = path.join(__dirname, "../../example-data/pdf_file.pdf")

    filename = "test-download-" + faker.random.word();

    oneDrive.items
      .uploadSimple({
        accessToken: accessToken,
        filename: filename,
        readableStream: fs.createReadStream(examplePdfPath),
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

  it("Should generate preview link for pdf file", function (done) {
    oneDrive.items
      .preview({
        accessToken: accessToken,
        itemId: createdFile.id,
        body: {
          zoom: 0.75
        }
      })
      .then((response) => {
        expect(response).to.be.a("object");
        expect(response).to.have.property('getUrl')
        expect(response.getUrl).to.be.a('string')
        done();
      })
      .catch(errorHandler(done));
  })
})
