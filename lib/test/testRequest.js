var request=require("request");
var opt={
  url:"http://172.20.20.108:8113/weixin/account/send/index"
}
request(opt, function(err, response, body) {
    //console.log("body :",body);
    //response.pipe(res);
    //console.log("res",res);
    //console.log("response.headers", response.headers);
    //console.log(response.headers["content-encoding"]);
    //console.log("statusCode",response.statusCode);
    if (err) {
      console.log("转发error", err);
      return;
    }
  });