import { Role } from "./RolesInterface";

export const fetchRoles = async (): Promise<Role[]> => {
  try {
    console.log("Fetching roles...");
    const response = await fetch("http://127.0.0.1:3333/roles");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error("La réponse n'est pas du JSON");
    }
    const roles = await response.json();
    console.log("Roles fetched successfully.");
    return roles;
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
    throw error;
  }
};

export const createRole = async (name: string): Promise<Role> => {
    try {
        console.log(`Création du rôle: ${name}`);
        const response = await fetch("http://127.0.0.1:3333/roles", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const role = await response.json();
        console.log("Rôle créé avec succès:", role);
        return role;
    } catch (error) {
        console.error("Erreur lors de la création du rôle:", error);
        throw error;
    }
}

export const updateRole = async (role: Role): Promise<Role> => {
    try {
        console.log(`Mise à jour du rôle: ${role._id}`);
        const response = await fetch(`http://127.0.0.1:3333/roles/${role._id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(role),
        });
        const updatedRole = await response.json();
        console.log("Rôle mis à jour avec succès:", updatedRole);
        return updatedRole;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du rôle:", error);
        throw error;
    }
}

export const deleteRole = async (id: string): Promise<void> => {
    try {
        console.log(`Suppression du rôle: ${id}`);
        const response = await fetch(`http://127.0.0.1:3333/roles/${id}`, {
            method: "DELETE",
        });
        if (response.status === 204) {
            console.log("Rôle supprimé avec succès");
            return;
        }
        const deletedRole = await response.json();
        console.log("Rôle supprimé avec succès:", deletedRole);
    } catch (error) {
        console.error("Erreur lors de la suppression du rôle:", error);
        throw error;
    }
}
