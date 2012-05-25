var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

dataProvider = function(host, port) {
	this.db= new Db('database', new Server(host, port, {auto_reconnect: true}, {}));
    this.db.open(function(){});
};
dataProvider.prototype.getCollection = function(callback) {
	this.db.collection('data', function(error, dataCollection) {
		if(error) {
			callback(error)
		} else {
			callback(null, dataCollection);
		}
	});
}
dataProvider.prototype.insert = function(data, cb) {
	this.getCollection(function(err, dataCollection) {
		if(err) {
			cb(err)
		} else {
			dataCollection.insert(data, function() {
				cb(null, data)
			});
		}
	});
}
dataProvider.prototype.getProduct = function(obj, cb) {
	var getProduct = function(error, collection) {
		if(error) {
			cb(error)
		} else {
			collection.find(obj, findCb);
		}
	};
	var findCb = function(error, data) {
		if(error) {
			console.log(error);
		} else if (!data) {
			console.log('no data found');
		} else {
			cb(null, data);
		}
	};
	this.getCollection(getProduct);
}
dataProvider.prototype.getAll = function(cb) {
	var getAll = function(error, collection) {
		if(!error) {
			console.log('no error');
			collection.find().toArray(function(error, results) {
				console.log(results)
				console.log('results')
				cb(null, results);
			});
		} else {
			console.log('find all error happened')
			console.log(error)
			cb(null, {});
		}
	}
	this.getCollection(getAll);
}
exports.DataProvider = dataProvider;
