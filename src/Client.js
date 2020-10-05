'use strict';

const Provider = require('./providers/Provider');
const http = require('http');
const https = require('https');

module.exports = class Client {
	constructor(provider) {
		if (!provider || !(provider instanceof Provider)) throw new Error('Client instance error: provider must be an instance of Provider.');
		this.Provider = provider;
	}

	getImage(category) {
		return new Promise((resolve, reject) => {
			this.Provider.getImage(category).then((res) => {
                resolve(res);
            }).catch((reason) => {
                reject(reason);
            });
        });
	}

	set provider(provider) {
		if (!provider || !(provider instanceof Provider)) throw new Error('Client instance error: provider must be an instance of Provider.');
		this.Provider = provider;
	}
};