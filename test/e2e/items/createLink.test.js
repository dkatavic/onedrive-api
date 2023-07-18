const faker = require("faker");

describe("createLink", function () {
  let filename, createdFile;

  before(function (done) {
    const fs = require("fs")
    const path = require("path")
    const examplePdfPath = path.join(__dirname, "../../example-data/pdf_file.pdf")

    filename = "test-createLink-" + faker.random.word();

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

  it("Should generate viewable sharing link for pdf file", function (done) {
    oneDrive.items
      .createLink({
        accessToken: accessToken,
        itemId: createdFile.id,
        type: "view",
        body: {
          password: "123"
        }
      })
      .then((response) => {
        expect(response).to.be.a("object");
        expect(response).to.have.property("link")
        expect(response["link"]).to.be.a("object")
        expect(response["link"]["type"]).to.equal("view")
        done();
      })
      .catch(errorHandler(done));
  })
})
