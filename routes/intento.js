var express = require('express');
var app = express();
var proteccionhttp = require('../middleware/protecthttp');

var Intento = require('../models/intento');

app.get('/:idUsuario', (req, res, next) =>{
    let idUsuario = req.params.idUsuario;
    Intento.find({usuario: idUsuario}).sort({fecha: -1}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }
        res.status(200).json({
            intentos: datos
        })
    });
});

app.get('/exam/:idUsuario/:idExam', (req, res, next) =>{
    Intento.find({usuario: req.params.idUsuario, "examen._id": req.params.idExam }).sort({fecha: -1}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }
        res.status(200).json({
            intentos: datos
        })
    });
});

app.get('/int/:id', (req, res, next) =>{
    Intento.find({_id: req.params.id}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }

        res.status(200).json({
            intento: datos[0]
        })
    });
});

app.post('/', proteccionhttp.checkToken, (req,res)=>{
    var body = req.body;
    var intento = new Intento({
        fecha: new Date(),
        usuario: req._id,
        examen: body.examen
    })

    intento.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                errores: err
            })
        }

        res.status(200).json({
            _id: datos._id
        })
    })

})

app.put('/:id', proteccionhttp.checkToken, (req, res, next)=>{
    var body = req.body;
    Intento.findById(req.params.id, (err, intento)=>{
        if(err){
            return res.status(500).json({
                mensaje: 'Error de conexión con servidor'
            });
        };
        intento.resultados = body.results;
        intento.correctas = body.correctAnswers;

        intento.save((err, intentoModificado)=>{
            if(err){
                return res.status(400).json({
                    mensaje: 'Error al modificar el intento',
                    errores: err
                });
            };
            res.status(200).json({
                mensaje: 'Respuesta registrada',
                intento: intentoModificado
            });
        });
    });
});

module.exports = app;