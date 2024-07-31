const mysql = require('mysql2');
const util = require('util');

// Configurar el pool de conexiones
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost', 
  user: 'root',       
  password: 'Basededatos2022*',       
  database: 'mydatabase' 
});

// Promisificar el método query para poder usar async/await
pool.query = util.promisify(pool.query);

module.exports = pool;
