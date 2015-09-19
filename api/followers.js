var router = require('express').Router()

var Twitter = require('twitter')
var request = require('request')
var client = new Twitter({
	consumer_key: 'GBwZIgehMl74jFybYaXA',
	consumer_secret: '8S6S6e2WSZPpJXhTZvuMklRtiIEhooX8ufuqb3E',
	access_token_key: '91752953-b0WBTmCRDf6zPCEDU3DAuEvOvfhGJQ0qXQowsqJP4',
	access_token_secret: 'qwer2Ez86FimIivNMWVfXqUC4KaAFOgiuVpBOtec'
})

var params = {screen_name: 'microsoftnorge'}

var facebook_id = 101690176567548

function get_twitter_followers(params, callback){
	client.get('followers/ids', params, function(error, result, response){
		var followers = ""
		if(!error){
			followers = result['ids'].length
		}else{
			followers = "unable to fetch followers"
		}
		callback(followers)
	})
}

function get_facebook_followers(facebook_id, callback){
	var url = 'https://graph.facebook.com/v2.3/'+facebook_id+'?fields=likes&access_token=816736428424913|e50f8b442475ce6789cfb30b4fe033d0'
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var json = JSON.parse(body)	
			callback(json['likes'])
		}else{
			callback("unable to fetch followers")
		}
	})
}

function get_both_followers(facebook_id, params, callback){
	client.get('followers/ids', params, function(error, result, response){
		var followers = 0
		
		if(!error){
			followers = result['ids'].length
		}
		var url = 'https://graph.facebook.com/v2.3/'+facebook_id+'?fields=likes&access_token=816736428424913|e50f8b442475ce6789cfb30b4fe033d0'
		request(url, function(error, response, body){
			if(!error && response.statusCode == 200){
				var json = JSON.parse(body)	
				var data = '{"twitter": "' + followers + '", "facebook": "'+json['likes']+'"}'
				callback(data)
			}
		})
	})
}

router.get('/api/followers/:media?', function (req, res) {
	var media = req.params.media
	var data = ""
	res.type('text/plain')
	if(!media){
		get_both_followers(facebook_id, params, function(data){
			res.send(data)
		})
	}else if(media == 'twitter'){
		get_twitter_followers(params, function(followers){
			data = '{"twitter": "' + followers + '"}'
			res.send(data)
		})
	}else if(media == 'facebook'){
		get_facebook_followers(facebook_id, function(likes){
			data = '{"facebook": "' + likes + '"}'	
			res.send(data)
		})
	}

})

module.exports = router
