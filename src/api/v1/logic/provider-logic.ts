import { HttpStatusCode, log, Logger } from 'fleury-digital-commons';
import { ContainerInstance } from 'typedi';
import { ProviderRepository } from '../repositories';
import { DocumentValidator } from '../utils';
import { ProviderDto } from './dto';

export class ProviderLogic {
    private repository: ProviderRepository;
    private documentValidator: DocumentValidator;

    constructor(container: ContainerInstance) {
        this.repository = container.get(ProviderRepository);
        this.documentValidator = container.get(DocumentValidator);
    }

    private _validateCnpj(cnpj: string): void {
        if (!this.documentValidator.isCnpjValid(cnpj)) 
                throw {
                    status: HttpStatusCode.BAD_REQUEST,
                    message: 'Invalid CNPJ'
                }
    }

    @log
    async createProvider(provider: ProviderDto): Promise<ProviderDto> {
        try {
            this._validateCnpj(provider.cnpj);
            return (await this.repository.create(provider)).toObject();
        } catch (err) {
            Logger.error('Error ProviderLogic createProvider method', err);
            throw err;
        }
    }

    @log
    async updateProvider(id: string, provider: ProviderDto): Promise<ProviderDto> {
        try {
            if (provider.cnpj) this._validateCnpj(provider.cnpj);

            return (await this.repository.update(id, provider)).toObject();
        } catch (err) {
            Logger.error('Error ProviderLogic updateProvider method', err);
            throw err;
        }
    }

    @log
    async getAllProviders(query?: unknown): Promise<ProviderDto[]> {
        try {
            const providers = await this.repository.getAll(query);
            return providers.map(provider => provider.toObject());
        } catch (err) {
            Logger.error('Error ProviderLogic getAllProviders method', err);
            throw err;
        }
    }

    @log
    async getProviderById(id: string): Promise<ProviderDto> {
        try {
            return (await this.repository.getOne(id)).toObject();
        } catch (err) {
            Logger.error('Error ProviderLogic getProviderById method', err);
            throw err;
        }
    }

    @log
    async disableProviderById(id: string): Promise<void> {
        try {
            await this.repository.disable(id);
        } catch (err) {
            Logger.error('Error ProviderLogic disableProviderById method', err);
            throw err;
        }
    }
}
