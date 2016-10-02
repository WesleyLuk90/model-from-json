const Precondition = require('./Precondition');
const OptionsBuilder = require('./OptionsBuilder');
const KeyTranslator = require('./KeyTranslator');

class ModelManager {
	static create() {
		return new ModelManager();
	}

	constructor() {
		this.models = {};
		this.options = OptionsBuilder.createDefault().build();
	}

	register(modelName, model) {
		Precondition.isString(modelName, 'modelName');
		Precondition.isFunction(model, 'model');
		if (this.hasModel(modelName)) {
			throw new Error(`Model ${modelName} already exists`);
		}
		this.models[modelName] = model;
	}

	hasModel(modelName) {
		Precondition.isString(modelName, 'modelName');
		return !!this.models[modelName];
	}

	getModelByName(modelName) {
		Precondition.isString(modelName, 'modelName');
		if (!this.hasModel(modelName)) {
			throw new Error(`Model ${modelName} does not exist`);
		}
		return this.models[modelName];
	}

	createClassFromModel(model) {
		const classBase = Object.create(model.prototype);
		return classBase;
	}

	getModelRelations(modelName) {
		Precondition.isString(modelName, 'modelName');

		const model = this.getModelByName(modelName);

		if (model.getModelRelations) {
			return model.getModelRelations();
		} else {
			return {};
		}
	}

	fromJSON(modelName, data) {
		Precondition.isString(modelName, 'modelName');
		Precondition.isObject(data, 'data');

		if (Array.isArray(data)) {
			return data.map(d => this.fromJSON(modelName, d));
		}

		const model = this.getModelByName(modelName);

		const classBase = this.createClassFromModel(model);

		const options = this.getOptions();
		const keyTranslator = KeyTranslator.create(options.jsonKeyType, options.modelKeyType);
		const relations = this.getModelRelations(modelName);

		Object.keys(data)
			.forEach((key) => {
				const modelKey = keyTranslator.translate(key);
				const keyData = data[key];
				if (relations[key]) {
					if (Array.isArray(keyData)) {
						classBase[modelKey] = keyData.map(d => this.fromJSON(relations[key], d));
					} else {
						classBase[modelKey] = this.fromJSON(relations[key], keyData);
					}
				} else {
					classBase[modelKey] = keyData;
				}
			});

		return classBase;
	}

	toJSON(modelName, modelOrModels) {
		Precondition.isString(modelName, 'modelName');

		if (Array.isArray(modelOrModels)) {
			return modelOrModels.map(d => this.toJSON(modelName, d));
		}

		const model = modelOrModels;

		const options = this.getOptions();
		const keyTranslator = KeyTranslator.create(options.modelKeyType, options.jsonKeyType);
		const relations = this.getModelRelations(modelName);

		const data = {};
		Object.keys(model)
			.forEach((key) => {
				const jsonKey = keyTranslator.translate(key);
				const keyData = model[key];

				if (relations[jsonKey]) {
					if (Array.isArray(keyData)) {
						data[jsonKey] = keyData.map(d => this.toJSON(relations[jsonKey], d));
					} else {
						data[jsonKey] = this.toJSON(relations[jsonKey], keyData);
					}
				} else {
					data[jsonKey] = keyData;
				}
			});

		return data;
	}

	getOptions() {
		return this.options;
	}
}
module.exports = ModelManager;
