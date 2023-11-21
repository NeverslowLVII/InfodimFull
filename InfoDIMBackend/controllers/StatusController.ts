import { Request, Response } from 'express';

export default{
    status : (req: Request, res: Response) => {res.status(200).json({ status: 'OK' });}
}