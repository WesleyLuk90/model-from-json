const Precondition = require('./Precondition');

class OptionsBuilder {
	static create() {
		return new OptionsBuilder();
	}

	static createDefault() {
		return OptionsBuilder.create()
			.setJsonKeyType('SnakeCase')
			.setModelKeyType('CamelCase');
	}

	constructor() {
		this.options = {};
	}

	setJsonKeyType(type) {
		Precondition.isString(type, 'type');
		this.options.jsonKeyType = type;
		return this;
	}

	setModelKeyType(type) {
		Precondition.isString(type, 'type');
		this.options.modelKeyType = type;
		return this;
	}

	build() {
		return this.options;
	}
}

module.exports = OptionsBuilder;
