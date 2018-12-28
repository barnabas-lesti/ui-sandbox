const path = require('path');
// const yargs = require('yargs');

const envDirPath = path.join(__dirname, '../../../env');
process.env.NODE_CONFIG_DIR = envDirPath;
// process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;

const configLib = require('config');

/**
 * Application configuration object.
 */
const config = {
	common: {
		ENV: configLib.get('common.ENV'),
		PORT: configLib.get('common.PORT'),
	},
};

module.exports = config;
