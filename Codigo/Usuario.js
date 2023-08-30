const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 


//router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {

    data = {
        IdUsuario: 0,
        Nombre: req.body.Nombre,
        Codigo: req.body.Codigo
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.IdEmpleado = newId;

            let sql = "INSERT INTO Usuario SET ?";
            conexion.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error inesperado' });
                } else {
                    res.json(result);
                }
            });
        }
    });
});

function generaNuevoId(callback) {
    let getLastIdQuery = "SELECT MAX(IdEmpleado) AS lastId FROM Usuario";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            callback(err, null);
        } else {
            let lastId = result[0].lastId || 0;
            let newId = lastId + 1;
            callback(null, newId);
        }
    });
}


router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Usuario';
    conexion.query(sql, (err,  resul) => {
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'})
        }else{
            res.json(resul);
        }
    });
});


router.delete('/:cod', (req, res) => {

    let sql = 'DELETE FROM Usuario WHERE IdEmpleado=?';

    conexion.query(sql, req.params.cod, (err,  resul) => {
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'});
        }else{
            res.json(resul);
        }
    });
});

router.put('/:cod', (req, res) => {
    
    let IdEmpleado = req.params.cod;
    let Nombre = req.body.Nombre;
    let Codigo = req.body.Codigo;

    let sql = "Update Usuario set Nombre=?, Codigo=? Where IdEmpleado=?";

    conexion.query(sql, [Nombre, Codigo, IdEmpleado], (err, resul) =>{
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'});
        }else{
            res.json(resul);
        }
    });
});

module.exports = router;