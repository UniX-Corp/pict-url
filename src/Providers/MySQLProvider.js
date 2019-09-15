"use strict";

const http = require('http');
const url = require('url');
const mysql = require('mysql');
const BaseProvider = require('./Provider');

class MySQLProvider extends BaseProvider {
    constructor (options) {
        if (!options || typeof options !== "object") options = {};
        if (options.file && typeof options.file === "string") throw new Error("MySQLProvider Error : file cannot be undefined.");
        if (options.config && typeof options.config === "object") throw new Error("MySQLProvider Error : config cannot be undefined.");
        options.port = (options.port && typeof options.port === "number") ? options.port : 8080;
        let con = mysql.createConnection(options.config);
        con.connect();
        this.Server = http.createServer((req, res) => {
            let query = url.parse(req.url).query;
            if (!options.SQLStructure.categoriesAvailables.includes(query.category)) {
                req.end();
                return;
            };
            con.query(`${options.SQLStructure.query.replace("{{category}}", query.category)}`, function (error, results, fields) {
                if (!error) req.end(results);
            });
        });
        if (options.urlGetter) {
        	super("http://localhost/pict-url?category={{category}}",options.urlGetter);
        } else {
        	throw new Error("MySQL Provider Error : urlGetter must be given.");
        }
    }
}

module.exports = MySQLProvider;
