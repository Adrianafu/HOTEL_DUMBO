const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 

//router.use(express.json());

router.get('/', (req, res) => {
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

router.put('/:idPaquete/:idServicio', (req, res) => {
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


router.post('/', (req, res) => {
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

router.delete('/:idPaquete/:idServicio', (req, res) => {
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
  
module.exports = router;

