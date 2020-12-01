import * as mongoose from 'mongoose';
import { DataBaseEnvs } from './envs';
import { Logger } from 'fleury-digital-commons';

export class DatabaseConfig {
    static async connect() {
        Logger.info(`Connection to Database uri: ${DataBaseEnvs.URI}`);
        await mongoose.connect(DataBaseEnvs.URI, {
            dbName: DataBaseEnvs.DATABASE,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        Logger.info(`Database successfully connected!`);
    }
}
