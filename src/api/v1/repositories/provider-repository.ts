import { ProviderDto } from '../logic/dto';
import { ProviderModel, IProviderModel } from './models';
import { log, Logger } from 'fleury-digital-commons';
import { RestFeaturesBuilder } from '../utils';
import { Query } from 'mongoose';

export class ProviderRepository {
    @log
    async create(provider: ProviderDto): Promise<IProviderModel> {
        try {
            return await ProviderModel.create(provider);
        } catch (err) {
            Logger.error('Error ProviderRepository create method', err);
            throw err;
        }
    }

    @log
    async update(id: string, provider: unknown): Promise<IProviderModel> {
        try {
            const params = {
                new: true,
                runValidators: true,
            };
            return await ProviderModel.findByIdAndUpdate(id, provider, params);
        } catch (err) {
            Logger.error('Error ProviderRepository update method', err);
            throw err;
        }
    }

    @log
    async getAll(query?: unknown): Promise<IProviderModel[]> {
        try {
            const queryResponse = new RestFeaturesBuilder(<Query<any>>ProviderModel.find(), query)
                .sort()
                .paginate()
                .build();
            return await queryResponse;
        } catch (err) {
            Logger.error('Error ProviderRepository getAll method', err);
            throw err;
        }
    }

    @log
    async getOne(id: string): Promise<IProviderModel> {
        try {
            return await ProviderModel.findById(id);
        } catch (err) {
            Logger.error('Error ProviderRepository getOne method', err);
            throw err;
        }
    }

    @log
    async disable(id: string): Promise<void> {
        try {
            await ProviderModel.findByIdAndUpdate(id, { active: false });
        } catch (err) {
            Logger.error('Error ProviderRepository disableById method', err);
            throw err;
        }
    }
}
