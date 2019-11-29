let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let app = express();
let jsonwebtoken = require('jsonwebtoken');
let usuariosConectados =[];

let Usuario = require('./models/usuario');

let usuario = require('./routes/usuario');
let auth = require('./routes/auth');
let intento = require('./routes/intento');

let Sesion = require('./models/sesion');
let fs = require('fs');

let multer = require('multer');

let DIR = './imagenes/';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, req.body.nombre + '.' + file.originalname.split('.')[file.originalname.split('.').length -1] );
    }
})

let upload = multer({ storage: storage });

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/certimaster',{useUnifiedTopology: true, useNewUrlParser: true, promiseLibrary: require('bluebird')})
            .then(()=>{
                console.log('Conectado a DB');
            })
            .catch((err)=>{
                console.error('Error de conexión', err)
            });

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.post('/imagenes', upload.single('file'), function (req, res, next) {
    console.log(req);
});

app.use('/usuario', usuario);
app.use('/auth', auth);
app.use('/intento', intento);
app.use('/imagenes', express.static('imagenes'));


let server = app.listen(3000, () => {
    console.log("started on port 3000");
});

let io = require('socket.io').listen(server);

io.on("connection", socket => {
        
    socket.on('storeClientInfo', function (data) {

        let token = data.token;
        let customId;

        jsonwebtoken.verify(token, 'jffxtstzefhjf', (err, decoded)=>{
            customId = decoded.usuario._id;
        });

        var clientInfo = new Object();
        clientInfo.customId  = customId;
        clientInfo.clientId  = socket.id;

        usuariosConectados.push(clientInfo);
        Sesion.updateOne({}, {usuariosConectados: usuariosConectados}, { upsert: true }, (err,datos)=>{
            if(err){
                return console.log(err);
            }
            console.log('sesión actualizada')
        });
    });
    
    socket.on('disconnect', function (data) {

        Sesion.find({}).exec((err,datos)=>{
            if(err){
                return console.log(err);
            }
            usuariosConectados = datos[0].usuariosConectados;
            for( var i=0; i < usuariosConectados.length; ++i ){
                var c = usuariosConectados[i];
    
                if(c.clientId == socket.id){
                    Usuario.findById(c.customId, (err, usuario)=>{
                        usuario.conectado = false;
                        usuario.save((err, usuarioModificado)=>{
                            if(err){
                                console.log(err);
                            };
                        });
                    });
                    usuariosConectados.splice(i,1);
                    Sesion.updateOne({}, {usuariosConectados: usuariosConectados}, { upsert: true }, (err,datos)=>{
                        if(err){
                            return console.log(err);
                        }
                        console.log('sesión actualizada')
                    });
                    break;
                }
            }
        });

    });
});
