const mysql =require("mysql2/promise");

async function database(query, val) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Qualtrics_Survey',
  });
  const [rows, fields] = await connection.query(query, val);
  connection.end();
  return rows;
}

module.exports = database;