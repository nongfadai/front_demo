var path = require("path");
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};


var fs = require("fs");
var doT = require("dot");
var encoding = {
	encoding: "utf8"
};
var Beautify = require("node-js-beautify");
var beautify=new Beautify();


function replaceJSP(file,data){
	file=replaceJSPCmd(file);
	file=replaceIfElse(file);
	file=replaceIf(file);
	file=replaceForEach(file);
	file=removeChoose(file);

	file=replaceVar(file);
	//fs.writeFileSync("./tpl/a.tpl",file,encoding);
	return file;
}

function replaceJSPCmd(str){
	str=str.replace(/<%@[^>]*?>[\s]*/g,function(a,b,c){
		console.log("a",a,b);
		return ""
	})
	return str;
}

function replaceIf(str){
	console.log("replace if");
	//<c:if test="${msgNumber > 0 || bonusUnusedNumber > 0}">
	str=str.replace(/<c:if test="\$\{([^}]*)?\}">/g,function(a,b,c){
		console.log("a",a,b);
		b=b.replace(/^empty[ ]*/g,"null == it.");
		b=b.replace(/^not empty[ ]*/g,"null != it.");

		b=b.replace(/\|\|[ ]*/g,"||it.");
		b=b.replace(/&&[ ]*/g,"&&it.");
		return "<%if(it."+b+"){%>"
	})

	str=str.replace(/<\/c:if>/g,function(a,b,c){
		console.log("a",a,b);
		return "<%}%>"
	})
	return str;
}
function removeChoose(str){
	str=str.replace(/<c:choose>/g,function(a,b,c){
		return ""
	})
	str=str.replace(/<\/c:choose>/g,function(a,b,c){
		return ""
	})
	return str;
}

function replaceIfElse(str){
	console.log("replace if else");
	//\$\{([.]*)?\}">
	str=str.replace(/<c:when test="\$\{([^}]*)?\}">/g,function(a,b,c){
		b=b.replace(/^empty[ ]*/g,"null == it.")
		b=b.replace(/^not empty[ ]*/g,"null != it.")
		return "<%if("+b+"){%>"
	})

	str=str.replace(/<\/c:when>/g,function(a,b,c){
		return "<%}%>"
	})
	str=str.replace(/<c:otherwise>/g,function(a,b,c){
		return "<%else{%>"
	})
	str=str.replace(/<\/c:otherwise>/g,function(a,b,c){
		return "<%}%>"
	})
	return str;
}

function replaceVar(str){
	console.log("replace var");
	str=str.replace(/\$\{([^}]*)?\}/g,function(a,b,c){
		console.log("a",a,b);
		return "<%=it."+b+"%>"
	})

	return str;
}

function replaceForEach(str){
	console.log("replace forEach");
	//<c:forEach items="${receiptList}" var="item">
	str=str.replace(/<c:forEach items="\$\{([^}]*)?\}" var="item">/g,function(a,b,c){
		//b=b.replace(/^empty[ ]*/g,"null == it.")
		//b=b.replace(/^not empty[ ]*/g,"null != it.")
		console.log("match ",a,b);
		return "<%for(var i=0;i<it."+b+".length;i++){it.item=it."+b+"[i];%>"
	})

	str=str.replace(/<\/c:forEach>/g,function(a,b,c){
		return "<%}%>"
	})

	return str;
}


function compile(snippet, data) {
	//var dataFn = require(dataFnPath);
	//var data = dataFn();
	//var snippet = fs.readFileSync("./tpl/" + fileName + ".tpl", encoding);

	doT.templateSettings = {
		evaluate: /\<\%([\s\S]+?)\%\>/g,
		interpolate: /\<\%=([\s\S]+?)\%\>/g,
		varname: 'it',
		strip: true
	};



	var doTCompiled = doT.template(snippet);
	var render = doTCompiled(data);
	render=beautify.beautify_html(render,{});
	return render;
	//fs.writeFileSync("./render/" + fileName + ".html", render, encoding);
	//console.log("Generated function: \n" + doTCompiled.toString());
	//console.log("Result of calling with " + JSON.stringify(data) + " :\n" + doTCompiled(data));
	//var jsp = fs.readFileSync(jspFile);
}

function compileJSP(reqPath){
	console.log("path",reqPath);
	var jspRpath1="../../../WebHtml/jsp/weixin/shareBonusIndex.jsp";
	var jspRpath2="../../../WebHtml/jsp/weixin/shareBonusSend.jsp";
	var jspRpath3="../../../WebHtml/jsp/weixin/register_shareBonus_ok.jsp";
	var jspRpath;//使用哪个jsp

	var dataFnPath="./dataFn.js";
	console.log("dataFnPath",dataFnPath);
	var dataFn = require(dataFnPath);
	var data;//使用哪个数据


	if(reqPath=="/weixin/share/index/1"){
		jspRpath=jspRpath1;
		data=dataFn("index1")
	}
	else if(reqPath=="/weixin/share/index/2"){
		jspRpath=jspRpath1;
		data=dataFn("index2")
	}
	else if(reqPath=="/weixin/share/send/1"){
		jspRpath=jspRpath2;
		data=dataFn("send1")
	}
	else if(reqPath=="/weixin/share/send/2"){
		jspRpath=jspRpath2;
		data=dataFn("send2")
	}
	else if(reqPath=="/weixin/share/send/3"){
		jspRpath=jspRpath2;
		data=dataFn("send3")
	}
	else if(reqPath=="/weixin/share/send/4"){
		jspRpath=jspRpath2;
		data=dataFn("send4")
	}
	
	console.log("jspRpath",jspRpath);
	console.log("data",data);
	if(jspRpath&&data){
		result= compileJSP2(jspRpath,data);
	}else{
		result="no maping found";
	}

	return result;
}

 function compileJSP2(jspRpath,data) {

	var jspPath=path.resolve(__dirname,jspRpath);
	var file=fs.readFileSync(jspPath,encoding);

	var file2=replaceJSP(file);//把jsp替换成dot模板格式

	//fs.writeFileSync("../test/compile/test1.html",file2,encoding);
	try{
		var result=compile(file2, data);
		//console.log("compile result",result);
	}catch(ex){
		result=ex;
	}

	return result;
}
module.exports =compileJSP;


//compile("1");



function test() {

	var dataFnPath="../../../src/lib/compile/dataFn.js";
	var dataFn = require(dataFnPath);
	var data = dataFn();

	//var file2=replaceJSP(file);
	var file2Path="../../../test/compile/test1.html";
	var file2=fs.readFileSync(file2Path,encoding);
	var result=compile(file2, data);
	console.log("compile result",result);


}

function test2(){
	var path="/weixin/share/index/1"
	compileJSP(path);
}

//test2();
//test();

