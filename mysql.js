let mysql = require('mysql');
let con=mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'lanqiao_wp3',
    connectionLimit:10
})

module.exports=con;