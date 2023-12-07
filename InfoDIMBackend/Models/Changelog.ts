interface IChangeDetail {
  field: string;
  oldValue?: any;
  newValue?: any;
}

export interface IChangelog {
  action: 'CREER' | 'MODIFIER' | 'SUPPRIMER';
  documentId: mongoose.Types.ObjectId;
  collectionName: string;
  timestamp: Date;
  user: mongoose.Types.ObjectId; // Si vous souhaitez enregistrer l'utilisateur qui a effectué l'action
  changes?: IChangeDetail[]; // Pour les actions UPDATE, détails des champs modifiés
}

const changeDetailSchema = new mongoose.Schema<IChangeDetail>({
  field: { type: String, required: true },
  oldValue: { type: mongoose.Schema.Types.Mixed },
  newValue: { type: mongoose.Schema.Types.Mixed },
});

const changelogSchema = new mongoose.Schema<IChangelog>({
  action: { type: String, enum: ['CREER', 'MODIFIER', 'SUPPRIMER'], required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  collectionName: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  changes: [changeDetailSchema],
});

export const ChangelogModel = mongoose.model<IChangelog>('Changelog', changelogSchema);