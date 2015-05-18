/**
 * 理财计算器脚本
 * @param amount 出借金额
 * @param rating 年利率
 * @param qx 期限
 * @param type 还款方式
 */
function beginJs(toal,rating,month,type){
	var yln = parseFloat(rating)/12;
	if(type == "DEBX"){
//		yln = yln/100;
	   //月还本息
	   //power（1+x,n）*x*y/ (power（1+x,n）-1)
	   var yhbx = ((Math.pow(1+yln, month)*yln*parseInt(toal))/(Math.pow(1+yln, month)-1)).toFixed(2);
	   
	//应收利息
	 var yslxh = 0; 
		 
	//已还本金之和	 
	 var totalYhbj = 0;
	 var dsbj = 0;
	 var yhbj = 0;
	 var  interest_cur = 0;
	 var zhdhbj = toal;
	 for(var i=1;i<=month;i++){
	  	 //应还利息
	  	interest_cur = parseFloat(Subtr(toal,totalYhbj)*yln).toFixed(2);
	  	//应还本金
	  	yhbj = parseFloat(Subtr(yhbx, interest_cur)).toFixed(2);
	    
	  	 totalYhbj =accAdd(totalYhbj, yhbj);
	  	//待收本金
	    dsbj  = parseFloat(Subtr(toal, totalYhbj)).toFixed(2);
	    
	    if(i == (month-1)){
	    	zhdhbj =  dsbj;
	    }
	    if(i == month){
	    	yhbj = zhdhbj;
	    	 //应还利息
		  	interest_cur = parseFloat(Subtr(yhbx, yhbj)).toFixed(2);
		  	totalYhbj =accAdd(totalYhbj, yhbj);
		  	dsbj  = 0;
	    }
		yslxh=accAdd(yslxh, interest_cur);
	 }
	 return (yslxh.toFixed(2));
	}else if(type == "DEBJ"){
	 	//月利息
		 var new_ysbx = 0;
		 var new_ysbj = 0;
		 var new_yslx = 0;
		 var new_sybj = 0;
		 var yslxTotle = 0;
		 var ysbjTotle = 0;
		 new_ysbj = parseInt(toal).div(month);
		 for(var i=1;i<=month;i++){
			 new_yslx = (toal - ysbjTotle)*(yln);
			 ysbjTotle = ysbjTotle + new_ysbj;
			 new_ysbx = new_yslx + new_ysbj;
			 new_sybj = toal - new_ysbj*i;
			yslxTotle = accAdd(yslxTotle,new_yslx);
		 }
		 
		 return (yslxTotle.toFixed(2));
	}else if(type == "YCFQ"){
	   //还利息
	   var yslx = (yln * parseInt(toal) * month);
	   return (yslx.toFixed(2));
	 
	}else if(type == "MYFX"){
	  //月还本息
	   var yslx = (yln * parseInt(toal));
	   var yslxTotle = 0;
	 for(var i=1;i<=month;i++){
		 var new_ysbx = 0;
		 var new_ysbj = 0;
		 var new_yslx = 0;
		 var new_sybj = parseInt(toal);
		 new_yslx = yslx;
		 if(i == month){
			 new_ysbj = parseInt(toal);
			 new_sybj = 0;
		 }
		 new_ysbx = new_yslx + new_ysbj;
	  	 
		yslxTotle  = accAdd(yslxTotle,new_yslx.toFixed(2));
		
	 }
	 
	 return (yslxTotle.toFixed(2));
	}
}

function Subtr(arg1,arg2){
	var r1,r2,m,n;
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
	try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
	m=Math.pow(10,Math.max(r1,r2));
     //last modify by deeka
	 //动态控制精度长度
	n=(r1>=r2)?r1:r2;
	return ((arg1*m-arg2*m)/m).toFixed(n);
}
Number.prototype.substr = function (arg){
	return Subtr(this, arg);
};

function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
	try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
	m=Math.pow(10,Math.max(r1,r2));
	return (arg1*m+arg2*m)/m;
}

Number.prototype.add = function (arg){
	return accAdd(arg,this);
};

