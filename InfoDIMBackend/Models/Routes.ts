import mongoose, { Model, Types } from "mongoose";
import { Changelog } from './Changelog';

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
    const changes = this.getChanges();
    if (!this.visible) {
        const changelog = new Changelog({
            action: 'delete',
            documentId: this._id.toString(),
            collection: 'Route',
            changes: changes,
        });
        changelog.save();
    } else if (Object.keys(changes).length > 0) {
        const changelog = new Changelog({
            action: this.isNew ? 'create' : 'update',
            documentId: this._id.toString(),
            collection: 'Route',
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