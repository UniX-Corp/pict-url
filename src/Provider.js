"use strict";

class Provider {
    constructor (categoriesURL, urlGetter) {
        if (!categoriesURL && !this.urlGetter) throw new Error("Provider instance error : categoriesURL and urlFormater cannot be undefined.");
        this.categoriesURL = categoriesURL;
        this.urlGetter = urlGetter;
    }
}

Provider.Imgur = new Provider ("https://imgur.com/r/{{category}}/hot.json", function (res) {
    let img = res.data.data[Math.round(Math.random() * res.data.data.length)];
    let url = `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
    return url;
});

module.exports = Provider;