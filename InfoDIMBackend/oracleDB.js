require('dotenv').config();
const oracledb = require('oracledb');

async function testConnection() {
  let connection;

  console.log("Starting the database connection test...");

  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECTION_STRING
    });

    console.log("Successfully connected to Oracle Database");
    // Run a test query
    const result = await connection.execute(`SELECT name FROM v$pdbs`);
    console.log("Query results:", result.rows);
  } catch (err) {
    console.error("Error connecting to Oracle Database:", err);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("Connection closed");
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

testConnection();

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    if (connection) {
      // Créer une fonction async pour gérer la fermeture de la connexion
      (async function closeConnection() {
        try {
          // Toujours fermer les connexions
          await connection.close();
          console.log("Connection closed");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      })();
    }
});