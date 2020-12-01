import * as swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    apis: ['**/api/v1/routes/documentation/*.yml'],
    basePath: '/',
    swaggerDefinition: {
        info: {
            title: 'Fleury Parceiros',
            version: '0.1.0',
        },
        stripPrefix: '/v1',
    },
};
const specs = swaggerJsdoc(options);

export default specs;
