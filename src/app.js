var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
require('./database/conexion')

const modalidad = require('./routes/modalidad.routes')
const categorias = require('./routes/categorias.routes')
const equipos = require('./routes/equipos.routes')
const patrocinantes = require('./routes/patrocinantes.routes')
const usuarios = require('./routes/usuarios.routes')

var app = express();

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/modalidad', modalidad)
app.use('/categorias', categorias)
app.use('/equipos', equipos)
app.use('/patrocinante', patrocinantes)
app.use('/usuarios', usuarios)

// Middleware para manejar rutas no encontradas y devolver error 404
app.use((req, res, next) => {
  res.status(404).json({ status: 404, mensaje: "La ruta que buscas no existe" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
