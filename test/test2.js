function main() {
    var velocity = require('velocity');
    var Engine = velocity.Engine;

    var path = require("path");
    var root = path.resolve(__dirname, "../vm");
    var tplFile = path.resolve(root, "index.vm");
    console.log("root", root);
    console.log("tplFile", tplFile);
    return;
    
    var options = {
        template: tplFile,
        root: root
    };
    var context = {
        data: {
            a_id: 1,
            a_name: 1
        }
    };
    var engine = new Engine(options);
    var result = engine.render(context)
    console.log(result)

    //console.log(velocity);

    //console.log(Engine);
    //console.log(engine);

    //var result=velocity.parser.parse("index.vm");
    //console.log(result);
}


main();