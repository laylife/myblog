var express = require('express');
var Post = require('../models/post.model.js');
var path = require('path');
var router = express.Router();
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    if (req.session.login != '1') {
        return res.send('查看详情请登录!');
    }
    var id = req.query.id;
    console.log(id);
    var num = 0;
    if (id != null) {
        num += 1;
        Post.update({ "_id": id }, { $set: { "pv": num } }, function(err) {
            if (err) {
                console.log(err);
                return res.redirect("/");;
            };
            console.log("浏览数量+1");
        });

        Post.findById(id, function(err, data) {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            console.log(data.postImg);

            var pathObj = path.parse(data.postImg);
            var name = pathObj.base;
            console.log(name);
            res.render('detail', {
                title: '文章详情页',
                login: req.session.login == '1' ? true : false,
                username: req.session.username,
                posts: data,
                img: name
            });
        });
    }

});

module.exports = router;