var jsonwebtoken = require('jsonwebtoken');
let Usuario = require('../models/usuario');

exports.checkToken = function (req, res, next) {
    // let token = req.query.token;
    if(!req.headers.authorization) {
        return res
          .status(403)
          .send({message: "Tu petición no tiene cabecera de autorización"});
      }
      
    let token = req.headers.authorization.split(" ")[1];
    if(token) {
        jsonwebtoken.verify(token, 'jffxtstzefhjf', (err, decoded)=>{
            if(err) {
                return res.status(400).json({
                    mensaje: 'Operación no permitida'  
                })
            }
            let id = decoded.id;
            Usuario.findById(id).exec((err, usuario) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                if(usuario.sessionId !== token) {
                    return res.status(400).json({
                        mensaje: 'Operación no permitida'  
                    })
                }
                req._id = id;
                next()
            })
        })
    } else {
        return res.status(400).json({
            mensaje: 'Operación no permitida'  
        })
    }
}