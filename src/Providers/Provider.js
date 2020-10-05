'use strict';

const Defaults = require('./Defaults');

class Provider {
	constructor(getImage, options) {
		if (!getImage || typeof getImage != 'function') throw new Error('Provider instance error : getImage must be a function.')
		this.getImage = getImage;
		this.options == (options && typeof options === 'object') ? options : {};
	}
}

Object.keys(Defaults).forEach(key => {
	let provider = new Provider(Defaults[key].getImage, Defaults[key].options);
	Provider[key] = provider;
});

module.exports = Provider;
