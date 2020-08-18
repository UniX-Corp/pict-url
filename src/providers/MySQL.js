'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const { inspect } = require('util');
const { createConnection } = require('mysql');
const BaseProvider = require('./Provider');

module.exports = class MySQL extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== 'object') options = {};
		if (options.config && typeof options.config === 'object') throw new Error('MySQLProvider error: config cannot be undefined.');

		const connection = createConnection(options.config);
		connection.connect();

		const temp = {
			server: createServer((req, res) => {
				const query = parse(req.url).query;
				if (!options.SQLStructure.categoriesAvailable.includes(query.category)) {
					req.end();
					return;
				}
				connection.query(`${options.SQLStructure.query.replace('{{category}}', query.category)}`, (error, results, fields) => {
					if (error) throw new Error(`MySQL error: ${inspect(error.stack || error)}`);
					req.end(results);
				});
			}),
		};

		if (options.URLGetter) {
			super('http://localhost/pict-url?category={{category}}', options.URLGetter);
		}
		else throw new Error('MySQL Provider error: URLGetter must be given.');

		this.Server = temp.server;
	}
};
