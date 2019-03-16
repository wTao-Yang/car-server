var express = require('express');
var router = express.Router();

var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;
/* GET home page. */
// router.post('/login', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   let userName=req.body.userName;
//   let passWord=req.body.passWord;
//   if(userName=='123456' && passWord == '123456'){
//     res.send({code:0, isSuccess:true})
//   }else{
//     res.send({code:00001, isSuccess:false})
//   }
// });

// router.post('/register', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   let userName=req.body.userName;
//   let passWord=req.body.passWord;
//   let phone = req.body.phone;
//   if(userName!='123456'){
//     res.send({code:0, isSuccess:true})
//   }else{
//     res.send({code:00001, isSuccess:false})
//   }


router.post('/register', function (req, res) {
  let date=new Date();
  let now = `${date.getFullYear().toString()}-${(date.getMonth()+1).toString()}-${date.getDate().toString()}`
  // console.log(now)
  request(`insert into user values(${req.body.userName},${req.body.passWord},${req.body.phone},${req.body.userName},'http://localhost:8888/aaa.jpg','${now}')`,(questions)=>{
    console.log(questions)
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
})
   
router.post('/login', function (req, res) {
    console.log(req.body)
    request(`select * from user where userName=${req.body.userName} and passWord=${req.body.passWord}`,(questions)=>{
      console.log(questions)
      if(questions.result.length!=0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
})

module.exports = router;
