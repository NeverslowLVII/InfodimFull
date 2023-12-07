

export type OptionType = { value: string; label: string };

export interface User {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    matricule: string;
    password: string;
    roles: mongoose.Types.ObjectId[];
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date;
    __v: number;
}