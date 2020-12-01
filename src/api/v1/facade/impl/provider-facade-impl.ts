import { ProviderDto, ProviderData } from '../../logic/dto';
import { Service, ContainerInstance } from 'typedi';
import { ProviderFacade } from '../provider-facade';
import { ProviderLogic } from '../../logic';
import { DocumentValidator, SerializeResponse } from '../../utils';

@Service()
export class ProviderFacadeImpl implements ProviderFacade {
    private logic: ProviderLogic;
    private serializeResponse: SerializeResponse;

    constructor(container: ContainerInstance) {
        this.logic = container.get(ProviderLogic);
        this.serializeResponse = container.get(SerializeResponse);
    }

    private _providerResponse(provider: ProviderDto): ProviderDto {
        return this.serializeResponse.getDataWithoutUnwantedFields(provider, [ProviderData.CREATED_AT]);
    }

    async createProvider(provider: ProviderDto): Promise<ProviderDto> {
        const newProvider = await this.logic.createProvider(provider);
        return this._providerResponse(newProvider);
    }

    async getAllProviders(query?: unknown): Promise<ProviderDto[]> {
        const providers = await this.logic.getAllProviders(query);
        return providers.map(provider => this._providerResponse(provider));
    }

    async getProviderById(id: string): Promise<ProviderDto> {
        const provider = await this.logic.getProviderById(id);
        return this._providerResponse(provider);
    }

    async updateProviderById(id: string, provider: ProviderDto): Promise<ProviderDto> {
        const newProvider = await this.logic.updateProvider(id, provider);
        return this._providerResponse(newProvider);
    }

    async disableProviderById(id: string): Promise<void> {
        await this.logic.disableProviderById(id);
    }
}
