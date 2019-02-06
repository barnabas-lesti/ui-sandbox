const LokiJS = require('lokijs');

class DataService {
	constructor () {
		this._db = new LokiJS('main.db');
	}

	getDb () {
		return this._db;
	}
}

const dataService = new DataService();
module.exports = dataService;
