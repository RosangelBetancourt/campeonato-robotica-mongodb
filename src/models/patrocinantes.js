const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PatrocinantesSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    required: true,
  },
  rif: {
    type: String,
    required: true
  },
  modalidad_patrocinada: {
    type: String,
    required: true,
    match: /[a-z]/,
  }

});

const PatrocinantesModel = mongoose.model('patrocinantes', PatrocinantesSchema)
module.exports = PatrocinantesModel