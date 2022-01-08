import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

// eslint-disable-next-line
export const handleValidations = (validate: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
      return next();
    }

    const { details } = result.error;
    const message = details.map((e) => e.message);
    const msg = message.join(',');
    throw new HttpException(400, msg);
  };
};