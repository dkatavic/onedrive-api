const chai = require("chai");
const expect = chai.expect;
const isQueryStringUrlEncoded = require("../../../lib/helpers/isQueryStringUrlEncoded");

describe("isQueryStringUrlEncoded", () => {
  it("Should return true for valid query strings", () => {
    const validStrings = ["foo", "?bar=2", "?bar%20foo"];
    validStrings.forEach((validString) => {
      console.log(validString);
      expect(isQueryStringUrlEncoded(validString)).to.be.true;
    });
  });

  it("Should return false for invalid query strings", () => {
    const validStrings = ["foo bar"];
    validStrings.forEach((validString) => {
      expect(isQueryStringUrlEncoded(validString)).to.be.false;
    });
  });
});
