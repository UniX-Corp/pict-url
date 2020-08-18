'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const { inspect } = require('util');
const sqlite = require('sqlite');
const BaseProvider = require('./Provider');

module.exports =  class SQLite extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== 'object') options = {};
		if (options.file && typeof options.file === 'string') throw new Error('SQLite provider error: file cannot be undefined.');
		if (options.config && typeof options.config === 'object') throw new Error('MySQL provider error: config cannot be undefined.');

		const temp = {
			server: createServer((req, res) => {
				const query = parse(req.url).query;
				if (!options.SQLStructure.categoriesAvailable.includes(query.category)) {
					req.end();
					return;
				}

				sqlite.open(options.file).then((database) => {
					database.get(`${options.SQLStructure.query.replace('{{category}}', query.category)}`)
						.then((rows) => req.end(rows))
						.catch((reason) => throw new Error(`SQLite error: ${inspect(reason)}`));
				});
			}).listen(options.config.port),
		};

		if (options.URLGetter) {
			super('http://localhost/pict-url?category={{category}}', options.URLGetter);
		}
		else throw new Error('SQLite Provider error: URLGetter must be given.');

		this.Server = temp.server;
	}
};
