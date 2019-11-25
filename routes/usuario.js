var express = require('express');
var bcryptjs = require('bcryptjs');
var app = express();
var proteccionhttp = require('../middleware/protecthttp');

var Usuario = require('../models/usuario');

app.get('/', (req, res, next) =>{
    Usuario.find({}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }

        res.status(200).json({
            usuarios: datos
        })
    });
});

app.get('/:id', (req, res, next) =>{
    Usuario.find({_id: req.params.id}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }

        res.status(200).json({
            usuario: datos[0]
        })
    });
});

//app.post('/', proteccionhttp.checkToken, (req,res)=>{
app.post('/', (req,res)=>{
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        conectado: false
    })

    usuario.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                errores: err
            })
        }

        res.status(200).json({
            mensaje: 'Usuario creado correctamente'
        })
    })

})

module.exports = app;