import { ProviderFacade, ProviderFacadeImpl } from '../facade';
import { ContainerInstance, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { log, HttpStatusCode, Logger } from 'fleury-digital-commons';

@Service()
export class ProviderController {
    private facade: ProviderFacade;

    constructor(container: ContainerInstance) {
        this.facade = container.get<ProviderFacade>(ProviderFacadeImpl);
    }

    @log
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const provider = await this.facade.createProvider(req.body);
            res.status(HttpStatusCode.CREATED).json(provider);
        } catch (err) {
            Logger.error('Error ProviderController create method', err);
            next(err);
        }
    }

    @log
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const providers = await this.facade.getAllProviders(req.query);
            res.status(providers.length ? HttpStatusCode.OK : HttpStatusCode.NO_CONTENT).json(providers);
        } catch (err) {
            Logger.error('Error ProviderController getAll method', err);
            next(err);
        }
    }

    @log
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.facade.getProviderById(id);
            res.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            Logger.error('Error ProviderController getOne method', err);
            next(err);
        }
    }

    @log
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.facade.updateProviderById(id, req.body);
            res.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            Logger.error('Error ProviderController update method', err);
            next(err);
        }
    }

    @log
    async disable(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.facade.disableProviderById(id);
            res.status(HttpStatusCode.NO_CONTENT).json();
        } catch (err) {
            Logger.error('Error ProviderController disable method', err);
            next(err);
        }
    }
}
