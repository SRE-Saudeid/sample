import Container from 'typedi';
import { COUPON, COUPON_MODEL, PROVIDER_MODEL } from '../mocks';
import { CouponRepository, ProviderRepository } from '../../api/v1/repositories';
import { CouponFacadeImpl } from '../../api/v1/facade';

jest.mock('../../api/v1/repositories/coupon-repository');
jest.mock('../../api/v1/repositories/provider-repository');

describe('Tests coupon facade', () => {
    beforeEach(() => {
        Container.reset();
    });

    test('should create a coupon', async () => {
        const coupon = { ...COUPON };
        coupon.provider = '507f1f77bcf86cd799439011';
        ProviderRepository.prototype.getOne = jest.fn().mockImplementation(() => PROVIDER_MODEL);
        CouponRepository.prototype.create = jest.fn().mockImplementation(() => COUPON_MODEL);

        const result = await Container.get(CouponFacadeImpl).createCoupon(coupon);

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to create a coupon', async () => {
        const coupon = { ...COUPON };
        coupon.provider = '507f1f77bcf86cd799439011';
        ProviderRepository.prototype.getOne = jest.fn().mockImplementation(() => PROVIDER_MODEL);
        CouponRepository.prototype.create = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(CouponFacadeImpl).createCoupon(coupon);

        await expect(result).rejects.toThrow();
    });
    
    test('should get all coupons', async () => {
        CouponRepository.prototype.getAll = jest.fn().mockImplementation(() => [COUPON_MODEL]);

        const result = await Container.get(CouponFacadeImpl).getAllCoupons();

        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty('id');
    });

    test('should throw an error to get all coupons', async () => {
        CouponRepository.prototype.getAll = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(CouponFacadeImpl).getAllCoupons();

        await expect(result).rejects.toThrow();
    });
    
    test('should get a coupon', async () => {
        CouponRepository.prototype.getOne = jest.fn().mockImplementation(() => COUPON_MODEL);

        const result = await Container.get(CouponFacadeImpl).getCouponById('id');

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to get a coupon', async () => {
        CouponRepository.prototype.getOne = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(CouponFacadeImpl).getCouponById('id');

        await expect(result).rejects.toThrow();
    });
    
    test('should update a coupon', async () => {
        CouponRepository.prototype.update = jest.fn().mockImplementation(() => COUPON_MODEL);

        const result = await Container.get(CouponFacadeImpl).updateCouponById('id', COUPON);

        expect(result).toHaveProperty('id');
    });

    test('should throw an error to update a coupon', async () => {
        CouponRepository.prototype.update = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(CouponFacadeImpl).updateCouponById('id', COUPON);

        await expect(result).rejects.toThrow();
    });
    
    test('should disable a coupon', async () => {
        CouponRepository.prototype.disable = jest.fn().mockImplementation();

        await Container.get(CouponFacadeImpl).disableCouponById('id');

        expect(CouponRepository.prototype.disable).toBeCalled();
    });

    test('should throw an error to disable a coupon', async () => {
        CouponRepository.prototype.disable = jest.fn().mockImplementation(() => {
            throw new Error();
        });

        const result = Container.get(CouponFacadeImpl).disableCouponById('id');

        await expect(result).rejects.toThrow();
    });
});
