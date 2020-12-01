import { CouponDto, CouponData } from '../../logic/dto';
import { Service, ContainerInstance } from 'typedi';
import { CouponFacade } from '../coupon-facade';
import { CouponLogic, ProviderLogic } from '../../logic';
import { SerializeResponse } from '../../utils';

@Service()
export class CouponFacadeImpl implements CouponFacade {
    private logic: CouponLogic;
    private providerLogic: ProviderLogic;
    private serializeResponse: SerializeResponse;

    constructor(container: ContainerInstance) {
        this.logic = container.get(CouponLogic);
        this.providerLogic = container.get(ProviderLogic);
        this.serializeResponse = container.get(SerializeResponse);
    }

    private _couponResponse(coupon: CouponDto): CouponDto {
        return this.serializeResponse.getDataWithoutUnwantedFields(coupon, [CouponData.CREATED_AT]);
    }

    async createCoupon(coupon: CouponDto): Promise<CouponDto> {
        await this.providerLogic.getProviderById(coupon.provider);
        const newCoupon = await this.logic.createCoupon(coupon);
        return this._couponResponse(newCoupon);
    }

    async getAllCoupons(query?: unknown): Promise<CouponDto[]> {
        const coupons = await this.logic.getAllCoupons(query);
        return coupons.map(coupon => this._couponResponse(coupon));
    }

    async getCouponById(id: string): Promise<CouponDto> {
        const coupon = await this.logic.getCouponById(id);
        return this._couponResponse(coupon);
    }

    async updateCouponById(id: string, coupon: CouponDto): Promise<CouponDto> {
        const newCoupon = await this.logic.updateCoupon(id, coupon);
        return this._couponResponse(newCoupon);
    }

    async disableCouponById(id: string): Promise<void> {
        await this.logic.disableCouponById(id);
    }
}
