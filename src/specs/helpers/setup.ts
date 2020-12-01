import { Server } from '../../config/server';
import { ProviderModel, CouponModel } from '../../api/v1/repositories/models';

class SetupTest {
    app;

    async createServer() {
        this.app = await Server.init();
    }

    async closeServer() {
        await this.app.close();
    }

    async getServer() {
        await this.createServer();
        await this.cleanDB();
        return this.app;
    }

    async cleanDB() {
        await CouponModel.deleteMany({});
        await ProviderModel.deleteMany({});
    }
}

export default new SetupTest();
