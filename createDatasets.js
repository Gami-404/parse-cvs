var SectionParser = require('./src/SectionParser');
var extract = require('pdf-text-extract');
var fs = require('fs');
var path = require('path');


var file_path = process.argv[2];


if (!fs.existsSync(file_path)) {
    console.log('your file not exists', file_path)
}

if (!path.isAbsolute(file_path)) {
    file_path = path.join(__dirname, file_path);
}


var pdfs = fs.readdirSync(file_path);

// var file_name=path.basename(file_path);

// var dir_name=path.dirname(file_path);
var resultDirectory=path.join(file_path,'output');
if(!fs.existsSync(resultDirectory)){
    fs.mkdirSync(resultDirectory);
}
for (pdf_file of pdfs) {
    let currentFilePath = path.join(file_path, pdf_file);
    extract(currentFilePath, {splitPages: false}, function (err, pages) {
        if (err) {
            return
        }

        var sectionparser = new SectionParser(pages);

        var result = (sectionparser.parseAllToJson());

        fs.writeFileSync(path.join(resultDirectory,'educations' + ".txt"), result.educations.map(function (item) {
            return  item.section;
        }).join('\n\n'),{flag:'a+'});
        fs.writeFileSync(path.join(resultDirectory,'experiences' + ".txt"), result.experiences.map(function (item) {
            return  item.section;
        }).join('\n\n'),{flag:'a+'});
        fs.writeFileSync(path.join(resultDirectory,'others' + ".txt"), result.others.map(function (item) {
            return  item.section;
        }).join('\n\n'),{flag:'a+'});
        fs.writeFileSync(path.join(resultDirectory,'personal_data' + ".txt"), result.personal_data.map(function (item) {
            return  item.section;
        }).join('\n\n'),{flag:'a+'});
        fs.writeFileSync(path.join(resultDirectory,'skills' + ".txt"), result.skills.map(function (item) {
            return  item.section;
        }).join('\n\n'),{flag:'a+'});

    });
}



