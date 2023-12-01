import mongoose, { Model, Types } from "mongoose";
import { ChangelogModel } from "./Changelog";

export type Route = {
  _id?: Types.ObjectId;
  url: string;
  name: string;
  position: number;
  visible: boolean;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
};

export type RouteStatic = Model<Route> & {};
const routeSchema = new mongoose.Schema<Route>({
  url: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: Number, required: true },
  visible: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date, required: false }, 
  updatedAt: { type: Date, required: false },
});

async function createChangelog(action: string, fields: string[], doc: any, userId: Types.ObjectId) {
  console.log("Création d'un changelog pour l'action:", action);
  const changes = fields.map((field) => {
    const oldValue = doc.isModified(field) ? doc.get(field, null, { getters: false }) : undefined;
    const newValue = doc.get(field);
    return {
      field: field,
      oldValue: oldValue,
      newValue: newValue,
    };
  });

  console.log("Détails du changelog:", changes);

  const changelog = new ChangelogModel({
    action: action,
    documentId: doc._id,
    collectionName: "Route",
    user: userId,
    changes: changes,
  });

  await changelog.save();
  console.log("Changelog sauvegardé:", changelog);
}

routeSchema.pre("save", async function (next) {
  const userId: Types.ObjectId = new mongoose.Types.ObjectId("5f9a3b9b9f9a3b9b9f9a3b9b");

  const fieldsToLog = ["url", "name", "position", "visible", "createdAt", "deletedAt", "updatedAt"];
  if (this.isNew) {
    await createChangelog("CREER", fieldsToLog, this, userId);
  } else {
    const updatedFields = fieldsToLog.filter(field => this.isModified(field));
    if (updatedFields.length > 0) {
      await createChangelog("MODIFIER", updatedFields, this, userId);
    }
  }

  next();
});

// Définition des méthodes
routeSchema.methods = {};

// Définition des fonctions statiques

export const Route = mongoose.model<Route, RouteStatic>("Route", routeSchema);
