var express = require('express');
var router = express.Router();

var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;

router.post('/login', function(req, res, next) {
  request(`select status from admin where adminName = '${req.body.adminName}' and passWord = '${req.body.passWord}'`,(data)=>{
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
    if(data.carId == ''){
      data.userName = data.userName || "manager"
      if(data.applyId!=''){
          request(`update apply set status = '2' where applyId= ${data.applyId}`, (questions) => {
            if(questions.code==0){
              request(`insert into car (carId,userName,carImg,carTitle,carBrand,buyTime,price,annualRisk,compulsoryInsurance,commercialInsurance,emissionStandard,emissions,mileage,transferTimes,variableSpeed,introduction,assess,updateTime) values(${id},'${data.userName}','${data.carImg}','${data.carTitle}','${data.carBrand}','${data.buyTime}','${data.price}','${data.annualRisk}','${data.compulsoryInsurance}','${data.commercialInsurance}','${data.emissionStandard}','${data.emissions}','${data.mileage}','${data.transferTimes}','${data.variableSpeed}','${data.introduction}','${data.assess}',now())`,(question)=>{
                if(question.code==0)
                res.send({isSuccess:true});
                else
                res.send({isSuccess:false});
              })
            }else{
              res.send({code:'10002'})
            }
          })
      }else{
            request(`insert into car (carId,userName,carImg,carTitle,carBrand,buyTime,price,annualRisk,compulsoryInsurance,commercialInsurance,emissionStandard,emissions,mileage,transferTimes,variableSpeed,introduction,assess,updateTime) values(${id},'${data.userName}','${data.carImg}','${data.carTitle}','${data.carBrand}','${data.buyTime}','${data.price}','${data.annualRisk}','${data.compulsoryInsurance}','${data.commercialInsurance}','${data.emissionStandard}','${data.emissions}','${data.mileage}','${data.transferTimes}','${data.variableSpeed}','${data.introduction}','${data.assess}',now())`,(questions)=>{
      if(questions.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
      }

  }else{
    request(`update car set carImg='${data.carImg}',carTitle='${data.carTitle}',carBrand='${data.carBrand}',buyTime='${data.buyTime}',price='${data.price}',annualRisk='${data.annualRisk}',compulsoryInsurance='${data.compulsoryInsurance}',commercialInsurance='${data.commercialInsurance}',emissionStandard='${data.emissionStandard}',emissions='${data.emissions}',mileage='${data.mileage}',transferTimes='${data.transferTimes}',variableSpeed='${data.variableSpeed}',introduction='${data.introduction}',assess='${data.assess}' where carId = '${data.carId}'`,(questions)=>{
      if(questions.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
  }
})

router.post('/setAdmin', function (req, res) {
  let data=req.body
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
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}
})

router.post('/deleteAdmin', function (req, res, next) {
  request(`delete from admin where adminId= ${req.body.adminId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteCar', function (req, res, next) {
  request(`delete from car where carId= ${req.body.carId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/deleteApply', function (req, res, next) {
  request(`delete from apply where applyId= ${req.body.applyId}`, (data) => {
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
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getDetail', function (req, res, next) {
  request(`select * from car where carId= ${req.body.carId}`, (data) => {
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
    if(data.code==0){
      res.send(data.result)
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setCarStatus', function (req, res, next) {
  request(`update car set status = '${req.body.status}' where carId= ${req.body.carId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getApplyList', function (req, res, next) {
  let title=''
  if(req.body.search!=''){
    title = `and apply.name like '%${req.body.search}%'`
  }
  request(`select apply.*,user.nickName from apply,user where  apply.userName = user.userName ${ title } order by status asc,update_time Desc`, (data) => {
    if(data.code==0){
      res.send(data.result)
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/setApplyStatus', function (req, res, next) {
  request(`update apply set status = '${req.body.status}' where applyId= ${req.body.applyId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getAppointList', function (req, res, next) {
  let title=''
  if(req.body.search!=''){
    title = `and appoint.carTitle like '%${req.body.search}%'`
  }
  request(`select appoint.*,user.nickName AS name,user.phone from appoint,user where appoint.userName = user.userName ${ title } order by status asc,update_time Desc`, (data) => {
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
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getBrand', function(req, res, next) {
  let title=''
  if(req.body.search){
    title = `where brand like '%${req.body.search}%'`
  }
  request(`select * from brand ${title} Order By update_time Desc`,(data)=>{
    if(data.code==0)
      res.send({data});
    else{
      res.send({code:10005})
    }
  })
});

router.post('/setBrand', function (req, res) {
  let data=req.body
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
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
}
})

router.post('/deleteBrand', function (req, res, next) {
  request(`delete from brand where brandId= ${req.body.brandId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getSuggest', function(req, res, next) {
  let title=''
  if(req.body.search!=''){
    title = `and suggestion.suggestion like '%${req.body.search}%'`
  }
  request(`select suggestion.*,user.nickName,user.phone from suggestion,user where user.userName = suggestion.userName ${title} order by status asc, update_time Desc`,(data)=>{
    if(data.code==0)
      res.send(data.result);
    else{
      res.send({code:10005})
    }
  })
});

router.post('/setSuggestStatus', function (req, res, next) {
  request(`update suggestion set status = '${req.body.status}' where suggestId= ${req.body.suggestId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getAdmin', function(req, res, next) {
  let title=''
  if(req.body.search!=''){
    title = `and adminName like '%${req.body.search}%'`
  }
  request(`select * from admin where status = 1 ${title} Order By update_time Desc`,(data)=>{
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
  request(`update hotBrand set hotBrand = '${req.body.hotBrand}' where hotId= ${req.body.hotId}`, (data) => {
    if(data.code==0){
      res.send({code:0})
    }else{
      res.send({code:'10002'})
    }
  })
});

router.post('/getChart', function(req, res, next) {
  request(`select carBrand as name,COUNT(*) as value from car GROUP BY carBrand order by COUNT(*) desc limit 5`,(data)=>{
    if(data.code==0)
      res.send(data.result);
    else{
      res.send({code:10005})
    }
  })
});

router.post('/getPriceChart', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let sql=`select t1.p1 as num1,t2.p2 as num2,t3.p3 as num3,t4.p4 as num4,t5.p5 as num5,t6.p6 as num6 from
(select count(price) as p1 from car where price>=0 and price <10 ) t1 INNER JOIN
(select count(price) as p2 from car where price>=10 and price <20 ) t2 INNER JOIN
(select count(price) as p3 from car where price>=20 and price <30) t3 INNER JOIN
(select count(price) as p4 from car where price>=30 and price <40) t4 INNER JOIN
(select count(price) as p5 from car where price>=40 and price <50) t5 INNER JOIN
(select count(price) as p6 from car where price>=50) t6`

  request(`${sql}`,(data)=>{
    if(data.code==0)
      res.send(data.result);
    else{
      res.send({code:10005})
    }
  })
});

module.exports = router;