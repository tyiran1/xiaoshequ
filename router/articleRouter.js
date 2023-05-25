let express = require('express');
let con = require('../mysql')
let router=express.Router();

// 首页查询所有文章列表
router.get('/articleList',(req,res)=>{
  let sql="select * from article order by time desc";
  con.query(sql,(err,result)=>{

    // 把数据传给前端
    res.send(JSON.stringify(result)) ;
  })
})

// 文章列表
router.get("/classifyArticleList/:classify",(req,res)=>{
  let classify=req.params.classify;

  let sql="select * from article where classify=?";
  let data=[classify]
  con.query(sql,data,(err,result)=>{

    res.send(JSON.stringify(result))
  })
})

// 文章增加
router.post("/addArticle",(req,res)=>{

  let title=req.body.title;
  let desc=req.body.desc;
  let author=req.body.author;
  let authorId=req.body.authorId;
  let classify= req.body.classify;
  let content=req.body.content;
  let time = req.body.time;
 
  let sql="insert into article(title,descs,author,authorId,classify,content,time) value(?,?,?,?,?,?,?)";
  let data=[title,desc,author,authorId,classify,content,time];
  con.query(sql,data,(err,result)=>{
    if(err) throw err;
  
    if(result.affectedRows>0){
      res.send("1")
    }else{
     res.send("0")
    }
  })




})
// 查看文章详情
router.get("/findArticleDetails/:id",(req,res)=>{

  let id=req.params.id;
  let sql="select * from article where id=?";
  let data=[id];
  con.query(sql,data,(err,result)=>{
    if(err) throw err;

    if(result.length>0){// 查到文章
       res.send(JSON.stringify(result))// 转成json数据返回给前端
    }else{
      res.send("0");// 没有查到文章
    }
  })

})

// 查找个人中心文章列表
router.get('/myArticleList/:id',(req,res)=>{
  let id= req.params.id;

  let sql="select * from article where authorId=? order by time desc";
  let data=[id];
  con.query(sql,data,(err,result)=>{
    if(err) throw err;
  
    res.send(JSON.stringify(result))
  })
})
// 文章删除
router.get('/deleteArticle/:id',(req,res)=>{
  let id = req.params.id;
  let sql="delete from article where id=?";
  let data=[id];
  con.query(sql,data,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send("1")
    }
 
  })
})

module.exports=router;
