const mocha = require("mocha");
const chai = require("chai");
const indexMark = require("../index");
const expect = chai.expect;

describe("indexMark", function() {
  describe("#getLinksFromMd", function() {
    it("When there is no parameter, it should throw an error.", function() {
      expect(() => indexMark.getLinksFromMd("")).to.throw("Parameter not found");
    });

    it("When the text is a number it should throw an error", function () {
      expect(() => indexMark.getLinksFromMd(77)).to.throw();
    });
    it("When the text is a string and there is no url it should return an empty array", function () {
      expect(indexMark.getLinksFromMd("Error")).to.deep.equal([]);
    });

    it("When the text is a string and there is a url it should return an array with the object with the markdown url and link", function () {
      expect(indexMark.getLinksFromMd("You search for this site [google](www.google.com) ?"))
      .to.deep.equal([{
        href: "www.google.com",
        text: "google"
      }]);
    });

    it("When the text is a string and there are three different urls, it must return the object inside the array", function () {
      expect(indexMark.getLinksFromMd("[labore](https://en.wiktionary.org/wiki/labore), et [dolore](https://en.wiktionary.org/wiki/dolore), henlow [foo](http://foo.com)"))
      .to.deep.equal([
        {href: "https://en.wiktionary.org/wiki/labore", text: "labore"},
        {href: "https://en.wiktionary.org/wiki/dolore", text: "dolore"},
        {href: "http://foo.com", text: "foo"},
      ]);
    });
  });
});
