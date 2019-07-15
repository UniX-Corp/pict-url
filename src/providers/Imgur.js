class Imgur
{
    getUrl(options){
        return `https://imgur.com/r/${options.category}/hot.json`;
    };
    format(res){
        let img = res.data.data[Math.round(Math.random() * res.data.data.length)];
        return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
    }
}
module.exports.Imgur = Imgur;