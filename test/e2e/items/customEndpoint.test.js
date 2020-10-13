// customEndpoint.test.js

describe("CustomEndpoint", function () {
  it("should retrieve recent items by custom endpoint GET request", function (done) {
    oneDrive.items
      .customEndpoint({
        accessToken: accessToken,
        url: "me/drive/recent",
        method: "GET",
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
