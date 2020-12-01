import { Router } from 'express';
import { HealhtChecker } from './health-check-routers';
import { ProviderRoute } from './provider-route';
import { CouponRoute } from './coupon-route';

const v1 = Router();
v1.use(HealhtChecker);
v1.use(ProviderRoute);
v1.use(CouponRoute);

export { v1 };
