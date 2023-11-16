var express = require('express');
var router = express.Router();
const Equipos = require('../controller/equipos.controller')

/* Mostrar equipos participantes */ 
router.get('/', function (req, res, next) {
    Equipos.listar()
    .then((resultado) => {
        res.status(200).json({"status": 200, "data": resultado})
    })
    .catch((error) => {
        reject(error)
    })
});

/* Mostrar equipos participantes en cada categoria */ 
router.get('/porCategoria', function (req, res, next) {
    Equipos.listarPorCategoria()
    .then((resultado) => {
        res.status(200).json({"status": 200, "data": resultado})
    })
    .catch((error) => {
        reject(error)
    })
});

/* Agregar Equipos Participantes */
router.post('/agregar', function (req, res, next) {
    Equipos.agregar(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: "No se ha podido agregar el equipo participante", error: error})
    })
})

/* Agregar Categoria al Equipos Participantes */
router.post('/agregar/categoria/:id', function (req, res, next) {

    const { id } = req.params

    Equipos.agregarCategoria(req.body, id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: "No se ha podido agregar el equipo participante", error: error})
    })
})

/* Editar Equipos Participantes */
router.put('/editar/:id', function (req, res, next) {

    const { id } = req.params

    Equipos.editar(req.body, id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: 'No se pudo editar el equipo participante', error: error})
    })
})

/* Eliminar Equipo Participante */
router.delete('/eliminar/:id', function (req, res, next) {

    const { id } = req.params

    Equipos.eliminar(id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: 'No se pudo eliminar el equipo participante', error: error})
    })
})

/* Eliminar Equipo de una categoria */
router.delete('/anular/:id', function (req, res, next) {

    const { id } = req.params

    Equipos.eliminarCategoria(req.body, id)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: 'No se pudo eliminar el equipo participante de la categoria', error: error})
    })
})

module.exports = router;