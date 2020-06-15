"use strict";

const { createServer } = require("http");
const { parse } = require("url");
const BaseProvider = require("./Provider");

module.exports = class RethinkDBProvider extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== "object") options = {};
		if (options.file && typeof options.file === "string") throw new Error("RethinkDB provider Error: file cannot be undefined.");
		if (options.config && typeof options.config === "object") throw new Error("RethinkDB provider Error: config cannot be undefined.");
		const rethink = require("rethinkdbdash")({
			servers: [
				{ host: options.config.host ? options.config.host : "localhost", port: (options.config.port && typeof options.config.port === "number") ? options.config.port : 8080 },
			],
			// Set "silent" to false if you want console.error logs.
			silent: true,
			db: options.config.database,
		});
		const temp = {
			Server: createServer((req, res) => {
				const query = parse(req.url).query;
				rethink.table(options.config.table).get(query.category).run().then((result) => {

				});
			}),
		};
		if (options.urlGetter) {
			super("http://localhost/pict-url?category={{category}}", options.urlGetter);
		}
		else {
			throw new Error("RethinkDB provider Error: urlGetter must be given.");
		}
		this.Server = temp.Server;
	}
};
