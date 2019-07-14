# Discord Bot Example File
```js
// Importing pict-url's and discord.js module (or any other discord's api based module)
const pict_url = require('pict-url');
const Discord = require('discord.js');

// Creating a basic new Discord Client instance
const Client = new Discord.Client();

// Creating a basic new Pict-URL Client instance
const Pict = new pict_url.Client();

// OPTIONAL :
// Associating Pict-URL Client as a property of Discord Client
Client.pictClient = Pict; // pictClient can be replace by other valid name

// Basic 'On Message' event listener
let prefix = "myawesomeprefix";
Client.on("message", message => {

    // Condition : if the message starts by the prefix and a command named "randompic"
    if (message.content.startsWith(`${prefix}randompic`)) {

        // Splitting message in order to get the tag
        let args = message.content.split(" ");

        // Condition : if a tag is provided, is a string and is longer than 0 (not an empty string)
        if (args[1] && typeof args[1] === "string" && args[1].length > 0) {

            // Get a random image of the tag given as argument
            Pict.getImage(args[1])
            .then(image => {

                // Sending the image in the message channel
                message.channel.send(new Discord.MessageAttachment(image.url));
            });
        };
    };
});

// Login into the bot account
Client.login("MY_AWESOME_TOKEN");
```