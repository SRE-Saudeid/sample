export class SerializeResponse {
    private _removeCommonItems<T>(obj: T): T {
        const removeFields = ['updatedAt', '__v'];
        removeFields.forEach(field => delete obj[field]);
        return obj;
    }

    getDataWithDesiredFields<T>(obj: T, desiredFields: string[]): T {
        const filteredData = {};
        for (let key of Object.keys(obj)) {
            if (desiredFields.includes(key)) {
                filteredData[key] = obj[key];
            }
        }
        return <T>this._removeCommonItems(filteredData);
    }

    getDataWithoutUnwantedFields<T>(obj: T, unwantedFields: string[]): T {
        const filteredData = {};
        for (let key of Object.keys(obj)) {
            if (!unwantedFields.includes(key)) {
                filteredData[key] = obj[key];
            }
        }
        return <T>this._removeCommonItems(filteredData);
    }
}
