var express = require('express');
var router = express.Router();

var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;

router.post('/newCar', function (req, res) {
    let id=new Date().getTime()+Math.round(Math.random()*100);
    request(`insert into user (userName,passWord,phone,nickName,headPic,registerDay) values(${req.body.userName},${req.body.passWord},${req.body.phone},${req.body.userName},'http://localhost:8888/headpic.jpg','${now}')`,(questions)=>{
      if(questions.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
})