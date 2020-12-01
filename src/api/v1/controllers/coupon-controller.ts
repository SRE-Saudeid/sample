import { CouponFacade, CouponFacadeImpl } from '../facade';
import { ContainerInstance, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { log, HttpStatusCode, Logger } from 'fleury-digital-commons';

@Service()
export class CouponController {
    private facade: CouponFacade;

    constructor(container: ContainerInstance) {
        this.facade = container.get<CouponFacade>(CouponFacadeImpl);
    }

    @log
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const coupon = await this.facade.createCoupon(req.body);
            res.status(HttpStatusCode.CREATED).json(coupon);
        } catch (err) {
            Logger.error('Error CouponController create method', err);
            next(err);
        }
    }

    @log
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const coupons = await this.facade.getAllCoupons(req.query);
            res.status(coupons.length ? HttpStatusCode.OK : HttpStatusCode.NO_CONTENT).json(coupons);
        } catch (err) {
            Logger.error('Error CouponController getAll method', err);
            next(err);
        }
    }

    @log
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.facade.getCouponById(id);
            res.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            Logger.error('Error CouponController getOne method', err);
            next(err);
        }
    }

    @log
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.facade.updateCouponById(id, req.body);
            res.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            Logger.error('Error CouponController update method', err);
            next(err);
        }
    }

    @log
    async disable(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.facade.disableCouponById(id);
            res.status(HttpStatusCode.NO_CONTENT).json();
        } catch (err) {
            Logger.error('Error CouponController disable method', err);
            next(err);
        }
    }
}
