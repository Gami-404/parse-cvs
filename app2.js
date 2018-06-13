var path = require('path');
var fs = require('fs');

var filePath = path.join(__dirname, 'examples/2page-cv.pdf')
var extract = require('pdf-text-extract')
extract(filePath, {splitPages: false, eol: 'unix'}, function (err, pages) {
    if (err) {
        return
    }
    // console.log(pages);
    var projectsRex = /projects?\s?:?\s*\n*(.|\n)*(?=(?=^[\s]*?SKILLS?\s*\n*$))/gimu;

    var result = getProjestSection(pages);

    fs.writeFile("example-bassem.txt", pages, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

});

function getProjestSection(pages) {
    // var projectsRex=/^[\s]*?projects?\s?:?\s*\n*(.|\n)*/gimu;
    var projectsRex = /^[\s\n]*?educations?\s?:?\s*\n+(.|\n)*$/gimu;
    var result = projectsRex.exec(pages);
    fs.writeFile("example-project.txt", result, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
