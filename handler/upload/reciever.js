module.exports = function(req, res, cb) { //上传文件能力处理
	var multer=require("multer");
	var path=require("path");
	var fs=require("fs");
	var md5=require("MD5");
	var fn=multer({
		dest: './web/upload/wechat_img/',
//		limits:{
//			fileSize:100000,
//			files:1
//		},//关闭限制
		onFileUploadStart:function(file){
			//console.log("onFileUploadStart");
			//console.log(file.originalname);
		},
		onFileUploadData:function(file, data){
			//console.log("onFileUploadData");
			//console.log(file.originalname);
		},
		onFileUploadComplete:function(file){
			//console.log("onFileUploadComplete");
			//console.log(file.originalname);
		},
		onError:function(){
			//console.log("onerror");
		},
		onFileSizeLimit:function(file){
			//console.log("onFileSizeLimit" );
			//console.log(file.originalname);
		},
		onFilesLimit:function(){
			//console.log("onFilesLimit");
		}
	});
	
	fn(req,res,function(req2,res2,next2){
		//console.log("next");
		console.log(req);
		console.log(req.files);
		for(var p in req.files){
			var file=req.files[p];
			var ori_name=file.originalname;
			console.log("ori_name",ori_name);
			var filepath=path.resolve(process.cwd(),file.path);
			var filedir=path.dirname(filepath);
			var extension=file.extension;
			var fileExist=false;

			var fileBuff=fs.readFileSync(filepath);
			var md5Str=md5(fileBuff);
			ori_name=md5Str.substr(0,8)+"."+extension;
			var newpath=path.join(filedir,ori_name);
			
			if(fs.existsSync(newpath)){
				fileExist=true;
			}
			fs.renameSync(filepath,newpath);//重命名文件
			//fs.unlinkSync(filepath);
			//console.log("filepath=["+filepath+"]");
			//console.log("filedir=["+filedir+"]");
			//console.log("newpath=["+newpath+"]");
			
		}
		res.set({
		  'Content-Type': 'text/plain',
		});
		var result={
			ec:0,
			fileurl:"http://9.url.cn/edu/banner/img/"+ori_name,
			fileExist:fileExist
		};
		res.end(JSON.stringify(result));
	});
}
