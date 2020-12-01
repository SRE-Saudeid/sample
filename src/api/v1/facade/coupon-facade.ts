import { CouponDto } from '../logic/dto';

export interface CouponFacade {
    createCoupon: (client: CouponDto) => Promise<CouponDto>;
    getAllCoupons: (query?: unknown) => Promise<CouponDto[]>;
    getCouponById: (id: string) => Promise<CouponDto>;
    updateCouponById: (id: string, provider: unknown) => Promise<CouponDto>;
    disableCouponById: (id: string) => Promise<void>;
}
