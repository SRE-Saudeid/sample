export const COUPON = {
    provider: null,
    name: 'BlackFriday Empresa',
    description: 'Ganhe 10% em todos os produtos do nosso site',
    code: 'BLACKFRIDAY',
    imageUrl: 'https://google.com.br/',
    link: 'https://google.com.br/',
    title: '10% na Black Friday',
    startDate: new Date(2020, 6, 10),
    endDate: new Date(2020, 8, 10),
};

export const COUPON_MODEL = {
    toObject: () => ({
        ...COUPON,
        id: '507f1f77bcf86cd799439011',
    }),
};