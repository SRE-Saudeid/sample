import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

export class CouponSchemaValidator {
    static createCoupon(): SchemaValidator {
        return {
            body: Joi.object({
                provider: Joi.string().required().description('Coupon provider field'),
                name: Joi.string().required().description('Coupon name field'),
                description: Joi.string().required().description('Coupon description field'),
                code: Joi.string().required().description('Coupon code field'),
                link: Joi.string().required().description('Coupon link field'),
                imageUrl: Joi.string().required().description('Coupon imageUrl field'),
                title: Joi.string().required().description('Coupon title field'),
                startDate: Joi.date().required().description('Coupon startDate field'),
                endDate: Joi.date().required().description('Coupon endDate field'),
            }),
        };
    }

    static getById(): SchemaValidator {
        return {
            params: Joi.object({
                id: Joi.string().required().description('Coupon id param'),
            }),
        };
    }

    static getByIdAndUpdate(): SchemaValidator {
        return {
            params: Joi.object({
                id: Joi.string().required().description('Coupon id param'),
            }),
            body: Joi.object({
                name: Joi.string().description('Coupon name field'),
                description: Joi.string().description('Coupon description field'),
                code: Joi.string().description('Coupon code field'),
                link: Joi.string().description('Coupon link field'),
                imageUrl: Joi.string().description('Coupon imageUrl field'),
                title: Joi.string().description('Coupon title field'),
                startDate: Joi.date().description('Coupon startDate field'),
                endDate: Joi.date().description('Coupon endDate field'),
            }),
        };
    }
}
