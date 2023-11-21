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

export const addRoute = async (name: string, position: number, url: string, file: File) => {
    try {
        const route: Partial<Route> = {
            __v: 0,
            url,
            position,
            visible: true,
            name,
            createdAt: new Date(),
            deletedAt: null,
            updatedAt: new Date()
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('route', JSON.stringify(route));

        const response = await fetch('http://127.0.0.1:3333/routes', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de la route: ${response.statusText}`);
        }
        const data = await response.json();
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
