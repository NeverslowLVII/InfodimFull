import { execute } from '../oracleDB';

export default class RouteService {
    async createRoute(routeData: any): Promise<any> {
        console.log('Création d\'un onglet', routeData);
        const sql = `INSERT INTO ROUTES (URL, NAME, POSITION, VISIBLE) VALUES (:URL, :NAME, :POSITION, :VISIBLE)`;
        const binds = { ...routeData };
        try {
            await execute(sql, binds);
            console.log('Onglet créé avec succès', routeData);
        } catch (error) {
            console.error('Erreur lors de la création de l\'onglet', error);
        }
        return routeData;
    }
    async getRoutes(): Promise<any> {
        console.log('Récupération de tous les onglets');
        const sql = `SELECT * FROM ROUTES`;
        let result;
        try {
            result = await execute(sql);
            console.log('Onglets récupérés avec succès', result.rows);
        } catch (error) {
            console.error('Erreur lors de la récupération des onglets', error);
        }
        return result?.rows;
    }
    async getRoute(id: number): Promise<any> {
        console.log('Récupération de l\'onglet par ID', id);
        const sql = `SELECT * FROM ROUTES WHERE ID = :ID`;
        const binds = { ID: id };
        let result;
        try {
            result = await execute(sql, Object.values(binds));
            console.log('Onglet récupéré avec succès', result.rows[0]);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'onglet', error);
        }
        return result?.rows[0];
    }
    async updateRoute(id: number, updateData: any): Promise<any> {
        console.log('Mise à jour de l\'onglet', id, updateData);
        const sql = `UPDATE ROUTES SET ROLES = :ROLES WHERE ID = :ID`;
        const binds = { ID: id, ...updateData };
        try {
            await execute(sql, binds);
            console.log('Onglet mis à jour avec succès', updateData);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'onglet', error);
        }
        return updateData;
    }
    async deleteRoute(id: number): Promise<any> {
        console.log('Suppression de l\'onglet', id);
        const sql = `DELETE FROM ROUTES WHERE ID = :ID`;
        const binds = { ID: id };
        try {
            await execute(sql, Object.values(binds));
            console.log('Onglet supprimé avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'onglet', error);
        }
    }
    async updateRouteVisibility(id: number, visibility: boolean): Promise<any> {
        console.log('Mise à jour de la visibilité de l\'onglet', id, visibility);
        const sql = `UPDATE ROUTES SET VISIBLE = :VISIBLE WHERE ID = :ID`;
        const binds = { ID: id, VISIBLE: visibility };
        try {
            await execute(sql, Object.values(binds));
            console.log('Visibilité de l\'onglet mise à jour avec succès', visibility);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la visibilité de l\'onglet', error);
        }
        return visibility;
    }
}