var mysql  = require('mysql'); 

var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'test',
});

connection.connect();

//查 query
var request=(userGetSql,callback)=>{
  connection.query(userGetSql,function (err, result) {

          if(err){

            console.log('[SELECT ERROR] - ',err.message);
            var error=err.message;
            var data={ error,'code':10001 }
            callback(data) 
            return;

          }       
        var data={ result,'code':0 }
        console.log(data);  
        callback(data) 

  });
}

// var  userGetSql = 'SELECT * FROM student';
// request(userGetSql);

exports.request=request;

