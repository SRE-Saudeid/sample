import SetupTest from '../helpers/setup';
import * as request from 'supertest';
import { PROVIDER } from '../mocks';

describe('Suite Provider Routes', () => {
    let app;
    let providerId;
    const URL = '/v1/providers';

    beforeAll(async () => {
        app = await SetupTest.getServer();
    });

    afterAll(async () => {
        await SetupTest.closeServer();
    });

    describe('/', () => {
        test('it should return an error if send the body without an required field', async () => {
            const provider = { ...PROVIDER };
            delete provider.cnpj;
            const res = await request(app).post(URL).send(provider);
            expect(res.status).toEqual(422);
        });

        test('it should return nothing if does not have providers', async () => {
            const res = await request(app).get(URL);
            expect(res.status).toEqual(204);
        });

        test('it should return an error if try use an invalid cnpj', async () => {
            const provider = { ...PROVIDER };
            provider.cnpj = '00000000000000';
            const res = await request(app).post(URL).send(provider);
            expect(res.status).toEqual(400);
        });

        test('it should create a new provider', async () => {
            const res = await request(app).post(URL).send(PROVIDER);
            providerId = res.body.id;
            expect(res.status).toEqual(201);
        });

        test('it should return an error with create a duplicate provider', async () => {
            const res = await request(app).post(URL).send(PROVIDER);
            expect(res.status).toEqual(409);
        });

        test('it should get all providers', async () => {
            const res = await request(app).get(URL);
            expect(res.status).toEqual(200);
        });
    });

    describe('/:id', () => {
        test('it should return an error if provider does not exist', async () => {
            const res = await request(app).get(`${URL}/507f1f77bcf86cd799439011`);
            expect(res.status).toEqual(404);
        });

        test('it should get a provider', async () => {
            const res = await request(app).get(`${URL}/${providerId}`);
            expect(res.status).toEqual(200);
        });

        test('it should change the providers name', async () => {
            const res = await request(app).patch(`${URL}/${providerId}`).send({ name: 'Company' });
            expect(res.status).toEqual(200);
        });

        test('it should return an error if try update an invalid field', async () => {
            const res = await request(app).patch(`${URL}/${providerId}`).send({ price: 5000 });
            expect(res.status).toEqual(422);
        });

        test('it should disable a provider', async () => {
            const res = await request(app).delete(`${URL}/${providerId}`);
            expect(res.status).toEqual(204);
        });
    });
});
