var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, index: true, unique: true},
    password: String,
    conectado: Boolean,
    direccion: String,
    cp: String,
    localidad: String,
    imagen: String,
    sessionId: String
});

UsuarioSchema.plugin(uniqueValidator, {message: 'El correo electrónico ya está en uso'});

module.exports = mongoose.model('Usuario', UsuarioSchema);