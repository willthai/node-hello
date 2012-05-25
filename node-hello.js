var express = require('express'),
	app = express.createServer(),
    Y = require('yui').use('oop', 'base-base'),
	port = 8080,
	path = __dirname + '/static',
	DataProvider = require('./modules/db.js').DataProvider;

var dataProvider = new DataProvider('127.0.0.1', 27017)

console.log('path is' + path)
console.log('listening on port:'+port);

app.use(app.router);
app.use(express.directory(path))
app.use(express.static(path))

app.set('view engine', 'handlebars')
app.set('view options', { layout: false})
app.register('.html', require('handlebars'))

app.get('/', function(req, res) {
	var data = {
			header: 'Pinching pennies',
			content: 'efficient.'
		},
		products = {}
	
	dataProvider.getAll(function(error, d) {
		data.products = d;
		console.log('data')
		console.log(data)
		res.render('index.html', data);
	});
})
app.get('/insertProduct', function(req,res) {
	console.log('ajax')
	console.log(req.query)
	dataProvider.insert(req.query, function(err,data) {
		console.log('inserted');
		console.log(data)
	});
})
app.get('/getProduct', function(req,res) {
	var q = req.query,
		returnProduct = function(err, data) {
			if(!err) {
				res.send(data)
			} else {
				console.log(err)
			}
		};
	dataProvider.getProduct(q, returnProduct);
});
app.get('/getAll', function(req, res) {
	dataProvider.getAll(function(error, data) {
		console.log('getAll')
		console.log(data)
	});
});
app.listen(port)
