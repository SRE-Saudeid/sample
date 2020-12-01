import { HttpStatusCode, log, Logger } from 'fleury-digital-commons';
import { ContainerInstance } from 'typedi';
import { CouponRepository } from '../repositories';
import { CouponDto } from './dto';

export class CouponLogic {
    private repository: CouponRepository;

    constructor(container: ContainerInstance) {
        this.repository = container.get(CouponRepository);
    }

    private _checkDates(startDate: Date, endDate: Date): void {
        if (startDate >= endDate)
            throw {
                status: HttpStatusCode.BAD_REQUEST,
                message: "endDate must be more than startDate"
            }
    }

    @log
    async createCoupon(coupon: CouponDto): Promise<CouponDto> {
        try {
            this._checkDates(coupon.startDate, coupon.endDate);

            return (await this.repository.create(coupon)).toObject();
        } catch (err) {
            Logger.error('Error CouponLogic createCoupon method', err);
            throw err;
        }
    }

    @log
    async updateCoupon(id: string, coupon: CouponDto): Promise<CouponDto> {
        try {
            if (coupon.startDate && coupon.endDate) {
                this._checkDates(coupon.startDate, coupon.endDate);
            } else if (coupon.startDate || coupon.endDate) {
                throw {
                    status: HttpStatusCode.BAD_REQUEST,
                    message: "must have startDate and endDate"
                }
            }

            return (await this.repository.update(id, coupon)).toObject();
        } catch (err) {
            Logger.error('Error CouponLogic updateCoupon method', err);
            throw err;
        }
    }

    @log
    async getAllCoupons(query?: unknown): Promise<CouponDto[]> {
        try {
            const coupons = await this.repository.getAll(query);
            return coupons.map(coupon => coupon.toObject());
        } catch (err) {
            Logger.error('Error CouponLogic getAllCoupons method', err);
            throw err;
        }
    }

    @log
    async getCouponById(id: string): Promise<CouponDto> {
        try {
            return (await this.repository.getOne(id)).toObject();
        } catch (err) {
            Logger.error('Error CouponLogic getCouponById method', err);
            throw err;
        }
    }

    @log
    async disableCouponById(id: string): Promise<void> {
        try {
            await this.repository.disable(id);
        } catch (err) {
            Logger.error('Error CouponLogic disableCouponById method', err);
            throw err;
        }
    }
}
