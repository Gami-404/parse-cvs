// test attributes is always required
// fetch optional
SectionParser.SECTIONS_FETCHERS_REGEX = {
    projects: {
        test: /^[\s]*?projects?\s*\n*$/giu,
        fetch: /projects?\s?:?\s*\n+(.|\n)*$/gimu
    },
    skills: {
        test: /^[\s]*?SKILLS?\s*\n*$/giu,
        fetch: /SKILLS?\s?:?\s*\n+(.|\n)*$/gimu,
    },
    os: {
        test: /^[\s*\n*]?Operating\ssystems?:?$/gimu,
        fetch: /Operating\ssystems?:?\s*\n+(.|\n)*$/gimu,
    },
    languageSkills: {
        test: /^[\s*\n*]?Languages?\s?Skills?[\s*]?:?$/gimu,
        fetch: /Languages?\s?Skills?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    softSkills: {
        test: /^[\s*\n*]?Soft\s?Skills?[\s*]?:?$/gimu,
        fetch: /Soft\s?Skills?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    employment: {
        test: /^[\s*\n*]?employment[\s*]?:?$/gimu,
        fetch: /employment[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    awards: {
        test: /^[\s*\n*]?AWARDS?[\s*]?:?$/gimu,
        fetch: /AWARDS?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    technical_skills: {
        test: /^[\s*\n*]?technical\s?skills?[\s*]?:?$/gimu,
        fetch: /technical\s?skills?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    personal_data: {
        test: /^[\s*\n*]?personal\s?data[\s*]?:?$/gimu,
        fetch: /personal\s?data[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    education: {
        test: /^[\s*\n*]?education[\s*]?:?$/gimu,
        fetch: /education[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    objective: {
        test: /^[\s*\n*]?objective[\s*]?:?$/gimu,
        fetch: /objective[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    hobbies: {
        test: /^[\s*\n*]?hobbies?[\s*]?:?$/gimu,
        fetch: /hobbies?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    experience: {
        test: /^[\s*\n*]?experiences?[\s*]?:?$/gimu,
        fetch: /experiences?[\s*]?:?\s*\n+(.|\n)*$/gimu,
    },
    computer_skills: {
        test: /^[\s*\n*]?computer\s?skills?[\s*]?:?$/gimu,
        fetch: /computer\s?skills?\s*\n+(.|\n)*$/gimu,
    },
};

/**
 *
 * @param pages test of pages data
 * @constructor SectionParser
 */
function SectionParser(pages) {
    if (Array.isArray(pages)) {
        this.pages = pages.join("").replace(/[\r]+/g, "\n");
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
        if (SectionParser.SECTIONS_FETCHERS_REGEX[regex_name].fetch) {
            sections[regex_name] = getSection(regex_name, this.pages);
        }
    }
    return sections;
};

module.exports = SectionParser;