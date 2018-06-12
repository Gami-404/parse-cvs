var fs = require('fs');

var SectionParser = require('./src/SectionParser');
var extract = require('pdf-text-extract');
var path = require('path');

var file_path = process.argv[2];


if (!fs.existsSync(file_path)) {
    console.log('your file not exists', file_path)
}

if (!path.isAbsolute(file_path)) {
    file_path = path.join(__dirname, file_path);
}


// console.log(process.argv);
// var path=console.log(process.argv[process.argv.length]);
extract(file_path, {splitPages: false}, function (err, pages) {
    if (err) {
        return
    }
    // console.log(pages);
    var sectionparser = new SectionParser(pages);
    // console.log(pages.join(""));
    var result = (sectionparser.parseAllToJson());
    fs.writeFileSync('test.json',JSON.stringify(result,null,3));
});


