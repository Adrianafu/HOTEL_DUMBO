const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 

//router.use(express.json());

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Cliente';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});

router.post('/', (req, res) => {
    let latestId;
    let getLatestIdSql = "SELECT MAX(IdCliente) as latestId FROM Cliente";

    conexion.query(getLatestIdSql, (err, rows) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            if (rows[0].latestId === null) {
                latestId = 1;
            } else {
                latestId = rows[0].latestId + 1;
            }
            const data = {
                idCliente: latestId,
                Nombre: req.body.Nombre,
                ApellidoP: req.body.ApellidoP,
                ApellidoM: req.body.ApellidoM,
                EstadoCivil: req.body.EstadoCivil,
                Genero: req.body.Genero,
                Pais: req.body.Pais,
                Celular: req.body.Celular,
                CI: req.body.CI,
                FechaNacimiento: req.body.FechaNacimiento,
            };

            let insertSql = "INSERT INTO Cliente SET ?";
            
            conexion.query(insertSql, data, (err, result) => {
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

router.put('/:id', (req, res) => {
    const idCliente = req.params.id;
    const data = {
        Nombre: req.body.Nombre,
        ApellidoP: req.body.ApellidoP,
        ApellidoM: req.body.ApellidoM,
        EstadoCivil: req.body.EstadoCivil,
        Genero: req.body.Genero,
        Pais: req.body.Pais,
        Celular: req.body.Celular,
        CI: req.body.CI,
        FechaNacimiento: req.body.FechaNacimiento,
    };

    const updateSql = "UPDATE Cliente SET ? WHERE IdCliente = ?";
    conexion.query(updateSql, [data, idCliente], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            res.json(result);
        }
    });
});

router.delete('/:id', (req, res) => {

    let sql = 'DELETE FROM Reserva WHERE IdCliente=?';
    let sql_2 = 'DELETE FROM Cliente WHERE IdCliente=?';

    conexion.query(sql, req.params.id, (err,  resul) => {
        if(err){
            console.log(err.message);
        }
    });

    conexion.query(sql_2, req.params.id, (err,  resul) => {
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'});
        }else{
            res.json(resul);
        }
    });
});


module.exports = router;
