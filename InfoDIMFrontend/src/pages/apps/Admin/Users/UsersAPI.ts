import { User } from './UsersInterface';
import { generateTempPassword } from '../../../../utils/password';

export const fetchUsers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/users');
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            console.error('Erreur lors de la récupération des données:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return [];
    }
};

export const fetchUserByMatricule = async (matricule: string) => {
    // Implement the logic to fetch a user by matricule
    const users = await fetchUsers();
    return users.find(user => user.matricule === matricule);
};

export const addUser = async (firstName: string, lastName: string, matricule: string, password: string, roles: Types.ObjectId[]) => {
    // Check if a user with the same matricule already exists
    const existingUser = await fetchUserByMatricule(matricule);
    if (existingUser) {
        console.error('A user with the same matricule already exists');
        return;
    }

    console.log('firstName:', firstName);
    console.log('lastName:', lastName);
    console.log('matricule:', matricule);
    console.log('password:', password);
    console.log('roles:', roles);

    const user: User = {
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        matricule: matricule,
        roles: roles,
        password: generateTempPassword(),
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        __v: 0,
    };

    console.log('Data before adding user:', user);

    return fetch('http://127.0.0.1:3333/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => response.json())
        .catch(error => {
            console.error("Erreur lors de l'ajout de l'utilisateur':", error);
            throw error;
        });
};

export const updateUser = (user: User) => {
    return fetch('http://127.0.0.1:3333/users/' + user._id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error;
        });
};

export async function deleteUser(userId: string) {
    const response = await fetch('http://localhost:3333/users/' + userId, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur: ${response.statusText}`);
    }
    const text = await response.text();
    if (text) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur: ${text}`);
    }
}

export const fetchRoles = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3333/roles');
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            console.error('Erreur lors de la récupération des rôles:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
        return [];
    }
};