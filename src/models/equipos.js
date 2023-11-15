const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EquiposSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    match: /[a-z]/,
  },
  miembros: {
    type: Array
  },
  categorias_inscritas: {
    type: Array,
    default: [],
  }

});

const EquiposModel = mongoose.model('equipos', EquiposSchema)
module.exports = EquiposModel