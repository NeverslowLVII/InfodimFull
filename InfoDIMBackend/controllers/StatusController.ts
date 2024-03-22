import { Request, Response, NextFunction } from 'express';

export default{
    status : (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ status: 'OK' });
        } catch (error) {
            const safeError = { ...error, message: error.message, stack: error.stack };
            delete safeError.config;
            delete safeError.request;
            delete safeError.response;
            next(safeError);
        }
    }
}