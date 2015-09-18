var router = require('express').Router()

var Twitter = require('twitter')
var request = require('request')
var client = new Twitter({
	consumer_key: 'GBwZIgehMl74jFybYaXA',
	consumer_secret: '8S6S6e2WSZPpJXhTZvuMklRtiIEhooX8ufuqb3E',
	access_token_key: '91752953-b0WBTmCRDf6zPCEDU3DAuEvOvfhGJQ0qXQowsqJP4',
	access_token_secret: 'qwer2Ez86FimIivNMWVfXqUC4KaAFOgiuVpBOtec'
})

var params = {screen_name: 'Mrtn9'}

var facebook_id = 56381779049

router.get('/api/followers/:media', function (req, res) {
	res.type('text/plain')
	if(req.params.media == 'twitter'){
		client.get('followers/ids', params, function(error, result, response){
			if(!error){
				res.send(""+result['ids'].length)
			}else{
				res.send("unable to fetch followers")
			}
		})
	}else if(req.params.media == 'facebook'){
		var url = 'https://graph.facebook.com/v2.3/'+facebook_id+'?fields=likes&access_token=816736428424913|e50f8b442475ce6789cfb30b4fe033d0'
		request(url, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = JSON.parse(body)
				
				res.send(json['likes']+"")
			}
		})
	}else{
		res.send("wrong parameter " + req.params.media)
	}	
})

module.exports = router
