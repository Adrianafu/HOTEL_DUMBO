const express = require('express');
const app = express();
const conexion = require('../Config/db'); 

app.use(express.json());

app.get('/cliente', (req, res) => {
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

app.post('/cliente', (req, res) => {
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

app.put('/cliente/:id', (req, res) => {
    const idCliente = req.params.id;
    const data = {
        Nombre: req.body.Nombre,
        ApellidoP: req.body.ApellidoP,
        ApellidoM: req.body.ApellidoM,
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

app.delete('/cliente/:id', (req, res) => {
    const idCliente = req.params.id;

    const deleteSql = "DELETE FROM Cliente WHERE IdCliente = ?";
    conexion.query(deleteSql, idCliente, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});
