var express = require('express');
var flash = require('connect-flash');
var User = require('../models/users');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET user page. */
router.get('/u/:user', function(req, res, next) {

});

/* POST publish page. */
router.post('/publish', function(req, res, next) {
  
});

/* GET regist page. */
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'regist' });
});

/* POST regist page. */
router.post('/reg', function(req, res, next) {

  if(req.body['password'] !== req.body['password-repeat']){
    req.flash('error','两次输入口令不一样');
    return res.redirect('/reg')
  }

  //新建用户
  var newUser = new User({
    'name' : req.body.username,
    'password' : req.body.password
  });

  //查询用户
  User.get(newUser.name,function(error,user){
    if(user){
      error = "Username already exists."
    }
    if(error){
      req.flash('error',error);
      return res.redirect('/reg')
    }

    //新增用户
    newUser.save(function(error){
      if(error){
        req.flash('error',error);
        return res.redirect('/reg')
      }
      req.session.user = newUser;  //向会话对象写入了当前用户的信息
      req.flash('success','regist success!');
      return res.redirect('/')
    })
  })

});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  User.get(req.body.username,function (error,user) {
    if(error){
      req.flash('error',error);
      return res.redirect('/login')
    }
    if(!user){
      req.flash('error','用户不存在');
      return res.redirect('/login')
    }
    if(req.body.password !== user.password){
      req.flash('error','密码错误');
      return res.redirect('/login')
    }
    req.session.user = user;  //向会话对象写入了当前用户的信息
    req.flash('success','login success!');
    return res.redirect('/')

  })
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.user = null;  //向会话对象写入了当前用户的信息
  req.flash('success','logout success!');
  return res.redirect('/')
});

/*其中 /post、/login 和 /reg 由于要接受表单信息，因此使用 app.post 注册路由*/


module.exports = router;
