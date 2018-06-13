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
var resultDirectory=path.join(file_path,'output-'+(new Date()).getTime());
if(!fs.existsSync(resultDirectory)){
    fs.mkdirSync(resultDirectory);
}
for (pdf_file of pdfs) {

    let currentFilePath = path.join(file_path, pdf_file);
    extract(currentFilePath, {splitPages: false,eol: 'unix'}, (err, pages)=>{
        if (err) {
            return
        }

        let sectionparser = new SectionParser(pages);

        let result = (sectionparser.parseAllToJson());
        let baseName = path.basename(currentFilePath, '.pdf');
        fs.writeFileSync(path.join(resultDirectory,baseName + ".json"), JSON.stringify(result,null,2));

    });
}



