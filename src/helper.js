/**
 * Create Regex Object form array
 * @param strings
 * @returns {Array}
 */
export const createRegexObject = function (strings) {
    let objects = [];

    strings.map(function (string) {
        let name = string.replace(/[\?]/giu, '').replace('\\s', '_');
        objects.push({
            test: new RegExp("^[\\s]*?" + string + "\\s*\\n*$", 'giu'),
            fetch: new RegExp(string + "\\s?:?\\s*\\n+(.|\\n)*$", 'gimu'),
            name: name
        })
    });
    return objects;
};