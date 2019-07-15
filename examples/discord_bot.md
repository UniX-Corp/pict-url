# Discord Bot Example [Discord.js]
```js
// Importing pict-url's and discord.js module (or any other discord's api based module)
const { Client, Provider } = require('pict-url');
const Discord = require('discord.js');

// Creating a basic new Discord Client instance
const Bot = new Discord.Client();

// Getting the default Provider
const Imgur = Provider.Imgur;

// Creating a basic new Pict-URL Client instance
const Pict = new Client(Imgur);

// OPTIONAL :
// Associating Pict-URL Client as a property of Discord Client
Bot.pictClient = Pict; // pictClient can be replace by other valid name

// Basic 'On Message' event listener
let prefix = "myawesomeprefix";
Bot.on("message", (message) => {

    // Condition : if the message starts by the prefix and a command named "randompic"
    if (message.content.startsWith(`${prefix}randompic`)) {

        // Splitting message in order to get the tag
        let args = message.content.split(" ");

        // Condition : if a tag is provided, is a string and is longer than 0 (not an empty string)
        if (args[1] && typeof args[1] === "string" && args[1].length > 0) {

            // Get a random image of the tag given as argument
            Pict.getImage(args[1])
            .then((image) => {

                // Sending the image in the message channel
                message.channel.send(new Discord.MessageAttachment(image.url));
            });
        };
    };

    // Condition : if the message starts by the prefix and a command named "provider"
    if (message.content.startsWith(`${prefix}provider`)) {

        // Setting up our Provider list
        let Providers = [ { "name" : "Imgur", provider : Provider.Imgur } ]

        // Splitting message in order to get the tag
        let args = message.content.split(" ");

        // Condition : if a tag is provided, is a string and is longer than 0 (not an empty string)
        if (args[1] && typeof args[1] === "string" && args[1].length > 0) {

            // Check if provider exists
            if (Providers.filter((provider) => { provider.name === agrs[1] }).length > 0) let provider = Providers.some((provider) => { provider.name === agrs[1] })[0].provider;

            // Changing the Client's instance Provider to the given one
            Pict.provider = provider;
        };
    };
});

// Login into the bot account
Bot.login("MY AWESOME TOKEN");
```
