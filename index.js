function getLinksFromMd(textMark) {
    if (!textMark || textMark === "" || textMark === undefined) {
        throw new Error("Parametro não encontrado.");
    }
    if (typeof textMark === "number") {
        throw new Error("Não aceita numeros.");
    } else {
        let exportText = new RegExp (/\[(.*?)\]/g);
        let exportUrl = new RegExp (/\((.*?)\)/g);
        let urls = textMark.match(exportUrl);
        let mdText = textMark.match(exportText);
        if (urls === null || mdText === null) {
            return [];
        } else {
            var newObject = urls.map((eachUrl, index) => ({
                href: eachUrl.replace(/[{()}]/g,""),
                text: mdText[index].replace(/[\[\]"]+/g,"")
            }));
            return newObject;
        }
    }
}
module.exports.getLinksFromMd = getLinksFromMd;
