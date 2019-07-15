// "use strict";

const axios = require('axios');
const Provider = require('./Provider');

class Client {
    constructor (provider) {
        if (!provider || !(provider instanceof Provider)) throw new Error("Client instance error : provider cannot be undefined and must be an instance of Provider.");
        this.categoriesURL = (provider.categoriesURL && typeof provider.categoriesURL === 'string' && provider.categoriesURL.length !== 0) ? provider.categoriesURL : Provider.Imgur.categoriesURL; 
        this.urlGetter = (provider.urlGetter && typeof provider.urlGetter === "function") ? provider.urlGetter : Provider.Imgur.urlGetter;
    }

    getImage (category) {        
        return new Promise((resolve, reject) => {
            axios.get(this.categoriesURL.replace("{{category}}", category), { responseType : "json"})
            .then((res) => {
                let url = this.urlGetter(res);
                resolve({ url });
            })
            .catch((reason) => {
                reject(reason);
            })
        })
    }
}

module.exports = Client;