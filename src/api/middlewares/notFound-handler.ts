import { Container } from 'typedi';
import { HttpStatusCode } from 'fleury-digital-commons';
import { Request, Response, NextFunction } from 'express';
import { Middleware } from './generic-middleware';

export class NotFoundMiddleware implements Middleware {
    handler(req: Request, res: Response, next: NextFunction) {
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: `Endpoint ${req.originalUrl} not found`,
        });
    }

    static get(): NotFoundMiddleware {
        return Container.get(NotFoundMiddleware);
    }
}
