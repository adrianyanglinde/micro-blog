var express = require('express');
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
  
});

/* POST regist page. */
router.post('/reg', function(req, res, next) {
  
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  
});

/*其中 /post、/login 和 /reg 由于要接受表单信息，因此使用 app.post 注册路由*/


module.exports = router;
