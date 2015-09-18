var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())


console.log(__dirname)
app.use(express.static(__dirname + '/cloudsocial/'))
app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

// API/FOLLOWERS
app.use(require('./api/followers.js'))


var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Server listening on', port)
})

