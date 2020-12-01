import { Router, Request, Response, NextFunction } from 'express';
import { RouteValidator } from './validations';
import { CouponControllerFactory } from '../factories';
import Container from 'typedi';
import { CouponSchemaValidator } from './schemas';

const factory = Container.get(CouponControllerFactory);

const CouponRoute = Router();

CouponRoute.route('/coupons')
    .get((req: Request, res: Response, next: NextFunction) => factory.build().getAll(req, res, next))
    .post(
        RouteValidator.validate(CouponSchemaValidator.createCoupon()),
        (req: Request, res: Response, next: NextFunction) => factory.build().create(req, res, next),
    );

CouponRoute.route('/coupons/:id')
    .get(RouteValidator.validate(CouponSchemaValidator.getById()), (req: Request, res: Response, next: NextFunction) =>
        factory.build().getOne(req, res, next),
    )
    .patch(
        RouteValidator.validate(CouponSchemaValidator.getByIdAndUpdate()),
        (req: Request, res: Response, next: NextFunction) => factory.build().update(req, res, next),
    )
    .delete(
        RouteValidator.validate(CouponSchemaValidator.getById()),
        (req: Request, res: Response, next: NextFunction) => factory.build().disable(req, res, next),
    );

export { CouponRoute };
