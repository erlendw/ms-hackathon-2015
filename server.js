var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/api/posts', function (req, res) {
	res.json([
		{
			username: 'test',
			bodt: 'test2'
		}
	])
})

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Server listening on', 3000)
})

