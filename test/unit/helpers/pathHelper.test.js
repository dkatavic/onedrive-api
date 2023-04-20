const chai = require("chai");
const {itemPathFormatter} = require("../../../lib/helpers/pathHelper");
const expect = chai.expect;

describe("formatItemPath", () => {
  it("Should format item paths correctly", () => {
    const itemPaths = [
      {input: "/", expectedOutput: "root"},
      {input: "path/to/file", expectedOutput: "root:/path/to/file:"},
      {input: "/path/to/file", expectedOutput: "root:/path/to/file:"},
      {input: "/path/to/file/", expectedOutput: "root:/path/to/file:"},
    ]
    itemPaths.forEach(itemPath => {
      expect(itemPathFormatter(itemPath.input)).to.equal(itemPath.expectedOutput)
    })
  })
});
