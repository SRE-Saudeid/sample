export class DocumentValidator {
    isCnpjValid(cnpj: string) {
		if (cnpj === cnpj[0].repeat(14)) return false;

		let size = cnpj.length - 2;
		let numbers = cnpj.substring(0, size);
        const digit = cnpj.substring(size);
        
		let total = 0;
		let pos = size - 7;
		for (let i = size; i >= 1; i--) {
			total += +numbers.charAt(size - i) * pos--;
			if (pos < 2) pos = 9;
        }
        
		let result = total % 11 < 2 ? 0 : 11 - (total % 11);
        if (result !== +digit.charAt(0)) return false;
        
		size += 1;
		numbers = cnpj.substring(0, size);
		total = 0;
		pos = size - 7;
		for (let i = size; i >= 1; i--) {
			total += +numbers.charAt(size - i) * pos--;
			if (pos < 2) pos = 9;
        }
        
		result = total % 11 < 2 ? 0 : 11 - (total % 11);
        if (result !== +digit.charAt(1)) return false;
        
		return true;
	}
}