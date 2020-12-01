import { Factory } from './factory';
import { ProviderController } from '../controllers';
import Container from 'typedi';

export class ProviderControllerFactory implements Factory<ProviderController> {
    build(): ProviderController {
        return Container.get(ProviderController);
    }
}
