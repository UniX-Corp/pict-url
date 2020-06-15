"use strict";

class Provider {
	constructor(categoriesURL, URLGetter) {
		if (!categoriesURL && !this.URLGetter) throw new Error("Provider instance error : categoriesURL and urlFormater cannot be undefined.");
		this.categoriesURL = categoriesURL;
		this.URLGetter = URLGetter;
	}
}

Provider.Imgur = new Provider ("https://imgur.com/r/{{category}}/hot.json", function(resp, options) {
	const res = JSON.parse(resp);
	const img = res.data[Math.round(Math.random() * res.data.length)];
	return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
});

module.exports = Provider;
