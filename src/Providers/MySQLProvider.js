"use strict";

const { createServer } = require("http");
const { parse } = require("url");
const { createConnection } = require("mysql");
const BaseProvider = require("./Provider");

module.exports = class MySQLProvider extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== "object") options = {};
		if (options.file && typeof options.file === "string") throw new Error("MySQLProvider Error: file cannot be undefined.");
		if (options.config && typeof options.config === "object") throw new Error("MySQLProvider Error: config cannot be undefined.");
		const con = createConnection(options.config);
		con.connect();
		const temp = {
			Server: createServer((req, res) => {
				const query = parse(req.url).query;
				if (!options.SQLStructure.categoriesAvailables.includes(query.category)) {
					req.end();
					return;
				}
				con.query(`${options.SQLStructure.query.replace("{{category}}", query.category)}`, function(error, results, fields) {
					if (!error) req.end(results);
				});
			}),
		};
		if (options.urlGetter) {
			super("http://localhost/pict-url?category={{category}}", options.urlGetter);
		}
		else {
			throw new Error("MySQL Provider Error : urlGetter must be given.");
		}
		this.Server = temp.Server;
	}
};
