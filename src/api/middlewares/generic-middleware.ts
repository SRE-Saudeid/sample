import { Request, Response, NextFunction } from 'express';

export interface Middleware {
    handler: (req: Request, res: Response, next: NextFunction) => unknown;
}

export interface ErrorMiddleware {
    handler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
