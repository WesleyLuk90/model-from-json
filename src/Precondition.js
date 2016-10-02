class Precondition {
	static validateName(name) {
		if (typeof name !== 'string') {
			throw new Error('Parameter name must be provided');
		}
	}

	static isString(value, name) {
		Precondition.validateName(name);
		if (typeof value !== 'string') {
			throw new Error(`Expected ${name} to be a string`);
		}
	}

	static isFunction(value, name) {
		Precondition.validateName(name);
		if (typeof value !== 'function') {
			throw new Error(`Expected ${name} to be a function`);
		}
	}

	static isObject(value, name) {
		Precondition.validateName(name);
		if (typeof value !== 'object' || value == null) {
			throw new Error(`Expected ${name} to be an object`);
		}
	}
}

module.exports = Precondition;
