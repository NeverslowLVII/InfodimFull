import mongoose from "mongoose";

// Création du type Changelog
export type Changelog = {
    action: string,
    documentId: string,
    collection: string,
    timestamp: Date,
    changes: object,
}

// Création du schema changelogSchema
const changelogSchema = new mongoose.Schema<Changelog>({
    action: { type: String, required: true },
    documentId: { type: String, required: true },
    collection: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    changes: { type: Object, required: true },
}, { suppressReservedKeysWarning: true })

export const Changelog = mongoose.model<Changelog>('Changelog', changelogSchema);