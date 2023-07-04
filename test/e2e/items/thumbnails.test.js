const faker = require("faker");

describe("thumbnails", function () {
  let filename, createdFile;

  before(function (done) {
    const fs = require("fs")
    const path = require("path")
    const examplePdfPath = path.join(__dirname, "../../example-data/pdf_file.pdf")

    filename = "test-thumbnails-" + faker.random.word() + ".pdf";

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

  it("Should generate thumbnails for pdf file", function (done) {
    oneDrive.items
      .thumbnails({
        accessToken: accessToken,
        itemId: createdFile.id
      })
      .then((response) => {
        expect(response).to.be.a("object");
        expect(response).to.have.property("value")
        expect(response["value"]).to.be.a("array").and.to.have.length.greaterThan(0)
        expect(response["value"][0]).to.have.property("small")
        done();
      })
      .catch(errorHandler(done));
  })
})
