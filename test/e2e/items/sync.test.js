// sync.test.js

describe("Sync Delta", function () {
  it("should retrieve recent sync data", function (done) {
    oneDrive.items
      .sync({
        accessToken: accessToken,
      })
      .then(function (recentItems) {
        expect(recentItems).to.be.a("Object");
        expect(recentItems["@odata.context"]).to.be.a("String");
        expect(recentItems.value).to.be.a("Array");
        done();
      })
      .catch(errorHandler(done));
  });
});
