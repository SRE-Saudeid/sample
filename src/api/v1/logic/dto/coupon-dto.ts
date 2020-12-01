export interface CouponDto {
    id?: string;
    provider: string;
    name: string;
    description: string;
    code: string;
    link: string;
    imageUrl: string;
    title: string;
    startDate: Date;
    endDate: Date;
    active?: boolean;
    createdAt?: Date;
}

export enum CouponData {
    ID = 'id',
    PROVIDER = 'provider',
    NAME = 'name',
    DESCRIPTION = 'description',
    CODE = 'code',
    LINK = 'link',
    IMAGE_URL = 'imageUrl',
    TITLE = 'title',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    ACTIVE = 'active',
    CREATED_AT = 'createdAt',
}
