var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var fs = require("fs");//操作文件
var multer = require('multer');//接收图片
var mysql=require('./public/javascripts/mysql_connection');
var request=mysql.request;

let baseUrl='http://localhost:8088/'


var indexRouter = require('./routes/index');
var shopRouter = require('./routes/shopCar');
var carRouter = require('./routes/car');
var selfRouter = require('./routes/self');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '1728000');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/shopCar', shopRouter);
app.use('/cars', carRouter);
app.use('/self', selfRouter);

var upload = multer({
  dest: './uploads'
});//定义图片上传的临时目录

// 单域多文件上传：input[file]的 multiple=="multiple"
app.post('/uploads', upload.array('imageFile', 5), function(req, res, next) {
  // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
  let fileNames=[]
  console.log(req.body)
  for (var i = 0; i < req.files.length; i++) {
      // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
      // 对临时文件转存，fs.rename(oldPath, newPath,callback);
      let fileName=Date.now() +'-'+req.files[i].originalname;
      fileNames.push(baseUrl+fileName)
      fs.rename(req.files[i].path, "uploads/" + fileName, function(err) {
          if (err) {
              throw err;
          }
      })
  }
  let name=fileNames.join(',')
  request(`UPDATE car SET carImg = '${name}' WHERE carId = ${req.body.carId}`,(questions)=>{
    if(questions.code==0){
        res.send({code:0});
    }else{
        res.send({code:10003})
    }
})  
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"//允许跨域。。。
  // });
  //   // req.body 将具有文本域数据, 如果存在的话
  // res.end(JSON.stringify(req.files)+JSON.stringify(req.body));
})

// 单域单文件上传：input[file]的 multiple != "multiple"
app.post('/upload', upload.single('imageFile'), function(req, res, next) {
  // req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）
  let fileName= Date.now() +'-'+ req.file.originalname;
  fs.rename(req.file.path, "uploads/"+fileName, function(err) {
    request(`UPDATE user SET headPic = '${baseUrl}${fileName}' WHERE userName = ${req.body.userName}`,(questions)=>{
      if(questions.code==0){
          res.send({code:0});
      }else{
          res.send({code:10003})
      }
  })  
    if (err) {
          res.send(err)
      }
  })
  // res.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*"
  // });
  // res.end(JSON.stringify(req.file)+JSON.stringify(req.body));
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
