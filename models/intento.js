var mongoose = require('mongoose');

var IntentoSchema = new mongoose.Schema({
    fecha: Object,
    usuario: String,
    examen: Object,
    resultados: Object,
    correctas: Object,
    final: String
});

module.exports = mongoose.model('Intento', IntentoSchema);