var express = require('express');
var router = express.Router();
const Patrocinantes = require('../controller/patrocinantes.controller')

/* Mostrar patrocinantes */ 
router.get('/', function (req, res, next) {
    Patrocinantes.listar()
    .then((resultado) => {
        res.status(200).json({"status": 200, "data": resultado, "mensaje": "Se ha listado con éxito los patrocinantes"})
    })
    .catch((error) => {
        reject(error)
    })
});

/* Agregar patrocinantes */
router.post('/agregar', function (req, res, next) {
    Patrocinantes.agregar(req.body)
    .then((resultado) => {
        res.status(200).json({status: 200, mensaje: resultado})
    })
    .catch((error) => {
        res.status(400).json({status: 400, mensaje: "no se ha podido agregar el patrocinante", error: error})
    })
})


module.exports = router;