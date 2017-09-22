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
    Post.find({}, function(err, data) {
        if (err) {
            return res.redirect('/');
        }
        console.log(data);
        res.render('index', {
            title: '首页',
            login: req.session.login == '1' ? true : false,
            username: req.session.username,
            posts: data,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });
    });

});
module.exports = router;