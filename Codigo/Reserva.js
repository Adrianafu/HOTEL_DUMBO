const express = require('express');
const router = express.Router();
const conexion = require('../Config/db'); 

//router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {

    data = {
        IdReserva: 0,
        IdCliente: req.body.IdCliente,
        IdEmpleado: req.body.IdEmpleado,
        IdPaquete: req.body.IdPaquete,
        Fecha: req.body.Fecha,
        Cantidad: req.body.Cantidad,
        TipoPago: req.body.TipoPago,
        Pago: req.body.Pago,
        Estado: req.body.Estado
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.IdReserva = newId;

            let sql = "INSERT INTO Reserva SET ?";
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
    let getLastIdQuery = "SELECT MAX(idReserva) AS lastId FROM Reserva";
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
    let sql = 'SELECT * FROM Reserva';
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

    let sql = 'DELETE FROM Reserva WHERE IdReserva=?';

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
    
    let IdReserva = req.params.cod;
    let IdCliente = req.body.IdCliente;
    let IdEmpleado = req.body.IdEmpleado;
    let IdPaquete = req.body.IdPaquete;
    let Fecha = req.body.Fecha;
    let Cantidad = req.body.Cantidad;
    let TipoPago = req.body.TipoPago;
    let Pago = req.body.Pago;
    let Estado = req.body.Estado;

    let sql = "Update Reserva set IdCliente=?, IdEmpleado=?, IdPaquete=?, Fecha=?, Cantidad=?, TipoPago=?, Pago=?, Estado=? Where IdReserva=?";

    conexion.query(sql, [IdCliente, IdEmpleado, IdPaquete, Fecha, Cantidad, TipoPago, Pago, Estado, IdReserva], (err, resul) =>{
        if(err){
            console.log(err.message);
            res.json({mensaje: 'Error indesperado'});
        }else{
            res.json(resul);
        }
    });
});

module.exports = router;