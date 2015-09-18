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

app.listen(3000, function () {
	console.log('Server listening on', 3000)
})

