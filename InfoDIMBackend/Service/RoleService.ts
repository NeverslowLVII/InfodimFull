import { execute } from '../oracleDB';
export default class RoleService {
    async createRole(roleData: any): Promise<any> {
        console.log('Création d\'un rôle', roleData);
        const sql = `INSERT INTO ROLES (NAME, DESCRIPTION) VALUES (:NAME, :DESCRIPTION)`;
        const binds = { ...roleData };
        try {
            await execute(sql, binds);
            console.log('Rôle créé avec succès', roleData);
        } catch (error) {
            console.error('Erreur lors de la création du rôle', error);
        }
        return roleData;
    }
    async getRoles(): Promise<any> {
        console.log('Récupération de tous les rôles');
        const sql = `SELECT * FROM ROLES`;
        let result;
        try {
            result = await execute(sql);
            console.log('Rôles récupérés avec succès', result.rows);
        } catch (error) {
            console.error('Erreur lors de la récupération des rôles', error);
        }
        return result?.rows;
    }
    async getRole(id: number): Promise<any> {
        console.log('Récupération du rôle par ID', id);
        const sql = `SELECT * FROM ROLES WHERE ID = :ID`;
        const binds = { ID: id };
        let result;
        try {
            result = await execute(sql, Object.values(binds));
            console.log('Rôle récupéré avec succès', result.rows[0]);
        } catch (error) {
            console.error('Erreur lors de la récupération du rôle', error);
        }
        return result?.rows[0];
    }
    async updateRole(id: number, updateData: any): Promise<any> {
        console.log('Mise à jour du rôle', id, updateData);
        const sql = `UPDATE ROLES SET NAME = :NAME, DESCRIPTION = :DESCRIPTION WHERE ID = :ID`;
        const binds = { ID: id, ...updateData };
        try {
            await execute(sql, binds);
            console.log('Rôle mis à jour avec succès', updateData);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle', error);
        }
        return updateData;
    }
    async deleteRole(id: number): Promise<any> {
        console.log('Suppression du rôle', id);
        const sql = `DELETE FROM ROLES WHERE ID = :ID`;
        const binds = { ID: id };
        try {
            await execute(sql, Object.values(binds));
            console.log('Rôle supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression du rôle', error);
        }
    }
}