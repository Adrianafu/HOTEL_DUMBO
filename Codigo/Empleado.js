const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 

// router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {

    data = {
        IdEmpleado: 0,
        Nombre: req.body.Nombre,
        ApellidoP: req.body.ApellidoP,
        ApellidoM: req.body.ApellidoM,
        Genero: req.body.Genero,
        Celular: req.body.Celular,
        Direccion: req.body.Direccion,
        Cargo: req.body.Cargo,
        CI: req.body.CI,
        FechaNacimiento: req.body.FechaNacimiento
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.IdEmpleado = newId;

            let sql = "INSERT INTO Empleado SET ?";
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
    let getLastIdQuery = "SELECT MAX(IdEmpleado) AS lastId FROM Empleado";
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
    let sql = 'SELECT * FROM Empleado';
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

    let sql = 'DELETE FROM Empleado WHERE IdEmpleado=?';

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
    let ApellidoP = req.body.ApellidoP;
    let ApellidoM = req.body.ApellidoM;
    let Genero = req.body.Genero;
    let Celular = req.body.Celular;
    let Direccion = req.body.Direccion;
    let Cargo = req.body.Cargo;
    let CI = req.body.CI;
    let FechaNacimiento = req.body.FechaNacimiento;

    let sql = "Update Empleado set Nombre=?, ApellidoP=?, ApellidoM=?, Genero=?, Celular=?, Direccion=?, Cargo=?, CI=?, FechaNacimiento=? Where IdEmpleado=?";

    conexion.query(sql, [Nombre, ApellidoP, ApellidoM, Genero, Celular, Direccion, Cargo, CI, FechaNacimiento, IdEmpleado], (err, resul) =>{
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'});
        }else{
            res.json(resul);
        }
    });
});

module.exports = router;