const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 

//router.use(express.json());

router.get("/", (req, res) => {
    const sql = "SELECT * FROM Paquete";

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: "Error en el servidor" });
        } else {
            res.json(result);
        }
    });
});
router.post("/", (req, res) => {
    let latestId;
    let getLatestIdSql = "SELECT MAX(IdPaquete) as latestId FROM Paquete";

    conexion.query(getLatestIdSql, (err, rows) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: "Error inesperado" });
        } else {
            if (rows[0].latestId === null) {
                latestId = 1;
            } else {
                latestId = rows[0].latestId + 1;
            }
            const data = {
                idPaquete: latestId,
                Tipo: req.body.Tipo,
                Precio: req.body.Precio,
                FechaInicio: req.body.FechaInicio,
                FechaTermino: req.body.FechaTermino,
                Dias: req.body.Dias,
                Vigente: req.body.Vigente
            };

            let insertSql = "INSERT INTO Paquete SET ?";
            
            conexion.query(insertSql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: "Error inesperado" });
                } else {
                    res.json(result);
                }
            });
        }
    });
});

router.put("/:id", (req, res) => {
    const idPaquete = req.params.id;
    const data = {
        Tipo: req.body.Tipo,
        Precio: req.body.Precio,
        FechaInicio: req.body.FechaInicio,
        FechaTermino: req.body.FechaTermino,
        Dias: req.body.Dias,
        Vigente: req.body.Vigente
    };

    const updateSql = "UPDATE Paquete SET ? WHERE IdPaquete = ?";
    conexion.query(updateSql, [data, idPaquete], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: "Error inesperado" });
        } else {
            res.json(result);
        }
    });
});

router.delete('/:id', (req, res) => {

    let sql = 'DELETE FROM Reserva WHERE IdPaquete=?';
    let sql_2 = 'DELETE FROM Paquete WHERE IdPaquete=?';

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
