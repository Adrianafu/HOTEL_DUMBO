const express = require('express');
const app = express();
var cliente=require('./Codigo/Cliente');
var empleado = require('./Codigo/Empleado');
var paqueteservicio = require('./Codigo/Paquete_Servicio');
var paquete  = require ('./Codigo/Paquete');
var reserva = require ('./Codigo/Reserva');
var servicio = require ('./Codigo/Servicio');
var usuario = require ('./Codigo/Usuario');

app.use(express.json());

app.use('/cliente',cliente);
app.use('/empleado',empleado);
app.use('/paqueteservicio',paqueteservicio);
app.use('/paquete',paquete);
app.use('/reserva',reserva);
app.use('/servicio',servicio);
app.use('/usuario',usuario);

app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});