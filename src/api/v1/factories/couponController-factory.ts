import { Factory } from './factory';
import { CouponController } from '../controllers';
import Container from 'typedi';

export class CouponControllerFactory implements Factory<CouponController> {
    build(): CouponController {
        return Container.get(CouponController);
    }
}
