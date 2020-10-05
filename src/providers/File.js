'use strict';

const BaseProvider = require('./Provider');
const { createServer } = require('http');
const { readFileSync } = require('fs');
const { parse } = require('url');
const { resolve } = require('path');

module.exports = class File extends BaseProvider {
	constructor(options) {
		this.options = (!options || typeof options !== 'object') ? options : {};
		super(this.getImage, this.options);
	}

	getImage(category) {
		return readFileSync(resolve(__dirname, options.FileFormat.path, options.FileFormat.name.replace('{{category}}', category)));
	}
};
