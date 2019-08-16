"use strict";

const http = require('http');
const url = require('url');
const sqlite = require('sqlite');
const BaseProvider = require('./Provider');

class SQLiteProvider extends BaseProvider {
    constructor (options) {
        if (!options || typeof options !== "object") options = {};
        if (options.file && typeof options.file === "string") throw new Error("SQLiteProvider Error : file cannot be undefined.");
        options.port = (options.port && typeof options.port === "number") ? options.port : 8080;
        this.Server = http.createServer((req, res) => {
            let query = url.parse(req.url).query;
            if (!options.SQLStructure.categoriesAvailables.includes(query.category)) {
                req.end();
                return;
            };
            sqlite.open(options.file).then(db => {
                db.get(`${options.SQLStructure.query.replace("{{category}}", query.category)}`).then(rows => {
                    req.end(rows);
                }).catch(reason => {
                    throw new Error(reason);
                });
            });
        }).listen(options.port);

        if (options.urlGetter) {
        	super("http://localhost/pict-url?category={{category}}",options.urlGetter);
        } else {
        	throw new Error("SQLite Provider Error : urlGetter must be given.");
        }
    }
}

module.exports = SQLiteProvider;
