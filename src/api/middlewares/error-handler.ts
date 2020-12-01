import { HttpStatusCode } from 'fleury-digital-commons';
import { AppEnvs } from '../../config/envs';
import { Request, Response, NextFunction } from 'express';
import { ErrorMiddleware } from './generic-middleware';

class ErrorHandlerMiddleware implements ErrorMiddleware {
    static _handleCastErrorDB(err: any) {
        const message = `Invalid ${err.path}: ${err.value}`;

        return {
            name: 'InvalidField',
            status: HttpStatusCode.BAD_REQUEST,
            message,
        };
    }

    static _handleDuplicateFieldsDB(err: any) {
        const value = Object.keys(err.keyValue);
        const message = `${value} is already registred`;

        return {
            name: 'DuplicateField',
            status: HttpStatusCode.CONFLICT,
            message,
        };
    }

    static _handleValidationErrorDB(err: any) {
        const errors = Object.values(err.errors).map(el => el['message']);
        const message = `Invalid input data. ${errors.join('. ')}`;

        return {
            name: 'ValidationError',
            status: HttpStatusCode.BAD_REQUEST,
            message,
        };
    }

    static _handleNotFound() {
        return {
            name: 'NotFound',
            status: HttpStatusCode.NOT_FOUND,
            message: HttpStatusCode.getStatusText(HttpStatusCode.NOT_FOUND),
        };
    }

    public handler(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === 'CastError') err = ErrorHandlerMiddleware._handleCastErrorDB(err);
        else if (err.message.includes('toObject')) err = ErrorHandlerMiddleware._handleNotFound();
        else if (err['code'] === 11000) err = ErrorHandlerMiddleware._handleDuplicateFieldsDB(err);
        else if (err.name === 'ValidationError') err = ErrorHandlerMiddleware._handleValidationErrorDB(err);

        const statusCode = 'status' in err ? err['status'] : HttpStatusCode.INTERNAL_SERVER_ERROR;
        const response = {
            statusCode: statusCode,
            message: err.message || HttpStatusCode.getStatusText[statusCode],
            stack: err.stack,
        };

        if (AppEnvs.environment === 'prod') {
            delete response.stack;
        }

        res.status(statusCode).json(response);
    }
}

export const ErrorHandler = new ErrorHandlerMiddleware();
