var mongoose = require('mongoose');

module.exports.connect = function() {
  mongoose.connect("mongodb://localhost:27017/MEVN-boilerplate", { useNewUrlParser: true })
	var connection = mongoose.connection;
	connection.on("error", console.error.bind(console, "connection error"));

	connection.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return connection;
}