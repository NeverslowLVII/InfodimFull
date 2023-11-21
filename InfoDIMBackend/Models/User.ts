import mongoose, { Model } from "mongoose";

// Création du type final User
// Ce type représente la structure de l'objet User dans notre base de données
export type User = {
    firstName: string, // Le prénom de l'utilisateur
    lastName: string, // Le nom de l'utilisateur
    matricule: string, // Le matricule unique de l'utilisateur
    password: string, // Le mot de passe de l'utilisateur
    roles: mongoose.Types.ObjectId[], // Les rôles attribués à l'utilisateur
    createdAt: Date, // La date de création de l'utilisateur
    deletedAt: Date, // La date de suppression de l'utilisateur
    updatedAt: Date, // La date de la dernière mise à jour de l'utilisateur
}

// Ce type représente la structure statique de l'objet User
export type UserStatic = Model<User> & {

}

// Création du schéma userSchema
// Ce schéma définit la structure de l'objet User dans notre base de données
const userSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true }, // Le prénom de l'utilisateur
    lastName: { type: String, required: true }, // Le nom de l'utilisateur
    matricule: { type: String, required: true, unique: true }, // Le matricule unique de l'utilisateur
    password: { type: String, required: true }, // Le mot de passe de l'utilisateur
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // Les rôles attribués à l'utilisateur
    createdAt: { type: Date, required: true, default: Date.now }, // La date de création de l'utilisateur
    deletedAt: { type: Date, required: false }, // La date de suppression de l'utilisateur
    updatedAt: { type: Date, required: false }, // La date de la dernière mise à jour de l'utilisateur
})

// Définition des méthodes pour le schéma userSchema
userSchema.methods = {

}

// Définition des fonctions statiques pour le schéma userSchema

// Création du modèle User à partir du schéma userSchema
export const User = mongoose.model<User, UserStatic>('User', userSchema);