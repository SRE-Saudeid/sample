import { Router, Request, Response } from 'express';
import { HttpStatusCode } from 'fleury-digital-commons';

const HealhtChecker = Router();
/**
 * @swagger
 * /v1/health/ready:
 *    get:
 *      tags:
 *          - health
 *      description: Check if application is ready to respond request
 *      responses:
 *       200:
 *         description: OK
 */
HealhtChecker.route('/health/ready').get((req: Request, res: Response) => {
    res.type('text').send('OK').status(HttpStatusCode.OK);
});

export { HealhtChecker };
