var mongoose = require('mongoose');

var IntentoSchema = new mongoose.Schema({
    fecha: Object,
    usuario: String,
    examen: String,
    respuestas: Object,
    aciertos: Object,
    resultado: String
});

module.exports = mongoose.model('Intento', IntentoSchema);