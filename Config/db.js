const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9194756',
    database: 'Dumbo'
});

con.connect((err) => {
    if (err) {
        console.log('Error a la Conexión a la base de datos');
        return;
    }
    else{
        console.log('Conexión exitosa a la base de datos');
    }

});

module.exports = con;
