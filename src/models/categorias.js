const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategoriasSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  tipo_de_robot: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  premio: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  equipos_participantes: {
    type: Array,
    default: [],
  },
  modalidad: {
    type: String,
    required: true,
    match: /[a-z]/
  }

});

const CategoriasModel = mongoose.model('categorias', CategoriasSchema)
module.exports = CategoriasModel