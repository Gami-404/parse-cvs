/**
 * Create Regex Object form array
 * @param strings
 * @returns {Array}
 */
const createRegexObject = function (strings, groupName) {
    let objects = [];

    strings.map(function (string) {
        let name = string.replace(/[\?]/giu, '').replace(/\\s/giu, '_').toLowerCase();
        objects.push({
            test: new RegExp("^[\\s]*?" + string + "\\s*\\n*$", 'giu'),
            fetch: new RegExp("^[\\s\\n]*?"+string + "\\s?:?\\s*\\n+(.|\\n)*$", 'gimu'),
            name: name,
            group: groupName
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
    let keysDir = path.join(__dirname, 'keys');


    var regexs = [];
    let groupFiles = fs.readdirSync(keysDir);
    for (groupFile  of groupFiles) {
        let currentFilePath = path.join(keysDir, groupFile);
        let groupName = path.basename(currentFilePath, '.json');
        regexs = regexs.concat(createRegexObject(JSON.parse(fs.readFileSync(currentFilePath, 'utf8')), groupName));
    }
    let returnedObject = {};
    regexs.map(function (regex) {
        returnedObject[regex.name] = regex;
    });
    return returnedObject;
};

module.exports.getRegexs = getRegexs;

// Make Regexs cached
// module.exports.regexs = getRegexs();