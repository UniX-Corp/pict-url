"use strict";

const BaseProvider = require("./Provider");
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const { resolve } = require("path");

module.exports = class FileProvider extends BaseProvider {
	constructor(options) {
		if (!options || typeof options !== "object") options = {};
		options.port = (options.port && typeof options.port === "number") ? options.port : 8080;
		const temp = {
			Server: createServer((req, res) => {
				const query = parse(req.url).query;
				const file = readFileSync(resolve(__dirname, options.FileFormat.path, options.FileFormat.name.replace("{{category}}", query.category)));
				req.end(file);
			}).listen(options.port),
		};

		if (options.urlGetter) {
			super("http://localhost/pict-url?category={{category}}", options.urlGetter);
		}
		else {
			throw new Error("File Provider Error : urlGetter must be given.");
		}
		this.Server = temp.Server;
	}
};
