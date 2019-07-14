# Pict-URL
### What is it ?

`Pict-URL` is a basic package in order to get random image from a subreddit using imgur. Everything is entirely customisable, from the source URL to the image link formater.

# Table of Contents
- ### [Installation](#Installation)
- ### [How to use Pict-URL](#How-to-use-Pict-URL)
- ### [Customization](#Customization)


# Installation

You can install it using [Node Package Manager](https://npmjs.org) :
- ``npm install pict-url``

# How to use Pict-URL

`Pict-URL` should normally be fully JS-Doc-ed in your editor, for more practicality. 

Here is a short example :
```js
// Importing pict-url's module
const pict_url = require('pict-url');

// Creating a basic new Client instance
const Client = new pict_url.Client();

// Get an image by tag
let category = "doggos";
let image_link = "";
Client.getImage(category).then(image => {

    // Image is a basic object
    image_link = image.url;
});
```

A more advanced use of `Pict-URL` will be shown in *[Customisation](#Customization)*

Examples :
 - Discord Bot example available [here](examples/discord_bot.md)
 - ~~Express based API example available [here]()~~ ← Not available yet

# Customization

As you create a new Pict-URL Client instance, you can provide it some options to parse and use. Options are instance-sensitive : it means that each instance uses its own options independently of others instances running in the process.

These Options are called `ClientOptions`, which is basically an object, represented by these properties :
```ts
categoriesURL? : string;
urlGetter? : (response : CategoriesURLResponse) => string;
```
It makes you able to change all the images's source easily but keep in mind that it can break fastly if you're not aware of what to do with these properties.

If you want to change image's source using this feature, you can go to [this file](examples/advanced_customization_explanation.md) for more explanation.