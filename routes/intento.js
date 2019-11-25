var express = require('express');
var app = express();
var proteccionhttp = require('../middleware/protecthttp');

var Intento = require('../models/intento');

// app.get('/', (req, res, next) =>{
//     Usuario.find({}).exec((err,datos)=>{
//         if(err){
//             return res.status(400).json({
//                 errores: err 
//             })
//         }

//         res.status(200).json({
//             usuarios: datos
//         })
//     });
// });

// app.get('/:id', (req, res, next) =>{
//     Usuario.find({_id: req.params.id}).exec((err,datos)=>{
//         if(err){
//             return res.status(400).json({
//                 errores: err 
//             })
//         }

//         res.status(200).json({
//             usuario: datos[0]
//         })
//     });
// });

app.post('/', proteccionhttp.checkToken, (req,res)=>{
    var body = req.body;
    var intento = new Intento({
        fecha: new Date(),
        usuario: req._id,
        respuestas: body.respuestas,
        aciertos: body.aciertos,
        resultado: body.resultado
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

module.exports = app;