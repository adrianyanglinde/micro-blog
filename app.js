var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);    //把会话信息存储在数据库中的模块
var settings = require('./settings');      
var routes = require('./routes');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer());  for parsing multipart/form-data
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    db: settings.db,
    url: 'mongodb://localhost/blog'
  })
}));
app.use(flash());
app.use('/static',express.static(path.join(__dirname, 'public')));


//视图
app.use(function(req,res,next){
    res.locals.user = req.session.user;

    var err = req.flash('error');
    var success = req.flash('success');

    res.locals.error = err.length ? err : null;
    res.locals.success = success.length ? success : null;

    next();
});


// routers
// 将路由挂载至应用
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//启动服务监听
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
