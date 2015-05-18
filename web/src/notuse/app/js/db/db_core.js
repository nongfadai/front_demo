// JavaScript Document
define(function(){
	var DB={};
	
	function _exports(){
		DB.extend=extend;
		return DB;	
	}
	
	function extend(name,url,opt){//给
		DB[name]=httpFunction(url,opt);
	}
	
	function httpFunction(url,opt){
		return function(param,cb){
			var fakeSucc=function(data , status, xhr){
				console.log("result:"+data);
				cb(data);
			}
			var fackError=function(xhr,errorType , error){
				console.log("error",error);
			}
			$.ajax({
					method:"POST",
					url:url,
					data:param,
					success: fakeSucc,
					error: fackError
				}
			);
		}
	}
	
	return _exports();
})