var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');
var Usuario = require('../models/usuario');
var app = express();
var proteccionhttp = require('../middleware/protecthttp');

app.post('/', (req, res, next)=>{
    var body = req.body;
    Usuario.findOne({email: body.email}, (err, datos)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        if (!datos) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email no corresponde a ningún usuario',
                errores: err
            });
        };  
        if(!bcryptjs.compareSync(body.password, datos.password)){
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña incorrecta',
                errores: err
            });
        };

        if(datos.conectado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario conectado en otro dispositivo',
                errores: err
            });
        }

        var token = jsonwebtoken.sign({usuario:datos},'jffxtstzefhjf',{expiresIn: 24*60*60*1000});
        let usuarioModificado = datos;
        usuarioModificado.conectado = true;

        usuarioModificado.save((err, datos)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error de conexión',
                    errores: err
                });
            };
            res.status(200).json({
                token: token,
                nombre: datos.nombre,
            });
        });
    });
});

app.get('/logout', proteccionhttp.checkToken, (req,res)=>{
        Usuario.findById(req._id, (err, usuario)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error de conexión con servidor'
                });
            };
            usuario.conectado = false;
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