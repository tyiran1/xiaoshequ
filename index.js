let express = require('express');
let userRouter =require('./router/userRouter');
let articleRouter =require('./router/articleRouter')
let body=require('body-parser');
let app=express();
app.listen(3001);
// 跨域中间件
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', ['mytoken','Content-Type']);
	next();
});
// 作用：获取post请求的数据
app.use(body.urlencoded({extended:false}));
app.use("/api",userRouter);
app.use("/api",articleRouter);

app.use(express.static('public'))


// 需要下载的第三方：
// 1，express 
//   npm install express 
// 2，mysql
// npm install mysql 
// 3，body-parser
// npm install body-parser 
