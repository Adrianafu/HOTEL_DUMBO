const express = require('express');
const app = express();
const conexion = require('../Config/db'); 

app.use(express.json());

app.get("/servicio", (req, res) => {
    const sql = "SELECT * FROM Servicio";

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: "Error en el servidor" });
        } else {
            res.json(result);
        }
    });
});
app.post("/servicio", (req, res) => {
    let latestId;
    let getLatestIdSql = "SELECT MAX(IdServicio) as latestId FROM Servicio";

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
                idServicio: latestId,
                Descripcion: req.body.Descripcion,
            };

            let insertSql = "INSERT INTO Servicio SET ?";
            
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

app.put("/servicio/:id", (req, res) => {
    const idServicio = req.params.id;
    const data = {
        Descripcion: req.body.Descripcion,
    };

    const updateSql = "UPDATE Servicio SET ? WHERE IdServicio = ?";
    conexion.query(updateSql, [data, idServicio], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: "Error inesperado" });
        } else {
            res.json(result);
        }
    });
});

app.delete("/servicio/:id", (req, res) => {
    const idServicio = req.params.id;

    const deleteSql = "DELETE FROM Servicio WHERE IdServicio = ?";
    conexion.query(deleteSql, idServicio, (err, result) => {
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

