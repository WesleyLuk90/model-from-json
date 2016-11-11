# Model From JSON

Quick Start
```
import { ModelManager } from 'model-from-json';
const modelManager = new ModelManager();

class User {
	static getModelRelations() {
		emails: 'Email',
	}
}
class Email {

}

modelManager.register('User', User);
modelManager.register('Email', Email);

const user = new User();
user.name = 'Bob';
modelManager.toJSON('User', ); // {name: 'Bob'}
modelManager.fromJSON('User', { name: 'Fred', emails: [{ email: 'fred@site.com' }] });
/*
	class User {
		name: 'Fred',
		emails: [
			class Email {
				email: 'fred@site.com',
			}
		]
	}
*/
```

## Goals

## Features

## Installing
