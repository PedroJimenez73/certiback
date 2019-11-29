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
    Usuario.findById(req.params.id, (err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }

        res.status(200).json({
            usuario: datos
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
        conectado: false,
        imagen: 'avatar.svg'
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

app.put('/:id', /*autenToken.verificarToken,*/ (req, res, next)=>{
    var body = req.body;
    Usuario.findById(req.params.id, (err, usuario)=>{
        if(err){
            return res.status(500).json({
                mensaje: 'Error de conexión con servidor'
            });
        };
        usuario.nombre = body.nombre;
        usuario.password = bcryptjs.hashSync(body.password, 10);
        usuario.direccion = body.direccion;
        usuario.cp = body.cp;
        usuario.localidad = body.localidad;
        usuario.imagen = body.imagen;

        usuario.save((err, usuarioModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar usuario',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            });
        });
    });
});

module.exports = app;