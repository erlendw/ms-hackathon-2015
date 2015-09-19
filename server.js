var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())


console.log(__dirname)
app.use(express.static(__dirname + '/cloudsocial/'))

// API/FOLLOWERS
app.use(require('./api/followers.js'))
app.use(require('./api/tweets.js'))

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Server listening on', port)
})

