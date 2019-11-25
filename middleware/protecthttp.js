var jsonwebtoken = require('jsonwebtoken');

exports.checkToken = function(req, res, next){
    var token = req.query.token;
    //const token = req.headers['access-token'];

    if(token){

        jsonwebtoken.verify(token, 'jffxtstzefhjf', (err, decoded)=>{
            if(err){
                return res.status(400).json({
                    mensaje: 'token expirado'
                })
            }
            req.nombre = decoded.usuario.nombre;
            req._id = decoded.usuario._id;
            next();
        });
    } else {
        res.status(400).json({
            mensaje: 'token no proporcionado'
        })
    }

}