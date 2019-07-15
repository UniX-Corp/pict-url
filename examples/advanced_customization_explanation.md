# Advanced Customization Feature Explanation

## **Obsolete**


## Reminder ⚡️

> As you create a new Pict-URL Client instance, you can provide it some options to parse and use. Options are instance-sensitive : it means that each instance uses its own options independently of others instances running in the process.

> These Options are called `ClientOptions`, which is basically an object, represented by these properties :


```ts
categoriesURL? : string;
urlGetter? : (response : CategoriesURLResponse) => string;
```

# Modifying these properties

### Reminder ⚡️

> It makes you able to change all the images's source easily but keep in mind that it can break fastly if you're not aware of what to do with these properties.

## Categories URL

### What is it ?

`categoriesURL` is a string which represents the source URL for listed images filtered by categories. Each category must have a separated file in order to work correctly.

### Warn ⚠️

Changing the value of `categoriesURL` forces you to change the value of `urlGetter`, which depends on the content given back by this url on requests.

### Usage

This variable is part of an object based on the ClientOptions interface which is basically an Object and should be set like this :

> ❌ This is theorically a valid syntax but it won't work.

```js
// Importing pict-url's module
const pictURL = require('pict-url');

// Setting up our options
const options = {
    categoriesURL : "myawesomeimagesource/lists/",
};

// Creating a new Client instance
const Client = new pictURL.Client(options);
```
This properties include a replacement for the `category` value given in the `Client.getImage(category)` method. To includes the value of `category`, just put `{{category}}` in the link, like this :

> ✔️ This is the valid syntax you should use.

```js
// Importing pict-url's module
const pictURL = require('pict-url');

// Setting up our options
const options = {
    categoriesURL : "myawesomeimagesource/lists/{{category}}.json",
};

// Creating a new Client instance
const Client = new pictURL.Client(options);
```

### Default value

The default value of `categoriesURL` is `https://imgur.com/r/{{category}}/hot.json`

## URL Getter

### What is it ?

`urlGetter` is a function which takes a `CategoriesURLResponse` as parameter and must give an url as a return. `CategoriesURLResponse` is the json file sent by the newly set `categoriesURL` on requests.

### Warn ⚠️

Changing the value of `urlGetter` forces you to change the value of `categoriesURL`, which should give a new response json structure.

### Usage

This variable is part of an object based on the ClientOptions interface which is basically an Object and should be set like this :
```js
// Importing pict-url's module
const pictURL = require('pict-url');

// Setting up our new urlGetter
const urlGetter = function (res) {

    // Simple example
    let link = res.data.first().url;
    return link;
};

// Setting up our options
const options = {
    categoriesURL : "myawesomeimagesource/lists/{{category}}.json",
    urlGetter : urlGetter,
};

// Creating a new Client instance
const Client = new pictURL.Client(options);
```

### Default value

The default value of `urlGetter` is :
```js
function (res) {
    let img = res.data.data[Math.round(Math.random() * res.data.data.length)];
    let url = `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
    return url;
};
```
