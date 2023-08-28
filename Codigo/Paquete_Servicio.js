const express = require('express');
const app = express();
const conexion = require('../Config/db'); 

app.use(express.json());

app.get('/paqueteservicio', (req, res) => {
  const sql = 'SELECT * FROM Paquete_Servicio';
  conexion.query(sql, (err, result) => {
    if (err) {
        console.log(err.message);
        res.status(500).json({ mensaje: "Error en el servidor" });
    } else {
        res.json(result);
    }
});
});

app.put('/paqueteservicio/:idPaquete/:idServicio', (req, res) => {
  const idPaquete = req.params.idPaquete;
  const idServicio = req.params.idServicio;
  const data = req.body;
  const updateSql = 'UPDATE Paquete_Servicio SET ? WHERE IdPaquete = ? AND IdServicio = ?';
  conexion.query(updateSql, [data, idPaquete, idServicio], (err, result) => {
      if (err) {
          console.log(err.message);
          res.json({ mensaje: 'Error inesperado' });
      } else {
          res.json(result);
      }
  });
});


app.post('/paqueteservicio', (req, res) => {
  const SER = req.body;
  const sql = 'INSERT INTO Paquete_Servicio SET ?';
  conexion.query(sql, SER, (err, result) => {
      if (err) {
          console.log(err.message);
          res.json({ mensaje: "Error inesperado" });
      } else {
          res.status(201).json({ message: 'Registro agregado con éxito' });
      }
  });
});

app.delete('/paqueteservicio/:idPaquete/:idServicio', (req, res) => {
  const idPaquete = req.params.idPaquete;
  const idServicio = req.params.idServicio;

  const deleteSql = 'DELETE FROM Paquete_Servicio WHERE IdPaquete = ? AND IdServicio = ?';
  conexion.query(deleteSql, [idPaquete, idServicio], (err, result) => {
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

