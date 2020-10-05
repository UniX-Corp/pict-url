'use strict';

const Provider = require('./Providers/Provider');
const http = require('http');
const https = require('https');

module.exports = class Server {
    constructor(provider, options) {
        if (!provider || !(provider instanceof Provider)) throw new Error ('Server instance error : `provider` must be an instance of Provider.');

        this.provider = provider;
        this.options = options ? options : {
            protocol: 'http',
            port: 8080
        };

        if (!(['http', 'https'].includes(this.options.protocol))) { 
            throw new Error('Server instance error: options.protocol must be either `http` or `https`.') 
        } else {
            [this.options.protocol.startsWith('https') ? https : http].createServer((req, res) => {
                const category = req.url.replace('/', '');
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                if (category === '') {
                    res.end('{status:"Invalid Category"}');
                } else {
                    this.provider.getImage(category).then(image => {
                        res.end(`{status:"URL Sent", url:${image.url}}`);
                    }).catch(reason => {
                        res.end(`{status:"Process Error", reason:${reason}}`);
                        console.log(`Process Error | reason : ${reason}`);
                    });
                }
            });
            server.listen((this.options.port && typeof this.options.port === 'number') ? this.options.port : 8080);
        }
    }
};