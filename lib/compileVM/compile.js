var velocity = require('velocity');
var Engine = velocity.Engine;

var path = require("path");
var fs=require("fs-extra");
function compile(tplFile, root, jsonFile) {
    //var root = path.resolve(__dirname, "../vm");
    var tplFileAbs = path.resolve(root, tplFile);
    var jsonFileAbs=path.resolve(root,jsonFile);
    
    console.log("root", root);
    console.log("tplFileAbs", tplFileAbs);
    //return;
    var context=fs.readJsonSync(jsonFileAbs);
    var options = {
        template: tplFileAbs,
        root: root
    };

    var engine = new Engine(options);
    var result = engine.render(context);
    return result;
    console.log(result)
}


module.exports = compile;