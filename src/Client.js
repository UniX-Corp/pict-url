"use strict";
// Using axios for the http requests
const axios = require("axios");
// Using imgur as the default provider
const {Imgur} = require('./providers')

class Client {
    constructor (options) {
        if(!options) options = {};
        this.options = {
            providers: {...options.providers,...{imgur: new Imgur.Imgur()}
            }
        }
        console.log(this.options.providers)
    };
    getImage (options,provider = "imgur") {
        var promise = async function (resolve, reject) {
            // We need to get the provider
            // Getting the provider from the this.options.providers
            var provider = this.this.options.providers[this.provider];
            // If the provider doesn't exists
            if(provider === undefined){
                // Reject the promise
                reject(new Error("Invalid provider"));
                return;
            }
            // Now we can send the request
            await axios.get(provider.getUrl(options), { responseType : "json" })
            .then(async (res) => {
                // Resolve the promise with
                resolve(await provider.format(res)/* Call the provider */);
            })
            .catch((error) => {
                reject(error);
            })
        }
        // We need to pass the arguments throught the promise
        .bind({provider:provider,options:options,this:this});
        return new Promise(promise);
    }
}

module.exports = Client;