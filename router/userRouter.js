let express = require('express');
let con = require('../mysql')
let router=express.Router();

router.get("/authorsList",(req,res)=>{
    let sql="select * from user";
    con.query(sql,(err,result)=>{
        res.send(JSON.stringify(result))
    })
})
// 用户登陆
router.post('/userLogin',(req,res)=>{
    console.log('222');
    console.log(req.body);
let userName = req.body.userName;
let userPassword = req.body.userPassword;
let sql="select * from user where userName=? and userPassword=?";
let data=[userName,userPassword];
con.query(sql,data,(err,result)=>{
    console.log(result);
    if(result.length>0){
        res.send(JSON.stringify(result[0])) 
    }else{
        res.send("0")
    }
})
})
// 用户注册

router.post("/addUser",(req,res)=>{
    console.log(req.body);
    let userName = req.body.userName;
    let userPassword=req.body.userPassword;
    let userDesc=req.body.userDesc;
    let headImg=req.body.userImg;
    let createTime=req.body.createTime;
    let data=[userName,userPassword,userDesc,headImg,createTime];
    let sql="insert into user(userName,userPassword,userDesc,headImg,createTime) values(?,?,?,?,?)";
    con.query(sql,data,(err,result)=>{
        if(result.affectedRows>0){
            let sql2="select * from user where userName=? and userPassword=?";
            let data2=[userName,userPassword];
            con.query(sql2,data2,(err,result2)=>{
                if(result2.length>0){
                    res.send(JSON.stringify(result2[result2.length-1]))
                }else{
                    res.send("0")
                }
            })
        }
    })
})

// 个人中心
router.post("/myArticleList",(req,res)=>{
    
})


module.exports=router;
