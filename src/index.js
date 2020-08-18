module.exports = {
	Server: require('./Server'),
	Client: require('./Client'),
	Providers: {
		FileProvider: require('./providers/File'),
		MySQLProvider: require('./providers/MySQL'),
		Provider: require('./providers/Provider'),
		RethinkDBProvider: require('./providers/RethinkDB'),
		SQLiteProvider: require('./providers/SQLite'),
	},
};
