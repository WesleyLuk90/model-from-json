const Precondition = require('./Precondition');

class SnakeCaseToCamelCase {
	translate(key) {
		Precondition.isString(key, 'key');

		return key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
	}
}

class CamelCaseToSnakeCase {
	translate(key) {
		Precondition.isString(key, 'key');

		return key.replace(/([a-z])([A-Z])/g, (match, letter1, letter2) => `${letter1}_${letter2.toLowerCase()}`);
	}
}

const translators = {
	SnakeCase: {
		CamelCase: new SnakeCaseToCamelCase(),
	},
	CamelCase: {
		SnakeCase: new CamelCaseToSnakeCase(),
	},
};

class KeyTranslator {
	static create(fromType, toType) {
		Precondition.isString(fromType, 'fromType');
		Precondition.isString(toType, 'toType');

		if (!translators[fromType] || !translators[fromType][toType]) {
			throw new Error(`No translator from ${fromType} to ${toType}`);
		}
		return translators[fromType][toType];
	}

	translate(key) {
		throw new Error(`Failed to translate ${key}, Not Implemented`);
	}
}

module.exports = KeyTranslator;
