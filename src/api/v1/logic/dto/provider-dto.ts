export interface ProviderDto {
    id?: string;
    name: string;
    cnpj: string;
    hiperlink: string;
    imageUrl: string;
    active?: boolean;
    createdAt?: Date;
}

export enum ProviderData {
    ID = 'id',
    NAME = 'name',
    CNPJ = 'cnpj',
    HIPERLINK = 'hiperlink',
    IMAGE_URL = 'imageUrl',
    ACTIVE = 'active',
    CREATED_AT = 'createdAt',
}
