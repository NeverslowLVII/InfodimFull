export interface Route {
    _id: string;
    url: string;
    position: number;
    visible: boolean;
    name?: string;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date;
    __v: number;
}