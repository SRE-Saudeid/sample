import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'fleury-digital-commons';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const secret = process.env.JWT_SECRET;
        Logger.info('authorization', req.headers);
        const result = jwt.verify(req.headers.authorization, secret).sub;
        req.headers.sub = result;
        next();
    } catch (error) {
        Logger.error('Authorization error', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
