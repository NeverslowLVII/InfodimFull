import { Route } from './RoutesTypes';

export const fetchRoutes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/routes');
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error(`Erreur lors de la récupération des données: ${data.message}`);
        }
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des données: ${error}`);
    }
};

export const addRoute = async (name: string, position: number, url: string, updateRoutes: (route: Route) => void) => {
    console.log(`Demande d'ajout de route reçue. Nom: ${name}, Position: ${position}, URL: ${url}`);
    try {
        if (!name || !position || !url) {
            throw new Error("Tous les champs sont requis");
        }

        const routeData = {
            name,
            position,
            url,
            visible: false
        };

        const response = await fetch('http://127.0.0.1:3333/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeData),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de la route: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Réponse reçue du serveur. Données de la nouvelle route: ${JSON.stringify(data)}`);
        
        // Update the routes list state
        await updateRoutes(data);

        return data;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout de la route: ${error}`);
    }
};

export const updateRoute = async (route: Route, position: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:3333/routes/${route._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...route, position, visible: route.visible }),
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour de la route: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de la route: ${error}`);
    }
};

export const deleteRoute = async (id: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:3333/routes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression de la route: ${response.statusText}`);
        }
        // Check if the response is empty
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        throw new Error(`Erreur lors de la suppression de la route: ${error}`);
    }
};