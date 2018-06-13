// test attributes is always required
// fetch optional
var getRegexs = require('./helper').getRegexs;

SectionParser.SECTIONS_FETCHERS_REGEX = getRegexs();

/**
 *
 * @param pages test of pages data
 * @constructor SectionParser
 */
function SectionParser(pages) {
    if (Array.isArray(pages)) {
        // this.pages = pages.join("").replace(/[\r]+/g, "\n");
        this.pages = pages;
        return;
    }
    this.pages = pages.replace(/[\r]+/g, "\n");
}

/**
 * Section closer choise the end of sections
 * @param sectionName
 * @param sectionData
 * @returns {string}
 */
const sectionCloser = function (sectionName, sectionData) {
    const newSectionData = [];
    for (var line of sectionData.split('\n')) {
        if (!isEndOf(sectionName, line)) {
            newSectionData.push(line);
        } else {
            break;
        }
    }
    return newSectionData.join("\n");
};

/**
 * @param sectionName
 * @param line
 * @returns {boolean}
 */
const isEndOf = function (sectionName, line) {
    var flag = false;
    for (let sectionRegex in  SectionParser.SECTIONS_FETCHERS_REGEX) {
        if (sectionRegex.toLowerCase().trim() != sectionName.toLowerCase().trim()) {
            flag = flag || SectionParser.SECTIONS_FETCHERS_REGEX[sectionRegex].test.test(line);
        }
    }
    return flag;
};

/**
 *
 * @param sectionName
 * @param pages
 * @returns {*}
 */
const getSection = function (sectionName, pages) {
    var result = SectionParser.SECTIONS_FETCHERS_REGEX[sectionName].fetch.exec(pages);

    if (!result) {
        return result;
    }

    if (Array.isArray(result)) {
        // noinspection JSAnnotator
        result = result.join(' ');
        return sectionCloser(sectionName, result);
    }

    return result;

};
/**
 * Get projects sections
 * @returns {String} section  project section data
 */
SectionParser.prototype.getProjectsSection = function () {
    var result = SectionParser.SECTIONS_FETCHERS_REGEX.projects.fetch.exec(this.pages);
    if (!result) {
        return result;
    }

    if (Array.isArray(result)) {
        // noinspection JSAnnotator
        result = result.join(' ');
        return sectionCloser('projects', result);
    }

    return result;
};
/**
 *
 * @returns {{}}
 */
SectionParser.prototype.parseAllToJson = function () {
    var sections = {};
    for (let regex_name in SectionParser.SECTIONS_FETCHERS_REGEX) {
        let keyObject = SectionParser.SECTIONS_FETCHERS_REGEX[regex_name];
        if (keyObject.fetch) {
            if (!(sections.hasOwnProperty(keyObject.group) && Array.isArray(sections[keyObject.group]))) {
                sections[keyObject.group] = [];
            }
            let sectionPragraph= getSection(regex_name, this.pages);
            if(sectionPragraph){
                sections[keyObject.group].push({
                    key: regex_name,
                    section: sectionPragraph
                });
            }

        }
    }
    return sections;
};

module.exports = SectionParser;