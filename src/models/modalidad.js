const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ModalidadSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    match: /[a-z]/,
  },
  categorias: {
    type: Array,
    default: [],
  }
});

const ModalidadModel = mongoose.model('modalidades', ModalidadSchema)
module.exports = ModalidadModel