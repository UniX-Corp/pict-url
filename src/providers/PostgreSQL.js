'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const { inspect } = require('util');
const { Pool } = require('pg');
const BaseProvider = require('./Provider');

module.exports = class PostgreSQL extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== 'object') options = {};
		if (options.config && typeof options.config === 'object') throw new Error('PostgreSQL provider error: config cannot be undefined.');

		const pool = new Pool(options.config);
		pool.connect()
			.then()
			.catch((error) => throw new Error(`PostgreSQL error: ${inspect(error.stack || error)}`));

		const temp = {
			server: createServer((req, res) => {
				const query = parse(req.url).query;
				if (!options.SQLStructure.categoriesAvailable.includes(query.category)) {
					req.end();
					return;
				}
				pool.query(`${options.SQLStructure.query.replace('{{category}}', query.category)}`, (error, res) => {
					if (error) throw new Error(`PostgreSQL error: ${inspect(error.stack || error)}`);
					req.end(res);
				});
			}),
		};

		if (options.URLGetter) {
			super('http://localhost/pict-url?category={{category}}', options.URLGetter);
		}
		else throw new Error('PostgreSQL provider error: "URLGetter" must be given.');

		this.Server = temp.server;
	}
};
