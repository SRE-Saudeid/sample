import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import specs from './swagger';
import { v1 } from '../api/v1/routes';
import { log } from 'fleury-digital-commons';

export class AppRouters {
    @log
    static load(app: Express) {
        const router = Router();
        router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        router.use('/v1', v1);
        app.use(router);
    }
}

export { v1 };
