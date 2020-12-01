import { Logger } from 'fleury-digital-commons';
import * as express from 'express';
import { AppEnvs } from './envs/app-envs';
import { AppMiddlewares } from '../api/middlewares';
import { AppRouters } from './routers';
import { DatabaseConfig } from './database';
import { ErrorHandler } from '../api/middlewares/error-handler';
import { NotFoundMiddleware } from '../api/middlewares/notFound-handler';

const app = express();

export class Server {
    static async init() {
        AppMiddlewares.loadMiddlewares(app);
        AppRouters.load(app);
        await DatabaseConfig.connect();
        app.all('*', NotFoundMiddleware.get().handler);
        app.use(ErrorHandler.handler);
        app.listen(AppEnvs.server.port, () =>
            Logger.info(`server started on port ${AppEnvs.server.port} Environment: ${AppEnvs.environment} 🚀`),
        );
        return app;
    }
}
