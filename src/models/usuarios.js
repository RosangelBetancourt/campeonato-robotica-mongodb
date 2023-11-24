const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsuariosSchema = new Schema({
  id: ObjectId,
  usuario: {
    type: String,
    match: /[a-z]/,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
    match: /[a-z]/
  }
});

const UsuariosModel = mongoose.model('usuarios', UsuariosSchema)
module.exports = UsuariosModel