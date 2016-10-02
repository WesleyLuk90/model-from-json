const ModelManager = require('./../src/ModelManager');
const OptionsBuilder = require('./../src/OptionsBuilder');

describe('ModelManager', () => {
	beforeEach(() => {
		this.modelManager = new ModelManager();
	});

	it('should be creatable', () => {
		const newModelManager = new ModelManager();
		expect(newModelManager).toBeTruthy();

		const createdModelManager = ModelManager.create();
		expect(createdModelManager).toBeTruthy();
	});

	describe('getOptions', () => {
		it('should get default options', () => {
			const modelManager = ModelManager.create();

			expect(modelManager.getOptions()).toEqual(OptionsBuilder.createDefault().build());
		});
	});

	describe('register', () => {
		beforeEach(() => {
			this.modelManager = ModelManager.create();
		});
		it('should throw an error with invalid parameters', () => {
			expect(() => this.modelManager.register()).toThrow();
			expect(() => this.modelManager.register(0)).toThrow();

			expect(() => this.modelManager.register('NoModel')).toThrow();
			expect(() => this.modelManager.register('NoModel', null)).toThrow();
			expect(() => this.modelManager.register('NoModel', 0)).toThrow();
		});

		it('should register models', () => {
			class MyTestModel {

			}
			this.modelManager.register('MyTestModel', MyTestModel);
			expect(this.modelManager.getModelByName('MyTestModel')).toBe(MyTestModel);
		});
	});

	class Person {
		static getModelRelations() {
			return {
				great_uncle: 'Person',
				close_relatives: 'Person',
			};
		}
	}

	describe('fromJSON', () => {
		it('should convert flat data', () => {
			const data = {
				parent_id: 5,
				registered: false,
				name: 'Fred',
				colors: ['red', 'blue'],
				meta: { tag: 'human' },
				great_uncle: { name: 'great uncle' },
				close_relatives: [{ name: 'great uncle' }, { name: 'mom' }],
			};

			this.modelManager.register('Person', Person);

			const person = this.modelManager.fromJSON('Person', data);

			expect(person instanceof Person).toBe(true);
			expect(person.parentId).toBe(data.parent_id);
			expect(person.registered).toBe(data.registered);
			expect(person.name).toBe(data.name);
			expect(person.colors).toBe(data.colors);
			expect(person.meta).toBe(data.meta);

			expect(person.greatUncle instanceof Person).toBe(true);
			expect(person.greatUncle.name).toBe('great uncle');

			expect(person.closeRelatives[0] instanceof Person).toBe(true);
			expect(person.closeRelatives[0].name).toBe('great uncle');
			expect(person.closeRelatives[1] instanceof Person).toBe(true);
			expect(person.closeRelatives[1].name).toBe('mom');
		});

		it('should convert an array of data', () => {
			this.modelManager.register('Person', Person);
			const people = [{
				name: 'fred',
			}, {
				name: 'jim',
			}];

			const models = this.modelManager.fromJSON('Person', people);

			expect(Array.isArray(models)).toBe(true);
			expect(models.length).toBe(2);
			expect(models[0].name).toBe('fred');
			expect(models[1].name).toBe('jim');
		});
	});

	describe('toJSON', () => {
		it('should convert simple data', () => {
			this.modelManager.register('Person', Person);

			const uncle = new Person();
			uncle.name = 'uncle';

			const mom = new Person();
			mom.name = 'mom';

			const person = new Person();
			person.name = 'tom';
			person.age = 20;
			person.hasLicense = true;
			person.tags = ['tall', 'male'];
			person.meta = { id: 10 };
			person.closeRelatives = [uncle, mom];
			person.greatUncle = uncle;

			const data = this.modelManager.toJSON('Person', person);

			expect(data.name).toBe(person.name);
			expect(data.age).toBe(person.age);
			expect(data.has_license).toBe(person.hasLicense);
			expect(data.tags).toBe(person.tags);
			expect(data.meta).toBe(person.meta);

			expect(data.great_uncle.name).toBe(uncle.name);

			expect(Array.isArray(data.close_relatives)).toBe(true);
			expect(data.close_relatives.length).toBe(2);
			expect(data.close_relatives[0].name).toBe(uncle.name);
			expect(data.close_relatives[1].name).toBe(mom.name);
		});

		it('should convert an array of models', () => {
			this.modelManager.register('Person', Person);

			const person1 = new Person();
			person1.name = 'fred';

			const person2 = new Person();
			person2.name = 'jim';

			const people = [person1, person2];

			const data = this.modelManager.toJSON('Person', people);

			expect(Array.isArray(data)).toBe(true);
			expect(data.length).toBe(2);
			expect(data[0].name).toBe('fred');
			expect(data[1].name).toBe('jim');
		});
	});
});
