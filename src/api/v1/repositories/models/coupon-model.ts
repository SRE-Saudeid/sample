import { Document, model, Schema, Types } from 'mongoose';

export interface ICouponModel extends Document {
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
}

const CouponSchema = new Schema(
    {
        provider: {
            type: Types.ObjectId,
            ref: 'Provider',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    },
);

const CouponModel = model<ICouponModel>('Coupon', CouponSchema);

export { CouponModel };
