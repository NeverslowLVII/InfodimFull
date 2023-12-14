import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

// This function takes a Joi schema and returns a middleware function
const validateRequest = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.error('Validation error: ' + error.message);
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};

export default validateRequest;
