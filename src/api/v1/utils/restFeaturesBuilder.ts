import { DocumentQuery } from 'mongoose';

export class RestFeaturesBuilder<T extends DocumentQuery<T, any>> {
    query: T;
    queryString: any;

    constructor(query: T, queryString: unknown) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        const newObj = {};
        for (const [key, value] of Object.entries(queryObj)) {
            if (!value.toString().match(/\d/)) newObj[key] = { $regex: `^${value}`, $options: 'i' };
            else newObj[key] = value;
        }

        let queryStr = JSON.stringify(newObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = <any>this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        this.query = this.query.sort('-createdAt');

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    build() {
        return this.query;
    }
}
