var mongoose = require('mongoose');

var SesionSchema = new mongoose.Schema({
    usuariosConectados: Object
})

module.exports = mongoose.model('Sesion', SesionSchema);