var mongoose = require('mongoose');

var ExamenSchema = new mongoose.Schema({
    title: String,
    code: String,
    manufacturer: String,
    pic: String,
    duration: Number,
    production: Boolean,
    description: String,
    createdAt: Object,
    questions: [{
        question: String,
        multi: Boolean,
        section: String,
        answers: Object,
        feedback: Object
    }]
});

module.exports = mongoose.model('Examen', ExamenSchema);