import SetupTest from '../helpers/setup';
import * as request from 'supertest';
import { COUPON, PROVIDER } from '../mocks';

describe('Suite Coupon Routes', () => {
    let app;
    let couponId;
    const URL = '/v1/coupons';

    beforeAll(async () => {
        app = await SetupTest.getServer();
        const { body } = await request(app).post('/v1/providers').send(PROVIDER);
        COUPON.provider = body.id;
    });

    afterAll(async () => {
        await SetupTest.closeServer();
    });

    describe('/', () => {
        test('it should return an error if send the body without an required field', async () => {
            const coupon = { ...COUPON };
            delete coupon.name;
            const res = await request(app).post(URL).send(coupon);
            expect(res.status).toEqual(422);
        });

        test('it should return an error if send the body with an invalid provider', async () => {
            const coupon = { ...COUPON };
            coupon.provider = '507f1f77bcf86cd799439011';
            const res = await request(app).post(URL).send(coupon);
            expect(res.status).toEqual(404);
        });
        
        test('it should return an error if endDate is great than startDate', async () => {
            const coupon = { ...COUPON };
            coupon.startDate = new Date(2020, 9, 10);
            const res = await request(app).post(URL).send(coupon);
            expect(res.status).toEqual(400);
        });

        test('it should return nothing if does not have coupons', async () => {
            const res = await request(app).get(URL);
            expect(res.status).toEqual(204);
        });

        test('it should create a new coupon', async () => {
            const res = await request(app).post(URL).send(COUPON);
            couponId = res.body.id;
            expect(res.status).toEqual(201);
        });

        test('it should return an error with create a duplicate coupon', async () => {
            const res = await request(app).post(URL).send(COUPON);
            expect(res.status).toEqual(409);
        });

        test('it should get all coupons', async () => {
            const res = await request(app).get(URL);
            expect(res.status).toEqual(200);
        });
    });

    describe('/:id', () => {
        test('it should return an error if coupon does not exist', async () => {
            const res = await request(app).get(`${URL}/507f1f77bcf86cd799439011`);
            expect(res.status).toEqual(404);
        });

        test('it should get a coupon', async () => {
            const res = await request(app).get(`${URL}/${couponId}`);
            expect(res.status).toEqual(200);
        });

        test('it should change the coupons name', async () => {
            const res = await request(app).patch(`${URL}/${couponId}`).send({ name: 'Promoção de Natal' });
            expect(res.status).toEqual(200);
        });

        test('it should return an error if try update an invalid field', async () => {
            const res = await request(app).patch(`${URL}/${couponId}`).send({ price: 5000 });
            expect(res.status).toEqual(422);
        });

        test('it should disable a coupon', async () => {
            const res = await request(app).delete(`${URL}/${couponId}`);
            expect(res.status).toEqual(204);
        });
    });
});
