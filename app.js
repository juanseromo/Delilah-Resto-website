const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const prodRouter = require('./routes/productos');
const poRouter = require('./routes/pedidos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express)

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(cookieParser({
    //secure: true,
    httpOnly: true,
    //domain: 'example.com',
    //path: '/login',
    //expires: expiryDate
  })
)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/productos', prodRouter);
app.use('/pedidos', poRouter);

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
  res.render('error');
});

app.disable('x-powered-by')

module.exports = app;
