var mongoose = require('mongoose');
//连接本地名为test的数据库，格式
//var db = mongoose.connect("mongodb://user:pass@localhost:port/database");
var db = mongoose.connect("mongodb://127.0.0.1:27017/blog");
var userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String }
});
var User = db.model('User', userSchema); //创建model，在内存中创建结构为userSchema的user集合

module.exports = User;