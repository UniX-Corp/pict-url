'use strict';

const BaseProvider = require('./Provider');
const { get } = require('http');

module.exports = class ExternalServer extends BaseProvider {
    constructor(options) {
		if (!options || typeof options !== 'object') options = {};
        this.options.url = (options.url && typeof options.url === 'string') ? options.url : 'http://localhost:8080/{{category}}';

		super(this.getImage, this.options);
    }
    
    getImage(category) {
        get(this.options.url, resp => {
            let data = '';
            resp.on('error', (error) => { throw new Error(error) });
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                req.end(JSON.parse(data));
            });
        });
    }
}