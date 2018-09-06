const mocha = require("mocha");
const chai = require("chai");
const indexMark = require("../index");
const expect = chai.expect;

describe("indexMark", function() {
  describe("#getLinksFromMd", function() {
    it("Quando nao houver parametro deve lancar um erro.", function() {
      expect(() => indexMark.getLinksFromMd("")).to.throw("Parametro não encontrado.");
    });

    it("Quando o texto for um numero deve lancar um erro", function () {
      expect(() => indexMark.getLinksFromMd(77)).to.throw();
    });
    it("Quando o texto for uma string e nao houver url deve retornar um array vazio", function () {
      expect(indexMark.getLinksFromMd("Erro")).to.deep.equal([]);
    });

    it("Quando o texto for uma string e houver uma url deve retornar um array com o objeto com a url e o link do markdown", function () {
      expect(indexMark.getLinksFromMd("Você procura por esse site [google](www.google.com) ?"))
      .to.deep.equal([{
        href: "www.google.com",
        text: "google"
      }]);
    });

    it("Quando o texto for uma string e houver tres urls diferentes deve retornar o objeto dentro do array", function () {
      expect(indexMark.getLinksFromMd("[labore](https://en.wiktionary.org/wiki/labore), et [dolore](https://en.wiktionary.org/wiki/dolore), henlow [foo](http://foo.com)"))
      .to.deep.equal([
        {href: "https://en.wiktionary.org/wiki/labore", text: "labore"},
        {href: "https://en.wiktionary.org/wiki/dolore", text: "dolore"},
        {href: "http://foo.com", text: "foo"},
      ]);
    });
  });
});
