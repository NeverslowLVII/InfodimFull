import { User } from './UsersTypes';
import { generateTempPassword } from '../../../../utils/password';
import mongoose, { Schema } from 'mongoose';

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

export const addUser = async (firstName: string, lastName: string, matricule: string, password: string, roles: string[]) => {
    const user: User = {
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        matricule: matricule,
        roles: roles.map(role => new mongoose.Types.ObjectId(role)),
        password: generateTempPassword(),
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
        __v: 0,
    };

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

export const deleteUser = (user: User) => {
    console.log('Suppression de l\'utilisateur:', user);
    return fetch('http://127.0.0.1:3333/users/' + user._id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, visible: false }),
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            throw error;
        });
};

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