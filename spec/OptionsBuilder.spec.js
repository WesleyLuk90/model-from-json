const OptionsBuilder = require('./../src/OptionsBuilder');

describe('OptionsBuilder', () => {
	it('should be creatable', () => {
		const newOptionsBuilder = new OptionsBuilder();
		expect(newOptionsBuilder).toBeTruthy();

		const createdOptionsBuilder = OptionsBuilder.create();
		expect(createdOptionsBuilder).toBeTruthy();
	});

	describe('createDefault', () => {
		it('should create the default options', () => {
			const defaultOptions = OptionsBuilder.createDefault().build();

			expect(defaultOptions.jsonKeyType).toBe('SnakeCase');
			expect(defaultOptions.modelKeyType).toBe('CamelCase');
		});
	});
});
