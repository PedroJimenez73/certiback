var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String, 
    password: String,
    conectado: Boolean,
    direccion: String,
    cp: String,
    localidad: String,
    imagen: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema);