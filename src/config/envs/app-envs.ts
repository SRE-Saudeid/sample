export class AppEnvs {
    static readonly environment = process.env.NODE_ENV;
    static readonly server = {
        port: +process.env.PORT || 3000,
    };
}
