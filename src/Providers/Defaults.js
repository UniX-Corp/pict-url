const http = require('http');
const https = require('https');

module.exports = {
    Imgur: {
        getImage(category) {
            return new Promise((resolve, reject) => {
                let url = new URL("https://imgur.com/r/{{category}}/hot.json".replace('{{category}}', category));
                https.get(url, (res) => {
                    let data = '';
                    res.on('error', (error) => reject(error));
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => {
                        let rep = JSON.parse(data);
                        let img = res.data[Math.round(Math.random() * rep.data.length)];
                        resolve({ url : `https://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}` });
                    });
                });
            });
        },
        options : {},
    }
}