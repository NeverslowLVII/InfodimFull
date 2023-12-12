import { execute } from '../oracleDB';

export default class UserService {
  async createUser(userData: any): Promise<any> {
    console.log('Création d\'un utilisateur', userData);
    const sql = `INSERT INTO USERS (ROLES) VALUES (:ROLES)`;
    const binds = {...userData};
    try {
      await execute(sql, binds);
      console.log('Utilisateur créé avec succès', userData);
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
    return userData;
  }
  async getUserById(id: number): Promise<any> {
    console.log('Récupération de l\'utilisateur par ID', id);
    const sql = `SELECT * FROM USERS WHERE ID = :ID`;
    const binds = { ID: id };
    let result;
    try {
      result = await execute(sql, Object.values(binds));
      console.log('Utilisateur récupéré avec succès', result.rows[0]);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
    }
    return result?.rows[0];
  }
  async getUsers(): Promise<any> {
    console.log('Récupération de tous les utilisateurs');
    const sql = `SELECT * FROM USERS`;
    let result; // Déclaration de la variable ici
    try {
      result = await execute(sql); // Affectation de la variable ici
      console.log('Utilisateurs récupérés avec succès', result.rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
    return result?.rows; // Utilisation de la variable ici
  }
  async updateUser(id: number, updateData: any): Promise<any> {
    console.log('Mise à jour de l\'utilisateur', id, updateData);
    const sql = `UPDATE USERS SET ROLES = :ROLES WHERE ID = :ID`;
    const binds = { ID: id, ...updateData };
    try {
      await execute(sql, binds);
      console.log('Utilisateur mis à jour avec succès', updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
    return updateData;
  }
  async deleteUser(id: number): Promise<any> {
    console.log('Suppression de l\'utilisateur', id);
    const sql = `DELETE FROM USERS WHERE ID = :ID`;
    const binds = { ID: id };
    try {
      await execute(sql, Object.values(binds));
      console.log('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
