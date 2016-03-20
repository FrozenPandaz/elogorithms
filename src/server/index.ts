var firebase = require('firebase');

interface User {
	id: string;
}

class Db {
	db: any;

	constructor(location: string) {
		if (location) {
			this.db = new Firebase(location);
		}
	}
}

public class Server {
	private user: User = {
		id: 'user_0'
	};
	private firebase: any;

	constructor(id: string) {
		if (id) {
			this.user.id = id;
		}
		this.firebase = new Db('https://elogorithms.firebaseio.com/').db;
	}

	public run() {
		this.firebase.on('value', snapshot => console.log(snapshot.val()));
	}
}

new Server().run();