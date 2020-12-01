import { Document, model, Schema } from 'mongoose';

export interface IProviderModel extends Document {
    name: string;
    cnpj: string;
    hiperlink: string;
    imageUrl: string;
    active?: boolean;
}

const ProviderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        cnpj: {
            type: String,
            required: true,
            unique: true,
        },
        hiperlink: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
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

const ProviderModel = model<IProviderModel>('Provider', ProviderSchema);

export { ProviderModel };
