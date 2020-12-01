import { Router, Request, Response, NextFunction } from 'express';
import { RouteValidator } from './validations';
import { ProviderControllerFactory } from '../factories';
import Container from 'typedi';
import { ProviderSchemaValidator } from './schemas';

const factory = Container.get(ProviderControllerFactory);

const ProviderRoute = Router();

ProviderRoute.route('/providers')
    .get((req: Request, res: Response, next: NextFunction) => factory.build().getAll(req, res, next))
    .post(
        RouteValidator.validate(ProviderSchemaValidator.createProvider()),
        (req: Request, res: Response, next: NextFunction) => factory.build().create(req, res, next),
    );

ProviderRoute.route('/providers/:id')
    .get(
        RouteValidator.validate(ProviderSchemaValidator.getById()),
        (req: Request, res: Response, next: NextFunction) => factory.build().getOne(req, res, next),
    )
    .patch(
        RouteValidator.validate(ProviderSchemaValidator.getByIdAndUpdate()),
        (req: Request, res: Response, next: NextFunction) => factory.build().update(req, res, next),
    )
    .delete(
        RouteValidator.validate(ProviderSchemaValidator.getById()),
        (req: Request, res: Response, next: NextFunction) => factory.build().disable(req, res, next),
    );

export { ProviderRoute };
