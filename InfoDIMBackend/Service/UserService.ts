import oracleDB from '../oracleDB';

export default class UserService {
  async createUser(userData: any): Promise<any> {
    const sql = `INSERT INTO users (roles) VALUES (:roles)`;
    const binds = {...userData};
    await oracleDB.execute(sql, binds);
    return userData;
  }
  async getUserById(id: number): Promise<any> {
    const sql = `SELECT * FROM users WHERE id = :id`;
    const binds = { id };
    const result = await oracleDB.execute(sql, Object.values(binds));
    return result.rows[0];
  }
    async getUsers(): Promise<any> {
        const sql = `SELECT * FROM users`;
        const result = await oracleDB.execute(sql);
        return result.rows;
    }
  async updateUser(id: number, updateData: any): Promise<any> {
    const sql = `UPDATE users SET roles = :roles WHERE id = :id`;
    const binds = { id, ...updateData };
    await oracleDB.execute(sql, binds);
    return updateData;
  }
  async deleteUser(id: number): Promise<any> {
    const sql = `DELETE FROM users WHERE id = :id`;
    const binds = { id };
    await oracleDB.execute(sql, Object.values(binds));
    return { message: 'Utilisateur supprimé avec succès' };
  }
}

