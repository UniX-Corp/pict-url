"use strict";

const Provider = require('./Provider');
const http = require('http');
const https = require('https');

class Client {
    constructor (provider) {
        if (!provider || !(provider instanceof Provider)) throw new Error("Client instance error : provider cannot be undefined and must be an instance of Provider.");
        this.Provider = provider;
    }

    getImage (category) {        
        return new Promise((resolve, reject) => {
            if (this.Provider.categoriesURL.startsWith("https")) {
                let url = new URL(this.Provider.categoriesURL.replace("{{category}}", category));
                https.get(url, res => {
                    let resp = "";
                    res.on("data", data => { resp += data });
                    res.on("end", () => {
                        resolve({ url : this.Provider.urlGetter(resp) });
                    });
                });
            } else if (this.Provider.categoriesURL.startsWith("http")) {
                let url = new URL(this.Provider.categoriesURL.replace("{{category}}", category));
                http.get(url, res => {
                    let resp = "";
                    res.on("data", data => { resp += data });
                    res.on("end", () => {
                        resolve({ url : this.Provider.urlGetter(resp) });
                    });
                });
            } else reject("Invalid protocol : categoriesURL must be a http or https protocol.");
        });
    };

    set provider (provider) {
        if (!provider || !(provider instanceof Provider)) throw new Error("Client instance error : provider cannot be undefined and must be an instance of Provider.");
        this.Provider = provider;
    }
};

module.exports = Client;