/**
 * Create Regex Object form array
 * @param strings
 * @returns {Array}
 */
const createRegexObject = function (strings) {
    let objects = [];

    strings.map(function (string) {
        let name = string.replace(/[\?]/giu, '').replace(/\\s/giu, '_').toLowerCase();
        objects.push({
            test: new RegExp("^[\\s]*?" + string + "\\s*\\n*$", 'giu'),
            fetch: new RegExp(string + "\\s?:?\\s*\\n+(.|\\n)*$", 'gimu'),
            name: name
        })
    });
    return objects;
};


/**
 * Get all regex
 * @returns {{}}
 */
const getRegexs = function () {
    let fs = require('fs');
    let path = require('path');
    var keys = JSON.parse(fs.readFileSync(path.join(__dirname, 'regex', 'keys.json'), 'utf8'));
    let regexs = createRegexObject(keys);
    let returnedObject = {};
    regexs.map(function (regex) {
        returnedObject[regex.name] = regex;
    });
    return returnedObject;
};


module.exports.getRegexs = getRegexs;