var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql_connection');
var request = mysql.request;
/* GET home page. */
router.post('/collect', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from collection where userName= ${req.body.userName} and carId= ${req.body.carId}`, (data) => {
    if(data.result.length==0){
    request(`insert into collection values(${req.body.userName},${req.body.carId},${req.body.status},now())`, (data) => {
      res.send({code:0});
    })
    }else{
      request(`update collection set status= ${req.body.status} where userName= ${req.body.userName} and carId= ${req.body.carId}`, (data) => {
        res.send({code:0});
      })
    }
  })
});
  router.post('/baseInfo', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    request(`select headPic,nickName,phone,sex,birthday,registerDay from user where userName= ${req.body.userName}`, (data) => {
      if(data.code==0){
        res.send(data.result[0])
      }else{
        res.send({code:'10005'})
      }
    })
});

router.post('/setInfo', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update user set nickName = '${req.body.form.nickName}',phone = ${req.body.form.phone},sex = '${req.body.form.sex}',birthday = '${req.body.form.birthday}' where userName= ${req.body.userName}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/updateHeadPic', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from user where userName= ${req.body.userName}`, (data) => {
    if(data.code==0){
      res.send(data.result[0])
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/collection', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from car where carId in (select carId from collection where userName= ${req.body.userName} and status = true order by update_time desc) order by status asc`, (data) => {
    if(data.code==0){
      let result=data.result
      res.send({result,code:0})
    }else{
      res.send({code:'10003'})
    }
  })
});

router.post('/mySold', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from car where userName = ${req.body.userName} order by status asc`, (data) => {
    if(data.code==0){
      let result=data.result
      res.send({result,code:0})
    }else{
      res.send({code:'10004'})
    }
  })
});

router.post('/setSuggest', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let id = new Date().getTime()+Math.round(Math.random()*100)
  request(`insert into suggestion values(${id},${req.body.userName},'${req.body.suggestion}',0,now())`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10004'})
    }
  })
});

router.post('/getApply', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from apply where userName = ${req.body.userName}`, (data) => {
    if(data.code==0){
      let result=data.result
      res.send({result,code:0})
    }else{
      res.send({code:'10004'})
    }
  })
});

router.post('/getAppoint', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select car.*,appoint.status AS apStatus from car,appoint where car.carId=appoint.carId AND car.carId in (select carId from appoint where userName = ${req.body.userName}) order by appoint.status asc`, (data) => {
    if(data.code==0){
      let result=data.result
      res.send({result,code:0})
    }else{
      res.send({code:'10004'})
    }
  })
});

router.post('/cancelApply', function (req, res) {
  request(`update apply set status = 1 where applyId=${req.body.applyId}`, (data) => {
    if(data.code==0){
      res.send({isSuccess:true});
    }else{
      res.send({isSuccess:false});
    }
  })
})


module.exports = router;