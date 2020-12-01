import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Logger, Plugins } from 'fleury-digital-commons';

export class AppMiddlewares {
    static loadMiddlewares(app: Express) {
        Logger.info('Loading cors');
        app.use(cors());

        Logger.info('Loading BodyParser');
        app.use(bodyParser.json());

        Logger.info('Loading Urlencoded');
        app.use(bodyParser.urlencoded({ extended: true }));

        Logger.info('Loading Helmet');
        app.use(helmet());

        Logger.info('Loading RequestResponseLog');
        app.use(Plugins.Express.RequestResponseLog(null));
    }
}
