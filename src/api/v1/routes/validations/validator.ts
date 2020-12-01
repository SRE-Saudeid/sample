import * as Joi from 'joi';
import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'fleury-digital-commons';

export interface SchemaValidator {
    body?: Joi.Schema;
    query?: Joi.Schema;
    params?: Joi.Schema;
}
interface ValidationResult {
    bodyError?: ValidationError;
    queryError?: ValidationError;
    parameterError?: ValidationError;
}
export class RouteValidator {
    static validate(schema: SchemaValidator) {
        return (req: Request, res: Response, next: NextFunction) => {
            const validateResult: ValidationResult = {};

            if (schema.body) {
                validateResult.bodyError = Joi.validate(req.body, schema.body).error;
            }
            if (schema.query) {
                validateResult.queryError = Joi.validate(req.query, schema.query).error;
            }
            if (schema.params) {
                validateResult.parameterError = Joi.validate(req.params, schema.params).error;
            }

            const valid = !validateResult.bodyError && !validateResult.parameterError && !validateResult.queryError;

            if (valid) {
                next();
            } else {
                const details = (validateResult.bodyError ? validateResult.bodyError.details : [])
                    .concat(validateResult.parameterError ? validateResult.parameterError.details : [])
                    .concat(validateResult.queryError ? validateResult.queryError.details : []);

                const message = details.map((i) => i.message).join('; \n ');
                res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({ error: message });
            }
        };
    }
}
