var express = require('express');
var router = express.Router();
var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;
/* GET home page. */
router.post('/carList', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let title=''
  let brand=''
  let lowPrice=''
  let highPrice=''
  if(req.body.params.searchVal!='') title=`carTitle like '%${req.body.params.searchVal}%' and `
  if(req.body.params.brand!='') brand=`carBrand = '${req.body.params.brand}' and `
  if(req.body.params.lowPrice!='') lowPrice=`price >= ${req.body.params.lowPrice} and `
  if(req.body.params.highPrice!='') highPrice=`price <= ${req.body.params.highPrice} and `
  let condition=title+brand+lowPrice+highPrice;
  if(condition!=''){
    condition=condition.substring(0,condition.length-4)
  }else{
    condition='carId IS NOT NULL'
  }
  request(`select * from car where ${condition} and status=0 order by carId desc limit ${10*req.body.page},10`,(data)=>{
    res.send({data});
  })
});

router.post('/getHot', function(req, res, next) {
  request(`select * from car where status=0 order by clickNum desc limit 0,5 `,(data)=>{
    res.send({data});
  })
});

router.post('/getSimilar', function(req, res, next) {
  request(`select * from car where price <=${req.body.price} and carId != ${req.body.carId} and status=0 order by price desc limit 0,5 `,(data)=>{
    res.send({data});
  })
});

router.post('/updateClickNum', function(req, res, next) {
  request(`update car set clickNum = ${req.body.clickNum} where carId=${req.body.carId}`,(data)=>{
    res.send({data});
  })
});

router.post('/carDetail', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from car where carId = ${req.body.carId}`,(data)=>{
    res.send({data});
  })
});

router.post('/getBrand', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select brand from brand`,(data)=>{
    if(data.code==0)
      res.send({data});
    else{
      res.send({code:10005})
    }
  })
});

router.post('/isCollect', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select status from collection where carId = ${req.body.carId} and userName = ${req.body.userName}`,(data)=>{
    if(data.code==0){
      res.send(data.result);
    }else{
      res.send([{'status':false}]);
    }
    
  })
});

router.post('/appoint', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from appoint where userName= ${req.body.userName} and carId= ${req.body.carId}`, (data) => {
    if(data.result.length==0){
    request(`insert into appoint (userName,carId) values('${req.body.userName}','${req.body.carId}')`, (data) => {
      if(data.code==0)
      res.send({isSuccess:true});
      else
      res.send({isSuccess:false});
    })
    }else{
      let status=data.result[0].status;
      request(`update appoint set status= ${req.body.status} where userName= ${req.body.userName} and carId= ${req.body.carId}`, (data) => {
        if(status==0){
          res.send({code:0});
        }else{
          if(data.code==0)
          res.send({isSuccess:true});
          else
          res.send({isSuccess:false});
        }
      })
    }
  })
});

// router.post('/appoint', function (req, res) {
//   // console.log(now)
//   request(`insert into appoint (userName,carId,price,carTitle) values('${req.body.userName}','${req.body.carId}','${req.body.price}','${req.body.carTitle}')`,(questions)=>{
//     if(questions.code==0)
//     res.send({isSuccess:true});
//     else
//     res.send({isSuccess:false});
//   })
// })

// router.post('/appoint', function (req, res) {
//   // console.log(now)
//   request(`insert into appoint (userName,carId,price,carTitle) values('${req.body.userName}','${req.body.carId}','${req.body.price}','${req.body.carTitle}')`,(questions)=>{
//     if(questions.code==0)
//     res.send({isSuccess:true});
//     else
//     res.send({isSuccess:false});
//   })
// })

module.exports = router;
