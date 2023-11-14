const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ModalidadSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  categorias: {
    type: Array,
    default: [],
  }
});

const ModalidadModel = mongoose.model('modalidad', ModalidadSchema)
module.exports = ModalidadModel