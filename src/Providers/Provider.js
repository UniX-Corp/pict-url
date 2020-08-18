'use strict';

class Provider {
	constructor(categoriesURL, URLGetter) {
		if (!categoriesURL && !this.URLGetter) throw new Error('Provider instance error: categoriesURL and urlFormatter cannot be undefined.');
		this.categoriesURL = categoriesURL;
		this.URLGetter = URLGetter;
	}
}

Provider.Imgur = new Provider('https://imgur.com/r/{{category}}/hot.json', (res, options) => {
	res = JSON.parse(res);
	const img = res.data[Math.round(Math.random() * res.data.length)];
	return `https://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
});

module.exports = Provider;
