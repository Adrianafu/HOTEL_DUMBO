const express = require('express');
const app = express();
const conexion = require('../Config/db'); 

app.use(express.json());

app.get("/paquete", (req, res) => {
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
app.post("/paquete", (req, res) => {
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

app.put("/paquete/:id", (req, res) => {
    const idPaquete = req.params.id;
    const data = {
        Tipo: req.body.Tipo,
        Precio: req.body.Precio,
        FechaInicio: req.body.FechaInicio,
        FechaTermino: req.body.FechaTermino,
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

app.delete("/paquete/:id", (req, res) => {
    const idPaquete = req.params.id;

    const deleteSql = "DELETE FROM Paquete WHERE IdPaquete = ?";
    conexion.query(deleteSql, idPaquete, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: "Error inesperado" });
        } else {
            res.json(result);
        }
    });
});


app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});

