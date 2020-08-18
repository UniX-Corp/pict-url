'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const { inspect } = require('util');
const BaseProvider = require('./Provider');

module.exports = class RethinkDBProvider extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== 'object') options = {};
		if (options.config && typeof options.config === 'object') throw new Error('RethinkDB provider error: config cannot be undefined.');

		const rethink = require('rethinkdbdash')({
			servers: [
				{ host: options.config.host ? options.config.host : 'localhost', port: (options.config.port && typeof options.config.port === 'number') ? options.config.port : 8080 },
			],
			silent: options.config.silent || true,
			db: options.config.database,
		});

		const temp = {
			server: createServer((req, res) => {
				const query = parse(req.url).query;
				rethink.table(options.config.table).get(query.category).run()
					.then((results) => req.end(results))
					.catch((error) => throw new Error(`RethinkDB error: ${inspect(error.stack || error)}`))
			}),
		};

		if (options.URLGetter) {
			super('http://localhost/pict-url?category={{category}}', options.URLGetter);
		}
		else throw new Error('RethinkDB provider error: urlGetter must be given.');

		this.Server = temp.server;
	}
};
