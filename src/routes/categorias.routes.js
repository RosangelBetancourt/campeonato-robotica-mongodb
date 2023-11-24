var express = require('express');
var router = express.Router();
const Categorias = require('../controller/categorias.controller');
const checkAutenticacion = require('../controller/service/jwtAuth');

/* Agregar Categorias */
router.post('/agregar', function(req, res, next){
    roles = ["Editor"];
    checkAutenticacion(req, res, next, roles);
  }, function (req, res, next) {
    Categorias.agregar(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({"status": 400, mensaje: error})
    })
})

/* Mostrar Categorias */
router.get('/', function(req, res, next){
    roles = ["Admin", "Editor"];
    checkAutenticacion(req, res, next, roles);
  }, function (req, res, next) {
    Categorias.listar()
    .then((resultado) => {
        res.status(200).json({"status": 200, "data": resultado})
    })
    .catch((error) => {
        reject(error)
    })
});

/* Editar Categorias */
router.put('/editar/:id', function(req, res, next){
    roles = ["Admin", "Editor"];
    checkAutenticacion(req, res, next, roles);
  }, function (req, res, next) {

    const { id } = req.params

    Categorias.editar(req.body, id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: 'No se pudo editar la categoria', error: error})
    })
})

/* Eliminar Categorias */
router.delete('/eliminar/:id', function(req, res, next){
    roles = ["Editor"];
    checkAutenticacion(req, res, next, roles);
  }, function (req, res, next) {

    const { id } = req.params

    Categorias.eliminar(id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: error})
    })
})

module.exports = router;