import mongoose, { Model } from "mongoose";

// Création du type final Role
export type Role = {
    id: string,
    nom: string,
    routes: mongoose.Types.ObjectId[],
    createdAt: Date,
    deletedAt: Date,
    updatedAt: Date,
}

export type RoleStatic = Model<Role> & {

}

// Création du schema roleSchema
const roleSchema = new mongoose.Schema<Role>({
    id: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    createdAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
})

// Définition des méthodes
roleSchema.methods = {

}

// Définition des fonctions statiques

export const Role = mongoose.model<Role, RoleStatic>('Role', roleSchema);