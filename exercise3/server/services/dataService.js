const appRootPath = require('app-root-path').path;
const path = require('path');
const fsExtra = require('fs-extra');

const config = require('../config');

class DataService {
	constructor () {
		this._STORE_PATH = path.join(appRootPath, config.DATA_JSON_PATH);

		
	}

	async getStore () {
		let store = {};
		try {
			const rawStoreData = await fsExtra.readFile(this._STORE_PATH, 'utf-8');
			store = JSON.parse(rawStoreData);
		} catch (error) {
			error.code !== 'ENOENT' && console.log(error);
		}
		return store;
	}

	async updateStore (updatedStore) {
		try {
			await fsExtra.writeFile(this._STORE_PATH, JSON.stringify(updatedStore), 'utf-8');
			return updatedStore;
		} catch (error) {
			console.log(error);
		}
		return null;
	}
}

const dataService = new DataService();
module.exports = dataService;
