// JavaScript Document

var Velocity=require("velocityjs");
 console.log("Velocity",Velocity);
var context={};
//1. 直接解析  
var result=Velocity.render('string of velocity', context);  
console.log("result:",result);
 
//2. 使用Parser和Compile  
//var Parser = Velocity.Parser;  
//console.log("Parser",Parser);
var Compile = Velocity.Compile;  
 
var asts = Velocity.parse('../vm/index.vm');  
console.log(asts);
var result2=(new Compile(asts)).render(context);  