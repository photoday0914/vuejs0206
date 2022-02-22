var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require('cors');

// var authRouter = require('./routes/auth.routes');
// var pageRouter = require('./routes/user.routes');

var app = express();
var passport  = require('passport');
var session   = require('express-session');

app.set('view engine', 'ejs');
app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//passport init
app.use(passport.initialize());
app.use(passport.session());

// database
const db = require("./models");


db.sequelize.sync();

// app.use('/', authRouter);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening at localhost:${process.env.PORT}`);
});

// module.exports = app;
