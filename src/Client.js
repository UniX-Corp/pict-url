"use strict";

const Provider = require("./Providers/Provider");
const http = require("http");
const https = require("https");

module.exports = class Client {
	constructor(provider, requestOptions) {
		if (!requestOptions) requestOptions = {};
		if (!provider || !(provider instanceof Provider)) throw new Error("Client instance error: provider cannot be undefined and must be an instance of Provider.");
		this.Provider = provider;
		this.categoriesURLOptions = (options.categoriesURL && typeof options.categoriesURL === "object") ? options.categoriesURL : {};
		this.URLGetterOptions = (options.URLGetter && typeof options.URLGetter === "object") ? options.URLGetter : {};
	}

	getImage(category) {
		return new Promise((resolve, reject) => {
			if (this.Provider.categoriesURL.startsWith("https")) {
				const url = new URL(this.Provider.categoriesURL.replace("{{category}}", category));
				https.get(url, this.categoriesURLOptions, res => {
					let resp = "";
					res.on("data", data => { resp += data });
					res.on("end", () => {
						resolve({ url : this.Provider.URLGetter(resp, this.URLGetterOptions) });
					});
				});
			}
			else if (this.Provider.categoriesURL.startsWith("http")) {
				const url = new URL(this.Provider.categoriesURL.replace("{{category}}", category));
				http.get(url, this.categoriesURLOptions, res => {
					let resp = "";
					res.on("data", data => { resp += data });
					res.on("end", () => {
						resolve({ url : this.Provider.URLGetter(resp, this.URLGetterOptions) });
					});
				});
			}
			else {reject("Invalid protocol : categoriesURL must be a http or https protocol.");}
		});
	}

	set provider(provider) {
		if (!provider || !(provider instanceof Provider)) throw new Error("Client instance error : provider cannot be undefined and must be an instance of Provider.");
		this.Provider = provider;
	}
};
