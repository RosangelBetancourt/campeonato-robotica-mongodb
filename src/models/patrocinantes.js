const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EquiposSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  rif: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  modalidad_patrocinada: {
    type: String,
    required: true,
    match: /[a-z]/,
  }

});

const EquiposModel = mongoose.model('equipos', EquiposSchema)
module.exports = EquiposModel