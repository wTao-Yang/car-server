var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/mysql_connection');
var request = mysql.request;

router.post('/apply', function (req, res) {
  let date=new Date();
  let now = `${date.getFullYear().toString()}-${(date.getMonth()+1).toString()}-${date.getDate().toString()}`
  // console.log(now)
  request(`insert into apply (userName,name,phone,brand,mileage,price,year) values('${req.body.userName}','${req.body.form.name}','${req.body.form.phone}','${req.body.form.brand}','${req.body.form.mileage}','${req.body.form.price}','${req.body.form.year}')`,(questions)=>{
    if(questions.code==0)
    res.send({isSuccess:true});
    else
    res.send({isSuccess:false});
  })
})
module.exports = router;
