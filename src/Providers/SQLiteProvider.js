"use strict";

const { createServer } = require("http");
const { parse } = require("url");
const sqlite = require("sqlite");
const BaseProvider = require("./Provider");

class SQLiteProvider extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== "object") options = {};
		if (options.file && typeof options.file === "string") throw new Error("SQLite provider Error : file cannot be undefined.");
		if (options.config && typeof options.config === "object") throw new Error("MySQL provider Error: config cannot be undefined.");
		const temp = {
			Server : createServer((req, res) => {
				const query = parse(req.url).query;
				if (!options.SQLStructure.categoriesAvailables.includes(query.category)) {
					req.end();
					return;
				}
				sqlite.open(options.file).then((database) => {
					database.get(`${options.SQLStructure.query.replace("{{category}}", query.category)}`).then((rows) => {
						req.end(rows);
					}).catch((reason) => {
						throw new Error(reason);
					});
				});
			}).listen(options.port),
		};

		if (options.urlGetter) {
			super("http://localhost/pict-url?category={{category}}", options.urlGetter);
		}
		else {
			throw new Error("SQLite Provider Error : urlGetter must be given.");
		}
		this.Server = temp.Server;
	}
}

module.exports = SQLiteProvider;
