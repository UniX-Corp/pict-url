'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const { inspect } = require('util');
const { MongoClient } = require('mongodb');
const BaseProvider = require('./Provider');

module.exports = class MongoDB extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== 'object') options = {};
		if (options.config && typeof options.config === 'object') throw new Error('MongoDB provider error: config cannot be undefined.');

		const client = new MongoClient(options.config.uri, options.config.options);
		let mongo = null;

		client.connect()
			.then(() => mongo = client.db(options.config.database))
			.catch((error) => throw new Error(`MongoDB - Failed to connect\nError: ${inspect(error.stack || error)}`));

		const temp = {
			server: createServer((req, res) => {
				const query = parse(req.url).query;
				mongo.collection(options.config.collection).findOne({ category: query.category })
					.then((results) => req.end(results))
					.catch((error) => throw new Error(`MongoDB - Failed to retrieve data error: ${inspect(error)}`));
			}),
		};

		if (options.URLGetter) {
			super('http://localhost/pict-url?category={{category}}', options.URLGetter);
		}
		else throw new Error('MongoDB provider error: URLGetter must be given.');

		this.Server = temp.server;
	}
};
