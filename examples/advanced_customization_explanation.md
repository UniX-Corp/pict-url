# Advanced Customization Feature Explanation

## Reminder ⚡️

> As you create a new Pict-URL Client instance, you must provide a Provider to use. Providers are instance-sensitive : it means that each Client instance uses its own Provider independently of others instances running in the process.

> These Providers are based on options called `ProviderOptions`, which is basically an object, represented by these properties :


```ts
categoriesURL? : string;
URLGetter? : (response : CategoriesURLResponse) => string;
```

# Modifying these properties

## Default values as example

Here are the default values for `categoriesURL` and `urlGetter` :

```js
const categoriesURL = "https://imgur.com/r/{{category}}/hot.json";

const URLGetter = (res) => {
    res = JSON.parse(res);
    let img = res.data[Math.round(Math.random() * res.data.length)];
    return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
};

const Provider = new pictURL.Provider(categoriesURL, URLGetter);
```

## Instantiating your own Provider

If you want to instantiate your own Provider, you must give it a new value for both `categoriesURL` and `urlGetter` properties. To do so, you'll need to set up them as shown above. Here is a short example :

```js
const categoriesURL = "myawesomesite/lists/{{category}}.json";

const URLGetter = (res) => {
    return res.data.image.url;
};

const Provider = new pictURL.Provider(categoriesURL, URLGetter);
```

## Properties Reminder

### Categories URL

_What is it ?_

`categoriesURL` is a string which represents the source URL for listed images filtered by categories. Each category must have a separated file in order to work correctly.

### URL Getter

_What is it ?_

`urlGetter` is a function which takes a `CategoriesURLResponse` as parameter and must give an url as a return. `CategoriesURLResponse` is the json file sent by the newly set `categoriesURL` on requests.
