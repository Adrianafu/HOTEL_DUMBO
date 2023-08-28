const mysql = require('mysql2');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9194756',
    database: 'HotelDumbo',
    port: 3306,
});

conexion.connect((err) => {
    if (err) {
        console.log('Error a la Conexión a la base de datos');
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = conexion;
