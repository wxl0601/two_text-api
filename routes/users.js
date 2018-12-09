var express = require('express');
var router = express.Router();
var query = require('../mysql/query');
var sql = require('../mysql/sql')

/* GET users listing. */
router.get('/api/list', function(req, res, next) {

  var pageSize = req.query.pageSize,
      pageNum = req.query.pageNum;
  query(sql.COUNT_SELECT,function(err,results){
    if(err){
      res.send({code0,msg:err})
    }else{
      var count = results[0]['count(*)'];
      var total = Math.ceil(count/pageSize)

      queryUserList(total)
    }
  })

  function queryUserList(total){
    var start = (pageNum - 1) * pageSize;
    var sqls = `select * from img limit ${start},${pageSize}`
    query(sqls,function(err,results){
      if(err){
        res.send({code:0,msg:err})
      }else{
        res.send({code:1,date:results,total});
      }
    })

  }
  
 
});

router.post('/api/add', function(req, res, next) {
  
  query(sql.ADD_SELECT,[req.body.url],function(err,results){
    if(err){
      res.send({code:0,msg:err})
    }else{
      res.send({code:1,date:"成功添加"});
    }
  })
});


module.exports = router;
