module.exports = {
    Server : require('./Server'),
    Client : require('./Client'),
    Providers : {
        FileProvider : require('./Providers/FileProvider'),
        MySQLProvider : require('./Providers/MySQLProvider'),
        Provider : require('./Providers/Provider'),
        SQLiteProvider : require('./Providers/SQLiteProvider'),
    }
};