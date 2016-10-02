const KeyTranslator = require('./../src/KeyTranslator');

describe('KeyTranslator', () => {
	it('should be creatable', () => {
		const keyTranslator = KeyTranslator.create('SnakeCase', 'CamelCase');

		expect(keyTranslator).toBeTruthy();
	});

	it('should translate from SnakeCase to CamelCase', () => {
		const keyTranslator = KeyTranslator.create('SnakeCase', 'CamelCase');

		expect(keyTranslator.translate('hello_world')).toBe('helloWorld');
	});

	it('should translate from CamelCase to SnakeCase', () => {
		const keyTranslator = KeyTranslator.create('CamelCase', 'SnakeCase');

		expect(keyTranslator.translate('helloWorld')).toBe('hello_world');
	});

	it('should throw an error for invalid transforms', () => {
		expect(() => KeyTranslator.create('invalid', 'invalid')).toThrow();
	});
});
