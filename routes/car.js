var express = require('express');
var router = express.Router();
var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;
/* GET home page. */
router.post('/carList', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
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
  // if(condition==''){
  //   condition='carId IS NOT NULL and'
  // }
  console.log(condition)
  request(`select * from car where ${condition} order by carId desc limit ${10*req.body.page},10`,(data)=>{
    res.send({data});
  })
});

router.post('/getHot', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
  request(`select * from car order by clickNum desc limit 0,5 `,(data)=>{
    res.send({data});
  })
});

router.post('/updateClickNum', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
  request(`update car set clickNum = ${req.body.clickNum} where carId=${req.body.id}`,(data)=>{
    res.send({data});
  })
});

router.post('/carDetail', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
  request(`select * from car where carId = ${req.body.carId}`,(data)=>{
    res.send({data});
  })
});

router.post('/getBrand', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
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
  console.log(req.body)
  request(`select status from collection where carId = ${req.body.carId} and userName = ${req.body.userName}`,(data)=>{
    if(data.code==0){
      res.send(data.result);
    }else{
      res.send([{'status':false}]);
    }
    
  })
});

module.exports = router;
