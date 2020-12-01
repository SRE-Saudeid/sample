import { ProviderDto } from '../logic/dto';

export interface ProviderFacade {
    createProvider: (client: ProviderDto) => Promise<ProviderDto>;
    getAllProviders: (query?: unknown) => Promise<ProviderDto[]>;
    getProviderById: (id: string) => Promise<ProviderDto>;
    updateProviderById: (id: string, provider: unknown) => Promise<ProviderDto>;
    disableProviderById: (id: string) => Promise<void>;
}
