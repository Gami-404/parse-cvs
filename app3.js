var fs = require('fs');

var SectionParser = require('./src/SectionParser');
var extract = require('pdf-text-extract');
var path = require('path');
var filePath = path.join(__dirname, 'examples/Abd Elrhman Arafa.pdf')

// console.log(process.argv);
// var path=console.log(process.argv[process.argv.length]);
extract(filePath, {splitPages: false}, function (err, pages) {
    if (err) {
        return
    }
    // console.log(pages);
    var sectionparser = new SectionParser(pages);

    // console.log(sectionparser.getProjectsSection());
    var result = (sectionparser.parseAllToJson());
    fs.writeFile("example-bassem.json", JSON.stringify(result), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });


});


