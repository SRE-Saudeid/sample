import Container from 'typedi';
import { PROVIDER, PROVIDER_MODEL } from '../mocks';
import { ProviderRepository } from '../../api/v1/repositories';
import { ProviderFacadeImpl } from '../../api/v1/facade';

jest.mock('../../api/v1/repositories/provider-repository');

describe('Tests provider facade', () => {
    beforeEach(() => {
        Container.reset();
    });

    test('should create a provider', async () => {
        ProviderRepository.prototype.create = jest.fn().mockImplementation(() => PROVIDER_MODEL);

        const result = await Container.get(ProviderFacadeImpl).createProvider(PROVIDER);

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to create a provider', async () => {
        ProviderRepository.prototype.create = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(ProviderFacadeImpl).createProvider(PROVIDER);

        await expect(result).rejects.toThrow();
    });
    
    test('should get all providers', async () => {
        ProviderRepository.prototype.getAll = jest.fn().mockImplementation(() => [PROVIDER_MODEL]);

        const result = await Container.get(ProviderFacadeImpl).getAllProviders();

        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty('id');
    });

    test('should throw an error to get all providers', async () => {
        ProviderRepository.prototype.getAll = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(ProviderFacadeImpl).getAllProviders();

        await expect(result).rejects.toThrow();
    });
    
    test('should get a provider', async () => {
        ProviderRepository.prototype.getOne = jest.fn().mockImplementation(() => PROVIDER_MODEL);

        const result = await Container.get(ProviderFacadeImpl).getProviderById('id');

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to get a provider', async () => {
        ProviderRepository.prototype.getOne = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(ProviderFacadeImpl).getProviderById('id');

        await expect(result).rejects.toThrow();
    });
    
    test('should update a provider', async () => {
        ProviderRepository.prototype.update = jest.fn().mockImplementation(() => PROVIDER_MODEL);

        const result = await Container.get(ProviderFacadeImpl).updateProviderById('id', PROVIDER);

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to update a provider', async () => {
        ProviderRepository.prototype.update = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(ProviderFacadeImpl).updateProviderById('id', PROVIDER);

        await expect(result).rejects.toThrow();
    });
    
    test('should disable a provider', async () => {
        ProviderRepository.prototype.disable = jest.fn().mockImplementation();

        await Container.get(ProviderFacadeImpl).disableProviderById('id');

        expect(ProviderRepository.prototype.disable).toBeCalled();
    });

    test('should throw an error to disable a provider', async () => {
        ProviderRepository.prototype.disable = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(ProviderFacadeImpl).disableProviderById('id');

        await expect(result).rejects.toThrow();
    });
});
