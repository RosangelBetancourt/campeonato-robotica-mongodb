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
  miembros: {
    type: Array,
    default: [],
    required: true
  },
  categorias_inscritas: {
    type: Array,
    default: [],
  }

});

const EquiposModel = mongoose.model('equipos', EquiposSchema)
module.exports = EquiposModel