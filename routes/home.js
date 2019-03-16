var express = require('express');
var router = express.Router();
var mysql=require('../public/javascripts/mysql_connection');
var request=mysql.request;
/* GET home page. */
router.post('/carList', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  request(`select * from car`,(data)=>{
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
