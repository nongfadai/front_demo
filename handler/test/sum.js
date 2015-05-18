module.exports=function(req,res){
	var a=req.query.a||0;
	var b=req.query.b||0;
	
	return {
		a:a,
		b:b,
		sum:parseInt(a)+parseInt(b)
	}
}