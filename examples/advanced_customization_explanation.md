# Advanced Customization Feature Explanation

## Reminder ⚡️

> As you create a new Pict-URL Client instance, you must provide a Provider to use. Providers are instance-sensitive : it means that each Client instance uses its own Provider independently of others instances running in the process.

> These Providers are based on options called `ProviderOptions`, which is basically an object, represented by these properties :


```ts
categoriesURL? : string;
urlGetter? : (response : CategoriesURLResponse) => string;
```

# Modifying these properties

## Default values as example

Here are the default values for `categoriesURL` and `urlGetter` :

```js
const categoriesURL = "https://imgur.com/r/{{category}}/hot.json";

const urlGetter = function (res) {
    let img = res.data.data[Math.round(Math.random() * res.data.data.length)];
    let url = `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
    return url;
};

const Provider = new pictURL.Provider(categoriesURL, urlGetter);
```

## Instantiating your own Provider

If you want to instanciate your own Provider, you must give it a new value for both `categoriesURL` and `urlGetter` properties. To do so, you'll need to setup them as shown above. Here is a short example :

```js
const categoriesURL = "myawesomesite/lists/{{category}}.json";

const urlGetter = function (res) {
    let link = res.data.image.url;
    return link;
};

const Provider = new pictURL.Provider(categoriesURL, urlGetter);
```

## Properties Reminder

### Categories URL

_What is it ?_

`categoriesURL` is a string which represents the source URL for listed images filtered by categories. Each category must have a separated file in order to work correctly.

### URL Getter

_What is it ?_

`urlGetter` is a function which takes a `CategoriesURLResponse` as parameter and must give an url as a return. `CategoriesURLResponse` is the json file sent by the newly set `categoriesURL` on requests.