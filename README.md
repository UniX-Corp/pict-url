# Pict-URL
### What is it ?

`Pict-URL` is a basic package in order to get random image from a subreddit using imgur. Everything is entirely customisable, from the source URL to the image link formater.

# Table of Contents
- [Installation](#Installation)
- [How to use Pict-URL](#How-to-use-Pict-URL)
- [Customization](#Customization)

# Installation

You can install it using [Node Package Manager](https://npmjs.org) :
- ``npm install pict-url``

# How to use Pict-URL

`Pict-URL` should normally be fully JS-Doc-ed in your editor, for ease and convenience. 

Here is a short example :
```js
// Importing pict-url's module
const pictURL = require('pict-url');

// Getting the default Provider
const Imgur = pictURL.Provider.Imgur;

// Creating a basic new Client instance
const Client = new pictURL.Client(Imgur);

// Get an image by tag
let category = "doggos";
let imageLink = "";
Client.getImage(category).then((image) => {

    // Image is a basic object
    imageLink = image.url;
});
```

You can switch a Client's Provider in real time. To do so, take this as an example :
```js
// Importing pict-url's module
const pictURL = require('pict-url');

// Setting our own Provider
const categoriesURL = "https://imgur.com/r/{{category}}/hot.json";
const urlGetter = function (resp) {
    let res = JSON.parse(resp);
    let img = res.data[Math.round(Math.random() * res.data.length)];
    let url = `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
    return url;
};
const myAwesomeProvider = new pictURL.Provider(categoriesURL, urlGetter);

// Getting the default Provider
const Imgur = pictURL.Provider.Imgur;

// Creating a basic new Client instance using Imgur
const Client = new pictURL.Client(Imgur);

// Saving our tag as a variable
let category = "doggos";
let imageLink = "";

// Getting an image on the first provider
Client.getImage(category).then((image) => {

    // Image is a basic object
    imageLink = image.url;
});

// Changing Provider
Client.provider = myAwesomeProvider;

// Getting an image on the second provider
Client.getImage(category).then((image) => {

    // Image is a basic object
    imageLink = image.url;
});
```

A more advanced use of `Pict-URL` will be shown in *[Customisation](#Customization)*

Examples :
 - Discord Bot example available [here](examples/discord_bot.md)
 - ~~Express based API example available [here]()~~ ← Not available yet

# Customization

As you create a new Pict-URL Client instance, you must provide it a Provider to use. Providers are instance-sensitive : it means that each Client instance uses its own Provider independently of others instances running in the process.

These Providers are based on options called `ProviderOptions`, which is basically an object, represented by these properties :
```ts
categoriesURL? : string;
urlGetter? : (response : CategoriesURLResponse) => string;
```
It makes you able to change all the images's source easily but keep in mind that it can break fastly if you're not aware of what to do with these properties.

If you want to change image's source using this feature, you can go to [this file](examples/advanced_customization_explanation.md) for more explanation.
