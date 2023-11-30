import mongoose, { Model, Types } from "mongoose";
import { ChangelogModel, IChangelog } from './Changelog'; // Import ChangelogModel and IChangelog

// Création du type final Route
export type Route = {
    _id?: Types.ObjectId,
    url: string,
    name: string,
    position: number,
    visible: boolean,
    createdAt: Date,
    deletedAt: Date | null,
    updatedAt: Date,
}

export type RouteStatic = Model<Route> & {

}

// Création du schema routeSchema
const routeSchema = new mongoose.Schema<Route>({
    url: { type: String, required: true },
    name: {type: String, required: true },
    position: { type: Number, required: true },
    visible: { type: Boolean, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
})

routeSchema.pre('save', function(next) {
    const userId = '5f9a3b9b9f9a3b9b9f9a3b9b';
    let action = '';
    let changes: { field: string; oldValue?: any; newValue?: any }[] = [];

    if (this.isNew) {
        action = 'CREER';
        // Pour une nouvelle création, enregistrez tous les champs comme changements
        changes = ['url', 'name', 'position', 'visible', 'createdAt', 'deletedAt', 'updatedAt'].map(field => ({
            field: field,
            newValue: this.get(field)
        }));
    } else {
        // Pour une mise à jour, vérifiez chaque champ pour voir s'il a été modifié
        ['url', 'name', 'position', 'visible', 'createdAt', 'deletedAt', 'updatedAt'].forEach(field => {
            if (this.isModified(field)) {
                changes.push({
                    field: field,
                    oldValue: this.get(field),
                    newValue: this.get(field)
                });
                action = 'MODIFIER';
            }
        });

        if (!this.visible) {
            action = 'SUPPRIMER';
        }
    }

    if (action) {
        const changelog = new ChangelogModel({
            action: action,
            documentId: this._id,
            collectionName: 'Route',
            user: userId,
            changes: changes,
        });
        changelog.save();
    }

    next();
});

// Définition des méthodes
routeSchema.methods = {

}

// Définition des fonctions statiques

export const Route = mongoose.model<Route, RouteStatic>('Route', routeSchema);