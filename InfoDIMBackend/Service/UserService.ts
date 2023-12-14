import { execute } from "../oracleDB";
import bcrypt from 'bcrypt';

export default class UserService {
  async createUser(userData: any): Promise<any> {
    console.log("Création d'un utilisateur", userData);
    const sql = `INSERT INTO USERS (FIRSTNAME, LASTNAME, MATRICULE, PASSWORD) VALUES (:FIRSTNAME, :LASTNAME, :MATRICULE, :PASSWORD)`;
    const binds = { ...userData };
    const result = await execute(sql, binds);
    console.log("Utilisateur créé avec succès", userData);
    return result;
  }
  async getUserById(id: number): Promise<any> {
    console.log("Récupération de l'utilisateur par ID", id);
    const sql = `SELECT * FROM USERS WHERE ID = :ID`;
    const binds = { ID: id };
    const result = await execute(sql, Object.values(binds));
    console.log("Utilisateur récupéré avec succès", result.rows[0]);
    return result?.rows[0];
  }
  async getUsers(): Promise<any> {
    console.log("Récupération de tous les utilisateurs");
    const sql = `SELECT * FROM USERS`;
    const result = await execute(sql);
    console.log("Utilisateurs récupérés avec succès", result.rows);
    return result?.rows;
  }
  async updateUser(updateData: any): Promise<any> {
    const id = Number(updateData.id); // Convert the 'id' value to a number
    if (isNaN(id)) {
      throw new Error('Invalid ID value'); // Throw an error if 'id' is not a valid number
    }
    console.log('Mise à jour de l\'utilisateur', id, updateData);
    // Construct the SET part of the SQL statement with proper string formatting
    const fieldsToUpdate = Object.keys(updateData)
      .filter(key => key !== 'id') // Exclude 'id' from the update fields
      .map(key => `${key.toUpperCase()} = :${key.toUpperCase()}`) // Use named placeholders for values
      .join(', ');
    // Construct the full SQL statement with named placeholders
    const sql = `UPDATE USERS SET ${fieldsToUpdate} WHERE ID = :ID`;
    // Create the binds object with all updateData fields (excluding 'id') and the ID
    const binds: { [key: string]: any } = {
      ...Object.keys(updateData).reduce((acc: { [key: string]: any }, key: string) => {
        if (key !== 'id') { // Exclude 'id' from the update fields
          acc[key.toUpperCase()] = updateData[key];
        }
        return acc;
      }, {}),
      ID: id // Use the converted ID number
    };
    // Hash the password before updating
    if (binds.PASSWORD) {
      binds.PASSWORD = bcrypt.hashSync(binds.PASSWORD, 10);
    }
    console.log('SQL statement:', sql);
    console.log('Binds object:', binds);
    try {
      const result = await execute(sql, Object.values(binds)); // Execute the SQL statement with named binds
      console.log('Utilisateur mis à jour avec succès', updateData);
      return result;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<any> {
    console.log("Suppression de l'utilisateur", id);
    const sql = `DELETE FROM USERS WHERE ID = :ID`;
    const binds = { ID: id };
    const result = await execute(sql, Object.values(binds));
    console.log("Utilisateur supprimé avec succès");
    return result;
  }
}