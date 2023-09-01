const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 


// Get para paquetes más solicitados top 10
router.get('/Paquete_solicitados', (req, res) => {

    const sql = 'SELECT * FROM Solicitados';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});


// Get para paquetes más solicitados según estado civil
router.get('/Paquetes_Estado_Civil', (req, res) => {

    const sql = 'Select * FROM Paquetes_EstadoCivil';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});


// Get para los empleados más productivos
router.get('/Empleado_productivo', (req, res) => {

    const sql = 'Select * FROM EmpleadoProductivo';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});

// Get para fechas más solicitadas
router.get('/fechas_solicitadas', (req, res) => {

    const sql = 'SELECT Mes, IdPaquete, Tipo, CantidadReservas FROM Vista_Reporte_Fechas_Paquetes_Solicitados';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});

// Get de los empleados Menos productivos
router.get('/Menos', (req, res) => {

    const sql = 'SELECT * FROM Menos;';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});

// Get de los servicios más utilizados
router.get('/Mas', (req, res) => {

    const sql = 'SELECT * FROM Mas';

    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;