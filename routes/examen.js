var express = require('express');
var app = express();

var Examen = require('../models/examen');

app.get('/', (req, res, next) =>{
    Examen.find({}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }
        res.status(200).json({
            examenes: datos
        })
    });
});

app.get('/:id', (req, res) =>{
    Examen.findById(req.params.id, (err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }
        res.status(200).json({
            examen: datos
        })
    });
});

app.post('/', (req,res)=>{
    var body = req.body;
    var examen = new Examen({
        title: body.title,
        code: body.code,
        manufacturer: body.manufacturer,
        pic: `http://localhost:3000/logos/${body.manufacturer}.png`,
        duration: body.duration,
        production: body.production,
        description: body.description,
        createdAt: new Date(),
        questions: []
    })

    examen.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                errores: err
            })
        }

        res.status(200).json({
            mensaje: 'Examen creado correctamente'
        })
    })
});

app.put('/:id', /*autenToken.verificarToken,*/ (req, res, next)=>{
    var body = req.body;
    Examen.findById(req.params.id, (err, examen)=>{
        if(err){
            return res.status(500).json({
                mensaje: 'Error de conexión con servidor'
            });
        };
        examen.title = body.title;
        examen.code = body.code;
        examen.manufacturer = body.manufacturer;
        examen.pic = `http://localhost:3000/logos/${body.manufacturer}.png`;
        examen.duration = body.duration;
        examen.production = body.production;
        examen.description = body.description;

        examen.save((err, examenModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al añadir la pregunta',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Examen modificado correctamente'
            });
        });
    });
});

app.put('/question/:id', /*autenToken.verificarToken,*/ (req, res, next)=>{
    var question = {
        question: req.body.question,
        multi: req.body.multi,
        answers: req.body.answers,
        feedback: req.body.feedback,
    }
    Examen.update({_id: req.params.id},{ $push: { questions: question } }, (err, examen)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al añadir la pregunta',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            mensaje: 'Pregunta añadida correctamente'
        });
    })
});

app.put('/question/del/:idExam/:idQuestion', /*autenToken.verificarToken,*/ (req, res, next)=>{

    Examen.findById(req.params.idExam, (err, examen)=>{
        if(err){
            return res.status(500).json({
                mensaje: 'Error de conexión con servidor'
            });
        };
        examen.questions.splice(req.params.idQuestion, 1);
        examen.save((err, examenModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar la pregunta',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Pregunta eliminada correctamente'
            });
        });
    });
});

app.get('/question/:idExam/:idQuestion', (req, res, next) =>{
    Examen.find({_id: req.params.idExam},{questions: 1}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                errores: err 
            })
        }
        let question = datos[0].questions[req.params.idQuestion]
        res.status(200).json({
            pregunta: question
        })
    });
});

app.put('/question/upd/:idExam/:idQuestion', /*autenToken.verificarToken,*/ (req, res, next)=>{
    var body = req.body;
    Examen.findById(req.params.idExam, (err, examen)=>{
        if(err){
            return res.status(500).json({
                mensaje: 'Error de conexión con servidor'
            });
        };
        examen.questions[req.params.idQuestion].question = body.question;
        examen.questions[req.params.idQuestion].multi = body.multi;
        examen.questions[req.params.idQuestion].section = body.section;
        examen.questions[req.params.idQuestion].answers = body.answers;
        examen.questions[req.params.idQuestion].feedback = body.feedback;
        examen.save((err, examenModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al añadir la pregunta',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Pregunta modificada correctamente'
            });
        });
    });
});

module.exports = app;