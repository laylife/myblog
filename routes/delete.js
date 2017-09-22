var express = require('express');
var Post = require('../models/post.model.js');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
// 该路由使用的中间件

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    var id = req.query.id;
    console.log(id);
    Post.remove({ '_id': id }, function(err) {
        if (err) {
            return res.send('服务器错误!');
        }
        console.log('删除成功');
        res.redirect('/');
    });

});
module.exports = router;