var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String, 
    password: String,
    conectado: Boolean
})

module.exports = mongoose.model('Usuario', UsuarioSchema);