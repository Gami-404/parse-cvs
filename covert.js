var NodeUglifier = require("node-uglifier");
new NodeUglifier("./production.js").uglify().exportToFile("./dist/cvParser.js");
new NodeUglifier("./production.js").uglify().exportToFile("./dist/cvParserTest.js");
