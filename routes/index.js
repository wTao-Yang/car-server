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
  request(`insert into user (userName,passWord,phone,nickName,headPic,registerDay) values(${req.body.userName},${req.body.passWord},${req.body.phone},${req.body.userName},'headpic.jpg','${now}')`,(questions)=>{
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
})
   
router.post('/login', function (req, res) {
    request(`select * from user where userName=${req.body.userName} and passWord=${req.body.passWord}`,(questions)=>{
      if(questions.result.length!=0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
})

router.post('/isForget', function (req, res) {
  request(`select * from user where userName=${req.body.userName} and phone=${req.body.phone}`,(questions)=>{
    if(questions.result.length!=0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
})

router.post('/updatePSW', function (req, res) {
  request(`update user set passWord = '${req.body.passWord}' where userName= ${req.body.userName}`, (data) => {
    if(data.code==0){
      res.send({isSuccess:true});
    }else{
      res.send({isSuccess:false});
    }
  })
})

router.post('/getHotBrand', function(req, res, next) {
  request(`select * from hotBrand limit 0,4 `,(data)=>{
    res.send({data});
  })
});

router.post('/getWheel', function(req, res, next) {
  request(`select * from wheel limit 0,5 `,(data)=>{
    res.send({data});
  })
});

module.exports = router;
