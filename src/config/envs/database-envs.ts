export class DataBaseEnvs {
    static readonly URI = process.env.MONGO_URI;
    static readonly DATABASE =
        process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE + '-test' : process.env.MONGO_DATABASE;
}
