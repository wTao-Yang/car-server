var express = require('express');
var router = express.Router();

var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;

router.post('/login', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select status from admin where adminName = '${req.body.adminName}' and passWord = '${req.body.passWord}'`,(data)=>{
    console.log(data)
    if(data.result.length!=0)
      res.send({code:0,data:data.result[0]});
    else{
      res.send({code:10005})
    }
  })
});

router.post('/newCar', function (req, res) {
    let id=new Date().getTime()+Math.round(Math.random()*100);
    let data=req.body
    // console.log(data.hasOwnProperty('userName'))
    // console.log(data.userName == undefined)
    if(data.carId == ''){
      data.userName = 'admin'
      console.log(data.userName)

    request(`insert into car (carId,userName,carImg,carTitle,carBrand,buyTime,price,annualRisk,compulsoryInsurance,commercialInsurance,emissionStandard,emissions,mileage,transferTimes,variableSpeed,introduction,assess,updateTime) values(${id},'${data.userName}','${data.carImg}','${data.carTitle}','${data.carBrand}','${data.buyTime}','${data.price}','${data.annualRisk}','${data.compulsoryInsurance}','${data.commercialInsurance}','${data.emissionStandard}','${data.emissions}','${data.mileage}','${data.transferTimes}','${data.variableSpeed}','${data.introduction}','${data.assess}',now())`,(questions)=>{
      if(questions.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
  }else{
    request(`update car set carImg='${data.carImg}',carTitle='${data.carTitle}',carBrand='${data.carBrand}',buyTime='${data.buyTime}',price='${data.price}',annualRisk='${data.annualRisk}',compulsoryInsurance='${data.compulsoryInsurance}',commercialInsurance='${data.commercialInsurance}',emissionStandard='${data.emissionStandard}',emissions='${data.emissions}',mileage='${data.mileage}',transferTimes='${data.transferTimes}',variableSpeed='${data.variableSpeed}',introduction='${data.introduction}',assess='${data.assess}' where carId = '${data.carId}'`,(questions)=>{
      console.log(questions)
      if(questions.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
  }
})

router.post('/setAdmin', function (req, res) {
  let data=req.body
  // console.log(data.hasOwnProperty('userName'))
  // console.log(data.userName == undefined)
  if(data.adminId == ''){
    data.adminId = new Date().getTime()+Math.round(Math.random()*100)

  request(`insert into admin (adminId,adminName,passWord,update_time) values('${data.adminId}','${data.adminName}','${data.passWord}',now())`,(questions)=>{
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}else{
  request(`update admin set adminName='${data.adminName}',passWord='${data.passWord}' where adminId = '${data.adminId}'`,(questions)=>{
    console.log(questions)
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}
})

router.post('/deleteAdmin', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from admin where adminId= ${req.body.adminId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteCar', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from car where carId= ${req.body.carId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteApply', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from apply where applyId= ${req.body.applyId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteAppoint', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from appoint where appointId= ${req.body.appointId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteSuggest', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from suggestion where suggestId= ${req.body.suggestId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getDetail', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from car where carId= ${req.body.carId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send(data.result[0])
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getCarList', function (req, res, next) {
  let title=''
  if(req.body.search!=''){
    title = `where carTitle like '%${req.body.search}%'`
  }
  request(`select * from car ${title} order by status asc, updateTime Desc`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send(data.result)
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setCarStatus', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update car set status = '${req.body.status}' where carId= ${req.body.carId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getApplyList', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select apply.*,user.nickName from apply,user where apply.userName = user.userName order by status asc,update_time Desc`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send(data.result)
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setApplyStatus', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update apply set status = '${req.body.status}' where applyId= ${req.body.applyId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getAppointList', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select appoint.*,user.nickName AS name,user.phone from appoint,user where appoint.userName = user.userName order by status asc,update_time Desc`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send(data.result)
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setAppointStatus', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update appoint set status = '${req.body.status}' where appointId= ${req.body.appointId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getBrand', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from brand Order By update_time Desc`,(data)=>{
    if(data.code==0)
      res.send({data});
    else{
      res.send({code:10005})
    }
  })
});

router.post('/setBrand', function (req, res) {
  let data=req.body
  // console.log(data.hasOwnProperty('userName'))
  // console.log(data.userName == undefined)
  if(data.brandId == ''){
    data.brandId = new Date().getTime()+Math.round(Math.random()*100)
    
  request(`insert into brand (brandId,brand,introduction,update_time) values('${data.brandId}','${data.brand}','${data.introduction}',now())`,(questions)=>{
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}else{
  request(`update brand set brand='${data.brand}',introduction='${data.introduction}' where brandId = '${data.brandId}'`,(questions)=>{
    console.log(questions)
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}
})

router.post('/deleteBrand', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`delete from brand where brandId= ${req.body.brandId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getSuggest', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select suggestion.*,user.nickName,user.phone from suggestion,user where user.userName = suggestion.userName order by status asc, update_time Desc`,(data)=>{
    if(data.code==0)
      res.send(data.result);
    else{
      res.send({code:10005})
    }
  })
});

router.post('/setSuggestStatus', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update suggestion set status = '${req.body.status}' where suggestId= ${req.body.suggestId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getAdmin', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from admin where status = 1 Order By update_time Desc`,(data)=>{
    if(data.code==0)
      res.send(data.result);
    else{
      res.send({code:10005})
    }
  })
});

router.post('/setWheel', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update wheel set img = '${req.body.img}',carId = '${req.body.carId}' where wheelId= ${req.body.wheelId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setHotBrand', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`update hotBrand set hotBrand = '${req.body.hotBrand}' where hotId= ${req.body.hotId}`, (data) => {
    console.log(data)
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

module.exports = router;