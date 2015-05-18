// JavaScript Document
/*
	author: liudongjie
	time:2015-03-09
	usage: 首页
	layout:
		top		展示logo  用户账户名 可用余额
		banner	展示banner 和运营活动
		main	展示产品信息  安心牛或者标的
		nav		导航
	specication:
		1.
*/
define(["./db_core"],function(db){
	console.log(db);
	db.extend("getIndexData","/handler/index/index.json");//请求首页数据
	db.extend("applySMSCode","/handler/index/index.json");//请求短信验证码
	
	return db;
})