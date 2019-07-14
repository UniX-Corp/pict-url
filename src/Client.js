"use strict";

const axios = require("axios");

class Client {
    constructor (options) {
        if (!options) options = {};
        this.categoriesURL = (options.categoriesURL && typeof options.categoriesURL === 'string' && options.categoriesURL.length !== 0) ? options.categoriesURL : "https://imgur.com/r/{{category}}/hot.json"
        this.urlGetter = (options.urlGetter && typeof options.urlGetter === "function") ? options.urlGetter : async function (res) {
            let img = res.data.data[Math.round(Math.random() * res.data.data.length)];
            let url = `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
            return url;
        }
    }

    getImage (category) {
        return new Promise(async (resolve, reject) => {
            axios.get(this.categoriesURL.replace("{{category}}", category), { responseType : "json"})
            .then(async (res) => {
                let url = await this.urlGetter(res);
                resolve({ url });
            })
            .catch(async (reason) => {
                reject(reason);
            })
        })
    }
}

module.exports = Client;