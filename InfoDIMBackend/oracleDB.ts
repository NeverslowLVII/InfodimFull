import oracledb from 'oracledb';

const config = {
  user: process.env.ORACLEDB_USER,
  password: process.env.ORACLEDB_PASSWORD,
  connectString: process.env.ORACLEDB_CONNECTION_STRING,
};

export async function initialize(): Promise<void> {
  console.log('Initialisation de la base de données...');
  try {
    await oracledb.createPool(config);
    console.log('La pool de connexion a démarré');
  } catch (err) {
    console.error('L\'initialisation a échoué: ' + err.message);
  }
}

export async function close(): Promise<void> {
  console.log('Fermeture de la base de données...');
  try {
    await oracledb.getPool().close(10);
    console.log('La pool de connexion est fermée');
  } catch (err) {
    console.error('Erreur lors de la fermeture de la pool de connexion: ' + err.message);
  }
}

interface Options {
  outFormat?: number;
  [key: string]: any;
}

export async function execute(sql: string, binds: any[] = [], opts: Options = {}) {
  console.log('Exécution de la requête SQL...');
  let connection, result;
  opts.outFormat = oracledb.OUT_FORMAT_OBJECT;

  try {
    connection = await oracledb.getConnection();
    result = await connection.execute(sql, binds, opts);
    console.log('La requête SQL a été exécutée avec succès');
    await connection.commit();
    console.log('Commit effectué');
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête: ' + err.message);
    throw err;
  } finally {
    if (connection) {
      console.log('Fermeture de la connexion...');
      try {
        await connection.close();
        console.log('La connexion est fermée');
      } catch (err) {
        console.error('Erreur lors de la fermeture de la connexion: ' + err.message);
      }
    }
  }

  return result;
}