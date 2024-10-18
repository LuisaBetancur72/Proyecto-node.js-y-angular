const mariadb = require('mariadb');


const SERVER_PORT = process.env.PORT || 3800;
const SERVER_URL = 'localhost';
const DB_PORT =  '3306';
const DB_URL = 'localhost';
const DB_USER =  'root';
const DB_PASS = '';
const DB_NAME = 'basededatos';

const pool = mariadb.createPool({
    host: DB_URL, 
    user: DB_USER, 
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    connectionLimit: 5  
});
async function getConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    throw err;
  }
  return connection;
}
module.exports = {
    SERVER_PORT,
    SERVER_URL,
    pool,
    getConnection  
};
