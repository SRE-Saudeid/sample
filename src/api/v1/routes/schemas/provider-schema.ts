import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

export class ProviderSchemaValidator {
    static createProvider(): SchemaValidator {
        return {
            body: Joi.object({
                name: Joi.string().required().description('Provider name field'),
                cnpj: Joi.string().required().min(14).max(14).description('Provider cnpj field'),
                imageUrl: Joi.string().required().description('Provider imageUrl field'),
                hiperlink: Joi.string().required().description('Provider hiperlink field'),
            }),
        };
    }

    static getById(): SchemaValidator {
        return {
            params: Joi.object({
                id: Joi.string().required().description('Provider id param'),
            }),
        };
    }

    static getByIdAndUpdate(): SchemaValidator {
        return {
            params: Joi.object({
                id: Joi.string().required().description('Provider id param'),
            }),
            body: Joi.object({
                name: Joi.string().description('Provider name field'),
                cnpj: Joi.string().min(14).max(14).description('Provider cnpj field'),
                imageUrl: Joi.string().description('Provider imageUrl field'),
                hiperlink: Joi.string().description('Provider hiperlink field'),
            }),
        };
    }
}
