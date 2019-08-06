"use strict";

const BaseProvider = require('./Provider');
const http = require('http');
const url = require('url');
const path = require('path');

class FileProvider extends BaseProvider {
	construtor(options) {
		if (!options || typeof options !== "object") options = {};
		options.port = (options.port && typeof options.port === "number") ? options.port : 8080;
        this.Server = http.createServer((req, res) => {
            let query = url.parse(req.url).query;
            let f = fs.readFileSync(path.resolve(__dirname, options.FileFormat.path, options.FileFormat.name.replace("{{category}}", query.category)));
            req.end(f);
        }).listen(options.port);
        
        if (options.urlGetter) {
        	super("http://localhost/pict-url?category={{category}}",options.urlGetter);
        } else {
        	super("http://localhost/pict-url?category={{category}}", function (res, options) {
				if (typeof res === "array") {
				
				} else if (typeof res === "object") {
				
				} else throw new Error("FileProvider request error : response should either be array or object, found invalid type.");
        	});
        }
	}
}
    