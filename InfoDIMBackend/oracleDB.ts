import oracledb from 'oracledb';

// OracleDB configuration
const config = {
  user: process.env.ORACLEDB_USER, // Set your OracleDB username here
  password: process.env.ORACLEDB_PASSWORD, // Set your OracleDB password here
  connectString: process.env.ORACLEDB_CONNECTION_STRING, // Set your OracleDB connection string here
};

// Initialize the connection pool
async function initialize() {
  try {
    await oracledb.createPool(config);
    console.log('Connection pool started');
  } catch (err) {
    console.error('Initialization failed: ' + err.message);
  }
}

// Close the connection pool
async function close() {
  try {
    await oracledb.getPool().close(10);
    console.log('Connection pool closed');
  } catch (err) {
    console.error('Error closing the connection pool: ' + err.message);
  }
}

interface Options {
  outFormat?: number;
  [key: string]: any;
}

// Function to execute SQL queries
async function execute(sql: string, binds: any[] = [], opts: Options = {}) {
  let connection, result;
  opts.outFormat = oracledb.OUT_FORMAT_OBJECT; // Return results as objects

  try {
    connection = await oracledb.getConnection();
    result = await connection.execute(sql, binds, opts);
  } catch (err) {
    console.error('Error executing query: ' + err.message);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection: ' + err.message);
      }
    }
  }

  return result;
}

export default {
  initialize,
  close,
  execute,
};
