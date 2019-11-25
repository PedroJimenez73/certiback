let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let app = express();
let jsonwebtoken = require('jsonwebtoken');
let clients =[];

let Usuario = require('./models/usuario');

let usuario = require('./routes/usuario');
let auth = require('./routes/auth');
let intento = require('./routes/intento');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/certimaster',{useUnifiedTopology: true, useNewUrlParser: true, promiseLibrary: require('bluebird')})
            .then(()=>{
                console.log('Conectado a DB');
            })
            .catch((err)=>{
                console.error('Error de conexión', err)
            });

app.use(cors());

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use('/usuario', usuario);
app.use('/auth', auth);
app.use('/intento', intento);

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

        clients.push(clientInfo);
    });
    
    socket.on('disconnect', function (data) {

        for( var i=0; i< clients.length; ++i ){
            var c = clients[i];

            if(c.clientId == socket.id){
                Usuario.findById(c.customId, (err, usuario)=>{
                    usuario.conectado = false;
                    usuario.save((err, usuarioModificado)=>{
                        if(err){
                            console.log(err);
                        };
                    });
                });
                clients.splice(i,1);
                break;
            }
        }

    });
});
