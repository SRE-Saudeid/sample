import { CouponDto } from '../logic/dto';
import { CouponModel, ICouponModel } from './models';
import { log, Logger } from 'fleury-digital-commons';
import { RestFeaturesBuilder } from '../utils';
import { Query } from 'mongoose';

export class CouponRepository {
    @log
    async create(coupon: CouponDto): Promise<ICouponModel> {
        try {
            return await CouponModel.create(coupon);
        } catch (err) {
            Logger.error('Error CouponRepository create method', err);
            throw err;
        }
    }

    @log
    async update(id: string, coupon: unknown): Promise<ICouponModel> {
        try {
            const params = {
                new: true,
                runValidators: true,
            };
            return await CouponModel.findByIdAndUpdate(id, coupon, params);
        } catch (err) {
            Logger.error('Error CouponRepository update method', err);
            throw err;
        }
    }

    @log
    async getAll(query?: unknown): Promise<ICouponModel[]> {
        try {
            const queryResponse = new RestFeaturesBuilder(<Query<any>>CouponModel.find(), query)
                .sort()
                .filter()
                .paginate()
                .build();
            return await queryResponse;
        } catch (err) {
            Logger.error('Error CouponRepository getAll method', err);
            throw err;
        }
    }

    @log
    async getOne(id: string): Promise<ICouponModel> {
        try {
            return await CouponModel.findById(id);
        } catch (err) {
            Logger.error('Error CouponRepository getOne method', err);
            throw err;
        }
    }

    @log
    async disable(id: string): Promise<void> {
        try {
            await CouponModel.findByIdAndUpdate(id, { active: false });
        } catch (err) {
            Logger.error('Error CouponRepository disableById method', err);
            throw err;
        }
    }
}
